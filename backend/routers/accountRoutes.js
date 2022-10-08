import express from 'express';
import User from '../models/user.js';
import nodemailer from 'nodemailer';
import uniqueUsernameCheckMiddleware from '../middlewares/uniqueUsernameCheckMiddleware.js';

const accountsRoutes = express.Router();

accountsRoutes.post('/', uniqueUsernameCheckMiddleware, (req, res) => {

    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    newUser.save();

    res.json({message: "User created successfully"});

});

accountsRoutes.post('/resetpassword', (req, res) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'grant.fricano@gmail.com',
            pass: ''
        }
    });

    let mailOptions = {
        from: '"Krunal Lathiya" <xx@gmail.com>', // sender address
        to: req.body.to, // list of receivers
        subject: 'test', // Subject line
        text: 'test', // plain text body
        html: '<b>NodeJS Email Tutorial</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
            res.render('index');
        });
});


export default accountsRoutes;