const mongoose = require('mongoose');

const rentingSchema = new mongoose.Schema({
    gear: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Gear'},
    user: {type:mongoose.Schema.Types.ObjectId, required:true},
    checkIn: {type:Date, required:true},
    checkOut: {type:Date, required:true},
    name: {type:String, required:true},
    phone: {type:String, required:true},
    price: Number,
});

const RentingModel = mongoose.model('Renting', rentingSchema);

module.exports = RentingModel;