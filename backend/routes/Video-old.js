// Express router
const os = require("os");
const fs = require("fs");
const fsp = require("fs/promises");

const express = require("express");
const path = require("path");
const router = express.Router();

const ImageDataURI = require("image-data-uri");

const ffmpeg = require("fluent-ffmpeg");
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

// Streaming individual video
// Endpoint sending smaller chunks of the video, instead of serving an entire video file on request.
// Make sure the filenames for the videos are corresponding to the id in the videos array

router.get("/video/:id", (req, res) => {
  // Get the id from the route & Generating a videoPath
  const videoPath = `assets/${req.params.id}.mp4`;
  // Reading the file Size using the file system
  const videoStat = fs.statSync(videoPath);
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
  const file = fs.createReadStream(videoPath, { start, end });
  const head = {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": chunksize,
    "Content-Type": "video/mp4",
  };
  // 206 Signifying that the response contains partial content
  res.writeHead(206, head);
  file.pipe(res);
  // }
  // Some browsers send a range in the initial request, but others don’t.
  // For those that don’t, or if for any other reason the browser doesn’t send a range, we handle that in the else block.
  // This code gets the file size and send the first few chunks of the video:
  //     else {
  //     const head = {
  //         'Content-Length': fileSize,
  //         'Content-Type': 'video/mp4',
  //     };
  //     res.writeHead(200, head);
  //     fs.createReadStream(videoPath).pipe(res);
  // }
});
router.get("/:id", (req, res) => {
  // video -> files,chunks

  // Get the id from the route & Generating a videoPath
  //   const { id } = req.params;
  const videoPath = `assets/${req.params.id}.mp4`;
  // Reading the file Size using the file system
  const videoStat = fs.statSync(videoPath);
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
  const file = fs.createReadStream(videoPath, { start, end });
  const head = {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": chunksize,
    "Content-Type": "video/mp4",
  };
  // 206 Signifying that the response contains partial content
  res.writeHead(206, head);
  file.pipe(res);
  // }
  // Some browsers send a range in the initial request, but others don’t.
  // For those that don’t, or if for any other reason the browser doesn’t send a range, we handle that in the else block.
  // This code gets the file size and send the first few chunks of the video:
  //     else {
  //     const head = {
  //         'Content-Length': fileSize,
  //         'Content-Type': 'video/mp4',
  //     };
  //     res.writeHead(200, head);
  //     fs.createReadStream(videoPath).pipe(res);
  // }
});
const createFileInDir = async function (fileUrl, frameFolder, fileIndex) {
  // digits - 5
  // fileIndex.length
  const maxDigits = 5;
  let zeroCount = maxDigits - `${fileIndex}`.length;

  await ImageDataURI.outputFile(
    fileUrl,
    frameFolder + "frame" + "0".repeat(zeroCount) + fileIndex + ".png"
  );
  console.log("done");
};
const createFrames = async function (images, frameFolder) {
  for (let i = 0; i < images.length; i++) {
    const imgUrl = images[i];
    await createFileInDir(imgUrl, frameFolder, i);
  }
};

const saveIntoFS = async function (videoPath) {
  await fsp.copyFile(videoPath, "./output.mp4");
  //  fs.copyFile(, (err) => {
  //   if (err) throw err;
  //   console.log("source.txt was copied to destination.txt");
  // });
};

const createVideo = async function (videoFolder, frameFolder, res) {
  var proc = ffmpeg(frameFolder + "frame%05d.png");

  proc

    .fps(1)

    .format("mp4")
    // .output(videoFolder + "output.mp4")
    .on("end", function () {
      console.log("file has been converted succesfully");

      saveIntoFS(videoFolder + "output.mp4");

      res.json({ msg: "sucess" });
      //save into database
    })
    .on("error", function (err) {
      console.log("an error happened: " + err.message);

      res.status(404).json({ msg: "cant create video" });
    })
    .save(videoFolder + "output.mp4");

  return result;
};

router.post("/", async (req, res, next) => {
  const videoFolder = await fsp.mkdtemp(path.join(os.tmpdir(), "video-"));
  const frameFolder = await fsp.mkdtemp(path.join(os.tmpdir(), "frames-"));
  await createFrames(req.body.images, frameFolder);
  await createVideo(videoFolder, frameFolder, res);
});

// Route that will handle caption request
const captionPath = "/Users/Toc/Sites/streaming-app/backend";
router.get("/video/:id/caption", (req, res) =>
  res.sendFile(`assets/captions/${req.params.id}.vtt`, { root: captionPath })
);

module.exports = router;
