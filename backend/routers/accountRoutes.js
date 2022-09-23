import express from 'express';
import User from '../models/user.js';

const accountsRoutes = express.Router();

accountsRoutes.post('/', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    newUser.save();

    res.json({message: "User created successfully"});

});

export default accountsRoutes;