const express = require("express");
const { v4: uuidv4 } = require("uuid");

const Draft = require("../controller/Draft");

const router = express.Router();
//--------------------------------------------------------//
// MIDDLEWARE
// VERIFY USER TOKEN AND GET USERID
//--------------------------------------------------------//
// GET - ALL USER's DRAFT
router.get("/:uid", async (req, res) => {
    const { uid } = req.params.id;

    //----------------------------------------------------//
    // getting results
    let result;
    try {
        result = await Draft.getAllByUID(uid);
    } catch (e) {
        return res.status(500).json({
            type: "SERVER",
            message: "Error in fetching data from database",
            error: e,
            sucess: false,
            code: 500,
        });
    }
    //----------------------------------------------------//
    // checking if results are undefined
    if (!result) {
        return res.status(404).json({
            type: "CLIENT",
            message: "Cant find the desired data",
            error: false,
            sucess: false,
            code: 404,
        });
    }
    //----------------------------------------------------//
    // sending sucess response
    return res.status(200).json({
        message: "Sucessfully fetched data",
        result: result,
        sucess: true,
        error: false,
        code: 200,
    });
});
//--------------------------------------------------------//
//
//
//--------------------------------------------------------//
// GET - ONE DRAFT BY id
router.get("/:uid/:id", async (req, res) => {
    const { id, uid } = req.params.id;

    //----------------------------------------------------//
    // getting results
    let result;
    try {
        result = await Draft.getOneByID(id);
    } catch (e) {
        return res.status(404).json({
            type: "CLIENT",
            message: "NOT FOUND",
            error: e,
            sucess: false,
            code: 404,
        });
    }

    //----------------------------------------------------//
    // checking if results are undefined
    if (!result) {
        return res.status(404).json({
            type: "CLIENT",
            message: "Cant find the desired data",
            error: false,
            sucess: false,
            code: 404,
        });
    }
    //----------------------------------------------------//
    // sending sucess response
    return res.status(200).json({
        message: "Sucessfully fetched data",
        result: result,
        sucess: true,
        error: false,
        code: 200,
    });
});
//--------------------------------------------------------//
//
//
//--------------------------------------------------------//
// CREATE - NEW DRAFT
router.post("/:uid/", async (req, res) => {
    const { uid } = req.params;
    const { name, datauri } = req.body;

    //----------------------------------------------------//
    // CREATE UNIQUE ID AND DATA
    const uniqueId = uuidv4();

    const dbError = {
        error: true,
        sucess: false,
        type: "EXTERNAL",
        message: "Cant create workspace,try animating offline instead",
        code: 500,
    };
    //----------------------------------------------------//
    // UPLOAD TO CLOUD

    let cloudResult;
    try {
        cloudResult = await Draft.uploadJSON(datauri, uniqueId);
    } catch (e) {
        return res.status(500).json(dbError);
    }

    if (!cloudResult || !cloudResult.public_id || !cloudResult.secure_url)
        return res.status(500).json(dbError);

    //----------------------------------------------------//
    // UPLOAD TO MONGODB
    const mongodata = {
        name: name,
        uid: uid,
        url: Draft.getLink(uniqueId),
        secure_url: cloudResult.secure_url,
        _id: uniqueId,
        versions: [cloudResult.version],
        public_id: cloudResult.public_id,
    };
    let mongoResult;
    try {
        mongoResult = await Draft.uploadData(mongodata);
    } catch (e) {
        return res.status(500).json(dbError);
    }
    if (!mongoResult || !mongoResult.acknowledged)
        return res.status(500).json(dbError);

    // Sending sucess response
    res.status(200).json({
        sucess: true,
        error: false,
        code: 200,
        message: "Created",
        result: {
            id: uniqueId,
            name: name,
            url: mongodata.url,
            secure_url: cloudResult.secure_url,
            version: cloudResult.version,
        },
    });
});
//--------------------------------------------------------//
//
//
//--------------------------------------------------------//
// UPDATE - DRAFT CLOUD data
router.put("/:uid/:id", async (req, res) => {
    const { id } = req.params;
    const { datauri } = req.body;
    const { autosave } = req.query;

    //----------------------------------------------------//
    // GETTING MONGO_DATA

    let mongoResult;
    try {
        mongoResult = await Draft.getOneByID(id);
    } catch (e) {
        res.status(404).json({
            error: e,
            sucess: false,
            type: "CLIENT",
            message: "NOT FOUND",
            code: 404,
        });
    }
    if (!mongoResult)
        return res.status(404).json({
            error: true,
            sucess: false,
            type: "CLIENT",
            message: "NOT FOUND",
            code: 404,
        });

    let cloudResult;
    try {
        cloudResult = await Draft.uploadJSON(datauri, id);
    } catch (e) {
        return res.status(500).json(dbError);
    }

    if (!cloudResult || !cloudResult.public_id || !cloudResult.secure_url)
        return res.status(500).json(dbError);

    if (!autosave) {
        //----------------------------------------------------//
        // UPDATE MONGODB DATA
    }
    //----------------------------------------------------//
    // Sending sucess response
    res.status(200).json({
        sucess: true,
        error: false,
        code: 200,
        message: "Updated",
        result: {
            id: mongoResult._id,
            name: mongoResult.name,
            url: mongoResult.url,
            secure_url: cloudResult.secure_url,
            version: cloudResult.version,
        },
    });
});

module.exports = router;
