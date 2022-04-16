const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    metaCardList: {
        type: Array,
        default: [],
        required: true
    },
    inputsCardList: {
        type: Array,
        default: [],
        required: true
    },
    outputsCardList: {
        type: Array,
        default: [],
        required: true
    }
});

module.exports = mongoose.model('Form', formSchema);