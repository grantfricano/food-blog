import User from "../models/user.js";

let uniqueUsernameCheckMiddleware = (req, res, next) => {
    User.findOne({username: req.body.username}, (err, user) => {
        if(user) {
            res.status(400).send({message:'Username already in use' });
        } else {
            next();
        }
    });
}

export default uniqueUsernameCheckMiddleware;