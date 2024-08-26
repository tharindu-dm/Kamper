const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //this will get filled out automatically
    title: String,
    description: String,
   
});

const ReportModel = mongoose.model('Report', ReportSchema);

module.exports = ReportModel;