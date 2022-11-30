const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guideSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    path: {
        type: String,
        required: false
    },
    tags: {
        type: Array,
        default: [],
        required: false
    },
    encoding: {
        type: String,
        required: false
    },
    mimetype: {
        type: String,
        required: false
    },
    size: {
        type: Number,
        required: false
    },
    originalname: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Guide', guideSchema);
