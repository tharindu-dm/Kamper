const mongoose = require('mongoose');

const GearSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //this will get filled out automatically
    type: String,
    photos: [String],
    description: String,
    searchCriteria: [String],
    extraInfo: String,
    capacity: Number,
    price: Number, 
});

const GearModel = mongoose.model('Gear', GearSchema);

module.exports = GearModel;