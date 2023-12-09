//  Necessary packages for the app.
//  - fs module is used to read & write into files easily on server
//  - path module provides a way of working with directories and file paths
//  - cors allow to make cross-origin requests cause client and server will be running on differents ports
const express = require('express');
// const fs = require('fs');
const cors = require('cors');
// const path = require('path');
const app = express();

var corsOptions = {
  origin: 'http://localhost:4321',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Route import
const video = require('./routes/Video.js')

// Routes 
app.get("/",function(req,res){


  const htmlcode = `
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>HTTP Video Stream From MongoDB</title>
    </head>
    <body>
    <video controls autoPlay crossorigin="anonymus">
    <source src="http://localhost:5000/videos/video/Couloir" type="video/mp4">
  </video>
    </body>
  </html>
  
  `
    res.send(htmlcode)
})

app.use('/videos', cors(corsOptions), video);

app.use(cors());


// listen to our server
app.listen(5000, () => {
    console.log('Listening on port 5000!')
});