const jwt = require("jsonwebtoken");
const config = require("./config/config");

exports.checkToken = (req, res, next) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) {
        return res.status(403).json({ message: "Sem tokens providos." });
    }

    const actualToken = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;

    jwt.verify(actualToken, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido" });
        }

        req.userId = decoded.id;
        req.userEmail = decoded.email;
        next();
    });
};
