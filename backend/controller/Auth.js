const jwt = require("jsonwebtoken");

class Auth {
    static register(userdata) {
        return jwt.sign(userdata, process.env.JWT_KEY);
    }

    static verify(req) {
        // req header must be set like : header_key: "Bearer <jwt_token>"
        // userdata : { id,name,handle,profile,legit }
        let token;
        if (req.header(process.env.HEADER_KEY))
            token = req.header(process.env.HEADER_KEY).split(" ")[1];
        else throw new Error("Header not defined");

        return jwt.verify(token, process.env.JWT_KEY);
    }
}
module.exports = Auth;
