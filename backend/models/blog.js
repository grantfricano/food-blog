import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    body: String,
    comments: [{
        type:mongoose.Schema.Types.ObjectId, ref:'Comment'
    }],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Blog', blogSchema);