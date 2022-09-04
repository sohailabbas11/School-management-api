const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.JWT_SEC, (err, staff) => {
            if (err) res.status(403).json('token is not valid')
            req.staff = staff
            next()
        })
    } else {
        return res.status(401).json('you are not authenticaticated')
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.staff.id === req.params.id || req.staff.isAdmin) {
            next()
        } else {
            res.status(403).json('you are not allowed')
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.staff.isAdmin) {
            next()
        } else {
            res.status(403).json('you are not allowed')
        }
    })
}


module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } 