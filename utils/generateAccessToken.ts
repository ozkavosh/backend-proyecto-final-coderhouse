import jwt from 'jsonwebtoken';

const generateAccessToken = (username) => {
    return jwt.sign(username, process.env.TOKEN_SECRET);
}

export default generateAccessToken;