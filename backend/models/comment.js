import mongoose from 'mongoose';

const commentScheme = new mongoose.Schema ({
    author: String, 
    content: String,
    blog: {type:mongoose.Schema.Types.ObjectId, ref:'Blog'},
    createdAt: { type: Date, default: Date.now }

});

export default mongoose.model('Comment', commentScheme);