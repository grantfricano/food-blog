import express, { application } from 'express';
import blog from '../models/blog.js';
import Blog from '../models/blog.js';
import Comment from '../models/comment.js';

const blogRoutes = express.Router();

blogRoutes.get('/', (req, res) => {
    Blog.find({}, function(err, blogs) {
            res.send(blogs);
        }); 
});

blogRoutes.get('/:id', (req, res) => {

});

blogRoutes.post('/', (req, res) => { 
    let blog = new Blog({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    });
    blog.save();
    res.json(blog);
});

blogRoutes.post('/comments', (req, res) => { 
    let comment = new Comment({
        author: req.body.author,
        content: req.body.content,
        blog: req.body.blog
    });
    comment.save();
    Blog.findOneAndUpdate({_id: req.body.blog},{$push: {comments: comment}}, (err, data) => {
        if (err) {
            console.log(err);
        }
    });
    res.json(comment);
});

blogRoutes.get('/comments/', (req, res) => { 
});

blogRoutes.put('/', (req, res) => {

});

blogRoutes.delete('/:id', (req, res) => {

});

export default blogRoutes;