// Express router
const fs = require('fs');
const express = require('express')
const router = express.Router()
const videos = require('../mockData')

// get list of videos in json
router.get('/', (req,res)=>{
    res.json(videos)
})
// make request for informations of a particular video
router.get('/:id/data', (req,res)=> {
    const id = parseInt(req.params.id, 10)
    res.json(videos[id])
})

// Streaming individual video
// Endpoint sending smaller chunks of the video, instead of serving an entire video file on request.
// Make sure the filenames for the videos are corresponding to the id in the videos array
router.get('/video/:id', (req, res) => {
    // Get the id from the route & Generating a videoPath
    const videoPath = `assets/${req.params.id}.mp4`;
    // Reading the file Size using the file system
    const videoStat = fs.statSync(videoPath);
    const fileSize = videoStat.size;
    // For videos, a user’s browser will send a range parameter in the request. This lets the server know which chunk of the video to send back to the client.
    var videoRange = req.headers.range;

    if (!videoRange) {
        videoRange = "bytes=0-"
    }
        const parts = videoRange.replace(/bytes=/, "").split("-");
        // creates a read stream using the start and end values of the range
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1;
        // Set the Content-Length of the response headers to the chunk size that is calculated from the start and end values
        const chunksize = (end-start) + 1;
        const file = fs.createReadStream(videoPath, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
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

// Route that will handle caption request
const captionPath = '/Users/Toc/Sites/streaming-app/backend'
router.get('/video/:id/caption', (req, res) => res.sendFile(`assets/captions/${req.params.id}.vtt`, { root: captionPath }));


module.exports = router;