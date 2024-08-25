const express = require("express");
const paths = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const Place = require("./models/Place.js");

const Booking = require('./models/Booking.js'); 
const Gear = require('./models/Gear.js');
const Renting= require('./models/Renting.js');

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
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
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
  //try /api/places
  const { token } = req.cookies;
  try {
    const userData = await getUserDataFromReq(req);
    const places = await Place.find({ owner: userData.id });
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/account/places/:id", async (req, res) => {
  //try /api/places/:id
  const { id } = req.params;
  res.json(await Place.findById(id));
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


app.post('/api/bookings', async(req, res) => { 
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromReq(req);
    const {place, checkIn, checkOut, numberOfGuests, name,phone,price} = req.body;
    Booking.create({
        place, checkIn, checkOut, numberOfGuests, name,phone,price , user:userData.id,  
    }).then(( doc) => {
        //if (err) throw err;
        res.json(doc);
    }).catch((err) => {
        throw err;
    });

});
app.post('/api/rentings', async(req, res) => { 
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  const {gear, checkIn, checkOut, numberOfItems, name,phone,price} = req.body;
  Renting.create({
      gear, checkIn, checkOut, numberOfItems, name,phone,price , user:userData.id,  
  }).then(( doc) => {
      //if (err) throw err;
      res.json(doc);
  }).catch((err) => {
      throw err;
  });

});

app.get("/api/bookings", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
});

app.get('/api/rentings', async (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  res.json( await Renting.find({user:userData.id}).populate('gear') );
});

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

app.listen(4000, () => {
  console.log(`Server running on port 4000`);
});
