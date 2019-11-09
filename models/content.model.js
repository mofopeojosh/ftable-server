const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ContentSchema = new Schema({
    name: { type: String, required: true, max: 24},
    description: { type: String, required: true, max: 100},
    image: { type: String, required: false },
    link: { type: String, required: false }
});

module.exports = mongoose.model('Content', ContentSchema);
