import express, { application } from 'express';
import Blog from '../models/blog.js';
import Comment from '../models/comment.js';

const blogRoutes = express.Router();

blogRoutes.get('/', (req, res) => {
    BlogPost.find({}, function(err, blogPosts) {
            res.send(blogPosts);
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

});

blogRoutes.get('/comments/', (req, res) => { 
});

blogRoutes.put('/', (req, res) => {

});

blogRoutes.delete('/:id', (req, res) => {

});

export default blogRoutes;