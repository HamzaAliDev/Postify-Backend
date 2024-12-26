const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({
                data: null,
                message: "Please login first",
            })
        }

        // const token = authHeader.split(" ")[1]
        if (!authHeader) {
            return res.status(401).json({
                data: null,
                message: "Token is missing",
            });
        }

        const decoded = jwt.verify(authHeader, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({
                data: null,
                message: "Please login first",
            });
        }
        console.log("decoded",decoded)
        req.user = decoded;
        next();
    } catch (error) {
        res.status(409).json({
            data: null,
            message: "Failed to verify",
            error: error.message
        });

    }
}

module.exports = verifyToken