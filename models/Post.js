const { model, Schema } = require('mongoose');

// Schema that shows what entails a 'Post' object
const postSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref :'users'
    }
});

module.exports = model('Post', postSchema);