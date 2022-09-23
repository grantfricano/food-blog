import jwt from'jsonwebtoken';
import express from 'express';

const authenticationRoutes = express.Router();

authenticationRoutes.post('/', (req, res) => {
    if(req.body.username === 'admin' && req.body.password === 'admin@123') {
        // set session variables here and then i can check them other place to force login
        const payload = {
            username: 'admin',
            age: 35,
            id: 123
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
        res.send({token: token});
    }
    else {
        res.status(400).send('Invalid username or password.');
    }
})

export default authenticationRoutes;