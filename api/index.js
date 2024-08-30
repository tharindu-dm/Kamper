const express = require("express");
const paths = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const Place = require("./models/Place.js");
const Report = require("./models/Report.js");
const Booking = require("./models/Booking.js");
const Gear = require("./models/Gear.js");
const Renting = require("./models/Renting.js");

const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("/api/uploads"));
app.use("/uploads", express.static(paths.join(__dirname, "uploads")));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    const { token } = req.cookies;
    if (!token) {
      reject(new Error("No token provided"));
      return;
    }

    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) {
        reject(err);
      } else {
        resolve(userData);
      }
    });
  });
}

app.get("/api/test", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json("test ok");
});

app.post("/api/register", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    console.log("catched");
    res.status(422).json(e);
  }
});

app.post("/api/login", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { email, password } = req.body;

  // Check if the user exists
  const userDoc = await User.findOne({ email });

  if (!userDoc) {
    // If the user doesn't exist, send a 401 Unauthorized response
    return res.status(401).json({ error: "User not found" });
  }

  // If the user exists, verify the password
  const passOk = bcrypt.compareSync(password, userDoc.password);

  if (!passOk) {
    // If the password is incorrect, send a 401 Unauthorized response
    return res.status(401).json({ error: "Invalid password" });
  }

  // If authentication is successful, generate and send a JWT token
  jwt.sign(
    {
      email: userDoc.email,
      id: userDoc._id,
    },
    jwtSecret,
    {},
    (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json(userDoc);
    }
  );
});

app.get("/api/profile", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/api/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.put("/api/update-profile", async (req, res) => {
  const { token } = req.cookies;
  const { name } = req.body;

  try {
    const userData = await getUserDataFromReq(req);
    const updatedUser = await User.findByIdAndUpdate(
      userData.id,
      { name },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

app.delete("/api/delete-profile", async (req, res) => {
  const { token } = req.cookies;

  try {
    const userData = await getUserDataFromReq(req);
    await User.findByIdAndDelete(userData.id);
    res.clearCookie("token"); // Optionally clear the token cookie
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete profile" });
  }
});

//PHOTOS
app.post("/api/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  const destPath = __dirname + "/uploads/" + newName;

  await imageDownloader.image({
    url: link,
    dest: destPath,
  });

  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
const path = require("path");
app.post("/api/upload", photosMiddleware.array("photos", 10), (req, res) => {
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    uploadedFiles.push(newPath.replace(/^uploads\\/, ""));
  }
  res.json(uploadedFiles);
});

//PLACES
app.post("/account/places", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
});

app.get("/account/user-places", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const userData = await getUserDataFromReq(req);
    if (!userData || !userData.id) {
      return res.status(401).json({ error: "Invalid user data" });
    }

    const places = await Place.find({ owner: userData.id });
    res.json(places);
  } catch (err) {
    console.error("Error in /account/user-places:", err);
    if (err.name === "JsonWebTokenError") {
      res.status(401).json({ error: "Invalid token" });
    } else {
      res
        .status(500)
        .json({ error: "Internal server error", details: err.message });
    }
  }
});

app.get("/account/places/:id", async (req, res) => {
  //try /api/places/:id
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.delete("/account/places/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Place.findByIdAndDelete(id);
    res.status(200).json({ message: "Place deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete place", error });
  }
});

app.get("/api/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/account/places", async (req, res) => {
  //try /api/places
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});

app.get("/api/place", async (req, res) => {
  res.json(await Place.find());
});

//BOOKINGS AND RENTINGS
app.post("/api/bookings", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;
  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user: userData.id,
  })
    .then((doc) => {
      //if (err) throw err;
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});
app.post("/api/rentings", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  const { gear, checkIn, checkOut, numberOfItems, name, phone, price } =
    req.body;
  Renting.create({
    gear,
    checkIn,
    checkOut,
    numberOfItems,
    name,
    phone,
    price,
    user: userData.id,
  })
    .then((doc) => {
      //if (err) throw err;
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/api/bookings", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
});

app.get("/api/rentings", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  res.json(await Renting.find({ user: userData.id }).populate("gear"));
});

//GEARS
app.post("/account/gears", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const {
    type,
    addedPhotos,
    description,
    searchCriteria,
    extraInfo,
    capacity,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    const gearDoc = await Gear.create({
      owner: userData.id,
      type,
      photos: addedPhotos,
      description,
      searchCriteria,
      extraInfo,
      capacity,
      price,
    });
    res.json(gearDoc);
  });
});

app.get("/account/user-gears", async (req, res) => {
  //try /api/places
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Gear.find({ owner: id }));
  });
});

app.get("/account/gears/:id", async (req, res) => {
  //try /api/places/:id
  const { id } = req.params;
  res.json(await Gear.findById(id));
});

app.delete("/account/gears/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Gear.findByIdAndDelete(id);
    res.status(200).json({ message: "Gear deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete gear", error });
  }
});

app.get("/api/gears/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Gear.findById(id));
});

app.put("/account/gears", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    type,
    addedPhotos,
    description,
    searchCriteria,
    extraInfo,
    capacity,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const gearDoc = await Gear.findById(id);
    if (userData.id === gearDoc.owner.toString()) {
      gearDoc.set({
        type,
        photos: addedPhotos,
        description,
        searchCriteria,
        extraInfo,
        capacity,
        price,
      });
      await gearDoc.save();
      res.json("ok");
    }
  });
});

app.get("/api/gear", async (req, res) => {
  res.json(await Gear.find());
});

// handle deleting a booking
app.delete("/api/bookings/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  try {
    const bookingId = req.params.id;
    await Booking.findByIdAndDelete(bookingId);
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

app.delete("/api/rentings/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  try {
    const rentingId = req.params.id;
    await Renting.findByIdAndDelete(rentingId);
    res.status(200).json({ message: 'Renting deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete renting' });
  }
});

// update the booking
app.get("/api/bookings/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId).populate("place");
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

app.put("/api/bookings/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { numberOfGuests, phone } = req.body;
  try {
    const booking = await Booking.findById(req.params.id);
    booking.numberOfGuests = numberOfGuests;
    booking.phone = phone;
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

app.get("/api/rentings/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  try {
    const rentingId = req.params.id;
    const renting = await Renting.findById(rentingId).populate("gear");
    res.json(renting);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch renting' });
  }
});

app.put("/api/rentings/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { phone } = req.body;
  try {
    const renting = await Renting.findById(req.params.id);
    renting.phone = phone;
   
    await renting.save();
    res.json(renting);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update renting' });
  }
});



//REPORT
app.get("/account/report/:id", async (req, res) => {
  //try /api/report/:id
  const { id } = req.params;
  res.json(await Report.findById(id));
});

app.delete("/account/reports/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Report.findByIdAndDelete(id);
    res.status(200).json({ message: "Place deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete place", error });
  }
});

app.get("/api/reports/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Report.findById(id));
});

app.put("/account/reports", async (req, res) => {
  //try /api/reports
  const { token } = req.cookies;
  const { id, title, description } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const reportDoc = await Report.findById(id);
    if (userData.id === reportDoc.owner.toString()) {
      reportDoc.set({
        title,
        description,
      });
      await reportDoc.save();
      res.json("ok");
    }
  });
});

app.post("/account/reports", async (req, res) => {
  const { title, description } = req.body;
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) return res.status(403).json({ error: "Unauthorized" });

    try {
      const newReport = await Report.create({
        title,
        description,
        owner: userData.id,
      });
      res.status(201).json(newReport);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to create report", message: error.message });
    }
  });
});

app.get("/api/report", async (req, res) => {
  res.json(await Report.find());
});

app.get("/account/user-reports", async (req, res) => {
  const { token } = req.cookies;
  try {
    const userData = await getUserDataFromReq(req);
    const reports = await Report.find({ owner: userData.id });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(4000, () => {
  console.log(`Server running on port 4000`);
});
