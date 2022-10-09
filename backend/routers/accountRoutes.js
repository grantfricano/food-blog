import express from 'express';
import User from '../models/user.js';
import nodemailer from 'nodemailer';
import uniqueUsernameCheckMiddleware from '../middlewares/uniqueUsernameCheckMiddleware.js';
import crypto from 'crypto';
import user from '../models/user.js';

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

    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.body.resetToken)
        .digest('hex');


    User.findOne( {resetPasswordToken, resetPasswordExpire: {$gt: Date.now()}}, (err, user) => {
        if (!user) return res.send({message: 'user not found'});
        
        user.password = req.body.newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        user.save();
    })
});

accountsRoutes.post('/forgotpassword', (req, res) => {

    User.findOne( {username: req.body.username}, (err, user) =>{
        if (!user) return res.send({message: 'user not found'});

        const resetToken = user.getResetPasswordToken();
        user.save();
        const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;
        const message = `${resetUrl}`;

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'grant.fricano@gmail.com',
                pass: 'lhwcspsyqgwknwce'
            }
        });

        let mailOptions = {
            from: '"Krunal Lathiya" <xx@gmail.com>', // sender address
            to: req.body.to, // list of receivers
            subject: 'Password Reset', // Subject line
            text: message 
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
                res.render('index');
            });
    })
});


export default accountsRoutes;