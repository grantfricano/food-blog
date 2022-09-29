import jwt from 'jsonwebtoken';

let ValidateJWTTokenMiddleware = (req, res, next) => {
    let token = req.headers.authorization;
    if(token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET_KEY);
            next();
        } catch(e){
            res.status(403).send('Forbidden');
        }
    }
    else {
        res.status(401).send('Unauthorized');
    }
}

export default ValidateJWTTokenMiddleware;