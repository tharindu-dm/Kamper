const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //this will get filled out automatically
    title: String,
    address: String,
    photos: [String], //photos are saved as photoname, as a string array
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: String, //saved as string for simplicity and time format
    checkOut: String,
    maxGuests: Number, 
    price: Number,
});

const PlaceModel = mongoose.model('Place', PlaceSchema);

module.exports = PlaceModel;