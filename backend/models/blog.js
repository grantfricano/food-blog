import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    body: String,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Blog', blogSchema);