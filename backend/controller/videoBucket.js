// Express router

const fs = require("fs");
const fsp = require("fs/promises");

const ImageDataURI = require("image-data-uri");

const ffmpeg = require("fluent-ffmpeg");
const { getBucket, getDB } = require("../database/db");
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const createFileInDir = async function (fileUrl, frameFolder, fileIndex) {
  // digits - 5
  // fileIndex.length
  const maxDigits = 5;
  let zeroCount = maxDigits - `${fileIndex}`.length;

  const fName = await ImageDataURI.outputFile(
    fileUrl,
    frameFolder + "frame" + "0".repeat(zeroCount) + fileIndex + ".png"
  );
  console.log(fName);
};
const createFrames = async function (images, frameFolder) {
  for (let i = 0; i < images.length; i++) {
    const imgUrl = images[i];
    await createFileInDir(imgUrl, frameFolder, i);
  }
};

const saveIntoFS = async function (videoPath) {
  await fsp.copyFile(videoPath, "./output.mp4");
};
const setProc = function (proc) {
  return proc
    .format("mp4")
    .size("1280x?")
    .aspect("16:9")
    .videoCodec("libx264")
    .videoBitrate("1000");
};

const createVideo = async function (videoFolder, frameFolder, imageOptions) {
  var proc = ffmpeg(frameFolder + "frame%05d.png");
  const loopTime = imageOptions.count / imageOptions.fps;
  setProc(proc);

  return proc
    .inputFPS(imageOptions.fps)
    .loop(loopTime * 300)
    .save(videoFolder + "output.mp4");
};

class VideoBucket {
  static download(fileId) {
    const bucket = getBucket();
    return bucket.openDownloadStream(fileId, {
      chunkSizeBytes: 1024 * 255,
    });
  }
  static async findById(fileId) {
    const db = getDB();
    const VideoCollection = db.collection("videobucket.files");
    return await VideoCollection.findOne({ _id: fileId });
  }
  static async findAll() {
    const db = getDB();
    const VideoCollection = db.collection("videobucket.files");
    return await VideoCollection.find().toArray();
  }
  static async delete(fileId) {
    const bucket = getBucket();
    return await bucket.delete(fileId);
  }

  static async download(fileId, outputPath) {
    const bucket = getBucket();
    const videoData = await bucket.openDownloadStream(fileId);
    return await fsp.writeFile(outputPath, videoData);
  }
  static download2(fileId, options) {
    const bucket = getBucket();
    return bucket.openDownloadStream(fileId, options);
  }

  static async upload(filePath, fileName = `myfile`) {
    const bucket = getBucket();
    const GFSWrite = await bucket.openUploadStream(fileName, {
      chunkSizeBytes: 1024 * 255,
    });

    fs.createReadStream(filePath).pipe(GFSWrite);
    return GFSWrite.id;
  }
}

module.exports = {
  createFileInDir,
  createFrames,
  saveIntoFS,
  createVideo,

  VideoBucket,
};
