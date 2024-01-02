const Auth = require("../controller/Auth");
const User = require("../controller/User");

const checkAuth = async (req, res, next) => {
    let token;
    try {
        token = Auth.verify(req);
    } catch (e) {
        return res.status(400).json({
            sucess: false,
            error: e,
            type: "CLIENT",
            message: "Cant verify the token",
        });
    }

    if (!token || !token.legit)
        return res.status(400).json({
            sucess: false,
            error: true,
            type: "CLIENT",
            message: "Invalid or undefined token",
        });

    let userData;
    try {
        userData = await User.findByID(token.id);
    } catch (e) {
        return res.status(500).json({
            sucess: false,
            type: "SERVER",
            message: "Error in getting user data",
            code: 500,
            error: e,
        });
    }
    if (!userData || !userData.legit)
        return res.status(404).json({
            sucess: false,
            type: "CLIENT",
            message: "User NOT FOUND",
            code: 404,
            error: true,
        });
    userData.password = null;

    req.user = userData;
    req.token = token;

    next();
};
module.exports = checkAuth;
