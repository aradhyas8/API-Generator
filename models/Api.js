const { model, Schema } = require('mongoose');


const ApiSchema = new Schema({
    id: String,
    name: String,
    email: String,
    password: String,
});

module.exports = model('Api', ApiSchema);