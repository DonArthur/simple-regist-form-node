const jwt = require('jsonwebtoken')

const jwtAuth = (req, res, next) => {
    const authHeader = req.header.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send('Unauthorized: No token provided')
    }
    
    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, 'secret_key')
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).send('Unauthorized: Invalid token')
    }
}

module.exports = jwtAuth