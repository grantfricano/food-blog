import jwt from'jsonwebtoken';
import express from 'express';
import User from '../models/user.js'

const authenticationRoutes = express.Router();

authenticationRoutes.post('/', (req, res) => {

    User.findOne({username: {$eq: req.body.username}}, (err, user) => {
        if (err) return res.send({message: 'there was an error1'});
        
        if (!user) return res.send({message: 'user not found'});

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(err) {
                res.send({message: 'there was an error2'});
            }
            
            if(isMatch) {
                const payload = {
                    username: req.body.username,
                    age: 35,
                    id: 123
                }
                const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
                res.send({token: token});
            } else {
                res.send({message: 'invalid password'});
            } 
        });
    });
})

export default authenticationRoutes;