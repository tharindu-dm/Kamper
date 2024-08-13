const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //this will get filled out automatically
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number, 
});

const PlaceModel = mongoose.model('Place', PlaceSchema);

module.exports = PlaceModel;