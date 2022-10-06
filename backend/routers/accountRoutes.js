import express from 'express';
import User from '../models/user.js';

const accountsRoutes = express.Router();

accountsRoutes.post('/', uniqueUsernameCheckMiddleware, (req, res) => {

    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    newUser.save();

    res.json({message: "User created successfully"});

});

function uniqueUsernameCheckMiddleware(req, res, next) {
    User.findOne({username: req.body.username}, (err, user) => {
        if(user) {
            res.status(400).send({message:'Username already in use' });
        } else {
            next();
        }
    });
}

export default accountsRoutes;