const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    place: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Place'}, // Reference to the Place model
    user: {type:mongoose.Schema.Types.ObjectId, required:true}, // Reference to the User model
    checkIn: {type:Date, required:true},
    checkOut: {type:Date, required:true},
    name: {type:String, required:true},
    phone: {type:String, required:true},
    price: Number,
});

const BookingModel = mongoose.model('Booking', bookingSchema); // Create a Booking model from the schema

module.exports = BookingModel; // Export the Booking model