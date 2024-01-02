const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Video = require("../controller/Video");
const {
    createFrames,
    saveIntoFS,
    createAnimation,
} = require("../controller/Animation");
const checkAuth = require("../middlewares/CheckAuth");

const router = express.Router();

//--------------------------------------------------------//
// GET - ALL VIDEO
router.get("/", async (req, res) => {
    // type: "SEARCH" || "ALL" || NULL
    // from : NUMBER
    // count : NUMBER
    const { type, from, count } = req.query;

    let findQuery = {};
    if (type == "SEARCH") {
        //----------------------------------------------------//
        // modify find Query
    }
    //----------------------------------------------------//
    // getting results
    let result;
    try {
        result = await Video.getAll(from, count, findQuery);
    } catch (e) {
        return res.status(500).json({
            type: "SERVER",
            message: "Error in fetching data from database",
            sucess: false,
            code: 500,
            error: e,
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
// GET - ALL VIDEOS BY USER
router.get("/user", checkAuth, async (req, res) => {
    const uid = req.user._id;

    //----------------------------------------------------//
    // getting results
    let result;
    try {
        result = await Video.findByUID(uid);
    } catch (e) {
        return res.status(404).json({
            type: "CLIENT",
            message: "NOT FOUND",
            sucess: false,
            code: 404,
            error: e,
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
// CREATE - NEW VIDEO
router.post("/user", checkAuth, async (req, res) => {
    const { name, desc, tframe, tags, fps } = req.body;
    const { data } = req.file;

    //----------------------------------------------------//
    // PARSE DATA INTO JSON
    const parsedData = {
        fps: 10,
        frames: [],
    };

    //----------------------------------------------------//
    // CREATE UNIQUE ID AND DATA
    const uniqueId = uuidv4();
    //----------------------------------------------------//
    // CREATE VIDEO AND SAVE LOCALLY
    const videoFolder = await fsp.mkdtemp(path.join(os.tmpdir(), "output-"));
    const frameFolder = await fsp.mkdtemp(path.join(os.tmpdir(), "frames-"));
    await createFrames(parsedData.frames, frameFolder);
    const video = await createAnimation(videoFolder, frameFolder, {
        count: parsedData.frames.length,
        fps: fps,
    });
    video.on("end", async function () {
        console.log("file has been converted succesfully");
        const videoPath = videoFolder + "output.mp4";
        await saveIntoFS(videoPath); // For debugging only
        //----------------------------------------------------//
        // UPLOAD VIDEO TO CLOUD
        let cloudResult;
        try {
            cloudResult = await Video.uploadVideo(videoPath, uniqueId);
        } catch (e) {
            return res.status(500).json({
                error: e,
                code: 500,
                sucess: false,
                type: "EXTERNAL",
                message: "Unable to upload to cloud",
            });
        }

        if (!cloudResult || !cloudResult.secure_url || !cloudResult.public_id) {
            return res.status(500).json({
                error: e,
                code: 500,
                sucess: false,
                type: "EXTERNAL",
                message: "Unable to upload video",
            });
        }

        //----------------------------------------------------//
        // GET USER INFO
        //

        //----------------------------------------------------//
        // UPLOAD DATA TO MONGODB

        const mongodata = {
            name: name,
            desc: desc,
            tags: tags,
            thumbnail: parsedData.frames[tframe],
            created_at: cloudResult.created_at,
            public_id: cloudResult.public_id,
            secure_url: cloudResult.secure_url,
            url: Video.getCloudLink(uniqueId),
            user: req.user,
        };
        let mongoResult;
        try {
            mongoResult = await Video.uploadData(data);
        } catch (e) {
            return res.status(500).json({
                type: "SERVER",
                sucess: false,
                error: e,
                code: 500,
                message: "Unable to upload to database",
            });
        }
        if (!mongoResult || !mongoResult.acknowledged)
            return res.status(500).json({
                type: "SERVER",
                sucess: false,
                error: true,
                code: 500,
                message: "Unable to upload to database",
            });

        return res.status(200).json({
            sucess: true,
            code: 200,
            message: "Sucessfully uploaded video",
            result: {
                name: name,
                thumbnail: parsedData.frames[tframe],
                created_at: cloudResult.created_at,
                public_id: cloudResult.public_id,
                secure_url: cloudResult.secure_url,
                url: mongodata.url,
                user: user,
            },
        });
    });

    video.on("error", function (e) {
        return res.status(500).json({
            type: "EXTERNAL",
            sucess: false,
            error: e,
            message: "Unable to create video",
            code: 500,
        });
    });
});
//--------------------------------------------------------//
//
//
//--------------------------------------------------------//
// GET - ONE VIDEO BY id
router.get("/:id", async (req, res) => {
    // type: "SEARCH" || "ALL" || NULL
    // from : NUMBER
    // count : NUMBER
    const { id } = req.params;

    //----------------------------------------------------//
    // getting results
    let result;
    try {
        result = await Video.findById(id);
    } catch (e) {
        return res.status(404).json({
            type: "CLIENT",
            message: "NOT FOUND",
            sucess: false,
            code: 404,
            error: e,
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

module.exports = router;
