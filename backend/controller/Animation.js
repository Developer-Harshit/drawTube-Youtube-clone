const fsp = require("fs/promises");

const ImageDataURI = require("image-data-uri");

const ffmpeg = require("fluent-ffmpeg");

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

const createAnimation = async function (
    videoFolder,
    frameFolder,
    imageOptions
) {
    var proc = ffmpeg(frameFolder + "frame%05d.png");
    const loopTime = imageOptions.count / imageOptions.fps;
    setProc(proc);

    return proc
        .inputFPS(imageOptions.fps)
        .loop(loopTime)
        .save(videoFolder + "output.mp4");
};

module.exports = {
    createFileInDir,
    createFrames,
    saveIntoFS,
    createAnimation,
};
