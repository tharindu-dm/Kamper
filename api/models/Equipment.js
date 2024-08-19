const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //this will get filled out automatically
    type: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfor: String,
    capacity: Number, 
});

const EquipmentModel = mongoose.model('Equipment', EquipmentSchema);

module.exports = EquipmentModel;