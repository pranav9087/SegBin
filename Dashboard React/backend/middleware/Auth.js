const JWT = require('jsonwebtoken');
const User = require('../models/User');

const Auth = async (req, res, next) => {
    const {authorization} = req.headers;
    if (!authorization) {
        return res.status(401).json({error: 'You must be logged in.'});
    }
    const token = authorization.split(' ')[1];

    try {
        const {_id} = JWT.verify(token, process.env.JWT_SECRET);
        req.user = await User.findOne({_id}).select('_id');
        next();
    } catch {
        res.status(401).json({error: 'You must be logged in.'});
    }
}

module.exports = Auth;