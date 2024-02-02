const jwt = require('jsonwebtoken');
const JWT_SECRET = 'JWT_TOKEN';

const fetchuser = (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({ error: 'Please authenticate with valid token' })
    }
    try {
        var decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.id;        
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Please authenticate with valid token' })
    }
}

module.exports = fetchuser;