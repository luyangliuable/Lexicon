const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    metaCardList: {
        type: Array,
        default: [],
        required: false
    },
    inputsCardList: {
        type: Array,
        default: [],
        required: false
    },
    outputsCardList: {
        type: Array,
        default: [],
        required: false
    }
});

module.exports = mongoose.model('Form', formSchema);
