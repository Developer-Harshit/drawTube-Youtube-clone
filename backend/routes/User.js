const express = require("express");
const { v4: uuidv4 } = require("uuid");
const User = require("../controller/User");
const Auth = require("../controller/Auth");
const checkAuth = require("../middlewares/CheckAuth");

const router = express.Router();

//--------------------------------------------------------//
// GET - ALL USER's DRAFT
router.post("/sign", async (req, res) => {
    const { username, usertag: userhandle, password, dataurl } = req.body;
    //----------------------------------------------------//
    // VERIFY FOR VALID DATA
    const verifyError = {
        sucess: false,
        error: true,
        type: "CLIENT",
        message: "Invalid or empty data fields",
    };
    if (
        !username ||
        !userhandle ||
        !password ||
        username.length < 3 ||
        userhandle.length < 3 ||
        password.length < 5
    )
        return res.status(400).json(verifyError);
    //----------------------------------------------------//
    // VERIFY IF USER ALREADY EXISTS
    let mongoResult;
    try {
        mongoResult = await User.findByTag(userhandle);
    } catch (e) {
        return res.status(500).json({
            sucess: false,
            error: e,
            type: "SERVER",
            message: "Something went wrong",
        });
    }

    if (mongoResult) {
        verifyError.message = "User already exists";
        return res.status(400).json(verifyError);
    }

    //----------------------------------------------------//
    // GENERATE ENCRYPTED PASSWORD
    const hashed = User.encrypt(password);
    //----------------------------------------------------//
    // STORE USER DATA IN DB
    const uniqueId = uuidv4();
    let result;
    const userData = {
        _id: uniqueId,
        name: username,
        handle: userhandle,
        password: hashed,
        profile: User.getLink(uniqueId),
        legit: true,
    };
    const mongoError = {
        message: "Unable to save user to database",
        sucess: true,
        error: e,
        type: "SERVER",
    };
    try {
        result = await User.uploadData(userData);
    } catch (e) {
        return res.status(500).json(mongoError);
    }
    if (!result.acknowledged) return res.status(500).json(mongoError);

    //----------------------------------------------------//
    // GENERATE TOKEN

    const token = Auth.register({
        id: uniqueId,
        name: userData.name,
        handle: userData.handle,
        profile: userData.profile,
    });
    //----------------------------------------------------//
    // Send token as sucess response
    return res.status(200).json({
        sucess: true,
        message: "Signed in",
        error: false,
        result: {
            token: token,
            id: result.inserted_id,
        },
    });
});
//--------------------------------------------------------//
//
//
//--------------------------------------------------------//
// GET - ONE DRAFT BY id
router.post("/log", async (req, res) => {
    const { userhandle, password } = req.body;

    //----------------------------------------------------//
    // VERIFY IF USER ALREADY EXISTS
    const verifyError = {
        sucess: false,
        error: true,
        type: "CLIENT",
        message: "User does not exist",
    };
    let mongoResult;
    try {
        mongoResult = await User.findByTag(userhandle);
    } catch (e) {
        return res.status(500).json({
            sucess: false,
            error: e,
            type: "SERVER",
            message: "Something went wrong",
        });
    }

    if (!mongoResult) return res.status(400).json(verifyError);

    //----------------------------------------------------//
    // COMPARE PASSWORD
    const hashed = mongoResult.password;
    if (!(await User.compare(password, hashed))) {
        verifyError.message = "Password does not match";
        return res.status(400).json(verifyError);
    }

    //----------------------------------------------------//
    // GENERATE TOKEN

    const token = Auth.register({
        id: mongoResult._id,
        name: mongoResult.name,
        handle: mongoResult.handle,
        profile: mongoResult.profile,
    });
    //----------------------------------------------------//
    // Send token as sucess response
    return res.status(200).json({
        sucess: true,
        message: "Logged in",
        error: false,
        result: {
            token: token,
            id: result.inserted_id,
        },
    });
});
//--------------------------------------------------------//
//
//
//--------------------------------------------------------//
// UPDATE - Username
router.put("/update/name", checkAuth, async (req, res) => {
    const { name } = req.body;
    //----------------------------------------------------//
    // UPDATE USER DATA
    const uid = req.user._id;
    const errorData = {
        sucess: false,
        error: true,
        type: "SERVER",
        code: 500,
        message: "Unable to update user data",
    };
    let result;
    try {
        result = await User.updateData(uid, { name: name });
    } catch (e) {
        errorData.error = e;
        return res.status(500).json(errorData);
    }
    if (!result || !result.acknowledged) return res.status(500).json(errorData);
    return res.status(200).json({
        result: {
            old_name: req.user.name,
            new_name: name,
        },
        sucess: true,
        error: false,
        code: 200,
        message: "Updated user data",
    });
});
//--------------------------------------------------------//
//
//
//--------------------------------------------------------//
// UPDATE - userprofile
router.put("/update/profile", checkAuth, async (req, res) => {
    const { profile } = req.body;
    //----------------------------------------------------//
    // UPDATE USER DATA
    const uid = req.user._id;
    const errorData = {
        sucess: false,
        error: true,
        type: "SERVER",
        code: 500,
        message: "Unable to update profile",
    };
    let result;
    try {
        result = await User.uploadPNG(profile, uid);
    } catch (e) {
        errorData.error = e;
        return res.status(500).json(errorData);
    }
    if (!result) return res.status(500).json(errorData);
    return res.status(200).json({
        result: result,
        sucess: true,
        error: false,
        code: 200,
        message: "Updated user profile",
    });
});
//--------------------------------------------------------//
module.exports = router;
