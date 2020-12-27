const { model, Schema } = require('mongoose');

// Schema that shows what a 'User' object entails
const userSchema = new Schema ({
    username: String,
    password: String,
    email: String,
    createdAt: String
});

module.exports = model('User', userSchema);