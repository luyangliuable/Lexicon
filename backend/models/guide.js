const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
    name: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Guide', formSchema);
