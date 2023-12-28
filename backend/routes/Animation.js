// Express router
const os = require("os");
const fs = require("fs");
const fsp = require("fs/promises");
const express = require("express");
const path = require("path");
const router = express.Router();

const {
  createFrames,
  createAnimation,
  MyBucket,
  saveIntoFS,
} = require("../controller/AnimationBucket");
const { getObjectId } = require("../controller/Utils");
// const { getBucket, getDB } = require("../database/db");

router.get("/", async (req, res) => {
  console.log("getting animation");

  res.json({ result: await MyBucket.findAll() });
});

router.get("/:id", async (req, res, next) => {
  const viewFolder = await fsp.mkdtemp(path.join(os.tmpdir(), "view-"));
  const viewPath = path.join(viewFolder, "animation.mp4");
  const { id } = req.params;
  const o_id = getObjectId(id, next);
  if (!o_id) return;

  await MyBucket.download(o_id, viewPath);

  // Get the id from the route & Generating a videoPath

  // Reading the file Size using the file system
  const videoStat = fs.statSync(viewPath);
  const fileSize = videoStat.size;
  // For videos, a user’s browser will send a range parameter in the request. This lets the server know which chunk of the video to send back to the client.
  var videoRange = req.headers.range;

  if (!videoRange) {
    videoRange = "bytes=0-";
  }
  const parts = videoRange.replace(/bytes=/, "").split("-");
  // creates a read stream using the start and end values of the range
  const start = parseInt(parts[0], 10);
  const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
  // Set the Content-Length of the response headers to the chunk size that is calculated from the start and end values
  const chunksize = end - start + 1;
  console.log(start, end, chunksize);
  const file = fs.createReadStream(viewPath, { start, end });
  const head = {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": chunksize,
    "Content-Type": "video/mp4",
  };
  // 206 Signifying that the response contains partial content
  res.writeHead(206, head);
  file.pipe(res);
});
router.post("/", async (req, res, next) => {
  const { images, fps } = req.body;
  const videoFolder = await fsp.mkdtemp(path.join(os.tmpdir(), "output-"));
  const frameFolder = await fsp.mkdtemp(path.join(os.tmpdir(), "frames-"));
  await createFrames(images, frameFolder);
  const video = await createAnimation(videoFolder, frameFolder, {
    count: images.length,
    fps,
  });
  video.on("end", async function () {
    console.log("file has been converted succesfully");
    saveIntoFS(videoFolder + "output.mp4");
    const result = await MyBucket.upload(videoFolder + "output.mp4");
    res.json({ msg: "sucessful", result });
  });

  video.on("error", function (err) {
    console.log("an error happened: " + err.message);
    res.status(404).json({ msg: "cant create animation" });
  });
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const o_id = getObjectId(id, next);
  if (!o_id) return;
  const result = await MyBucket.delete(o_id);

  res.json({ msg: "sucess", result });
});

module.exports = router;
