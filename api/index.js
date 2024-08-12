const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/user.js");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use("/uploads", express.static(__dirname + "/uploads"));

// Utility function to extract user data from JWT
function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, (err, userData) => {
      if (err) reject(err);
      resolve(userData);
    });
  });
}

// Test route
app.get("/test", (req, res) => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    res.json("test ok");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({ error: "Database connection error" });
  }
});

// Registration route
app.post("/register", async (req, res) => {
  try {
    mongoose.connect(process.env.MONGO_URL);

    const { name, email, password } = req.body;
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    console.log("Caught error during registration:", e);
    res.status(422).json(e);
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    const { email, password } = req.body;

    const userDoc = await User.findOne({ email });

    if (!userDoc) {
      return res.status(401).json({ error: "User not found" });
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (!passOk) {
      return res.status(401).json({ error: "Invalid password" });
    }

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
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Login error" });
  }
});

// Profile route
app.get("/api/profile", async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error retrieving profile:", error);
    res.status(500).json({ error: "Profile retrieval error" });
  }
});

// Logout route
app.post("/logout", (req, res) => {
  try {
    res.cookie("token", "").json(true);
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ error: "Logout error" });
  }
});

// File upload by link route
app.post("/upload-by-link", async (req, res) => {
  try {
    const { link } = req.body;
    const newName = "photo" + Date.now() + ".jpg";
    await imageDownloader.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });
    res.json(newName);
  } catch (error) {
    console.error("Error during file upload by link:", error);
    res.status(500).json({ error: "File upload error" });
  }
});

// File upload route
const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 10), (req, res) => {
  try {
    const uploadedFiles = [];

    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);

      uploadedFiles.push(newPath.replace("uploads/", ""));
    }
    res.json(uploadedFiles);
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).json({ error: "File upload error" });
  }
});

// Start the server
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});