//mongoDB model for the user data
const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  profileImages: String, //profile image is a string
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
