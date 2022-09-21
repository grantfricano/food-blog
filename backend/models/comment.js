import mongoose from 'mongoose';

const commentScheme = new mongoose.Schema ({
    author: String, 
    content: String,
    createdAt: { type: Date, default: Date.now }

});

export default mongoose.model('Comment', commentScheme);