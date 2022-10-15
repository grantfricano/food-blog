import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema ({
    author: String, 
    content: String,
    //blog: {type:mongoose.Schema.Types.ObjectId, ref:'Blog'},
    slug: String,
    createdAt: { type: Date, default: Date.now }
});

// commentSchema.pre('remove', function(next) {
//     // Remove all the assignment docs that reference the removed person.
//     this.model('Blog').remove({$pullAll: {comments: this._id }}, next);
// });
export default mongoose.model('Comment', commentSchema);