const express = require('express');
const http = require('http');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const RTSP_URL = 'rtsp://user:Iam_User1@139.167.48.74:9554/cam/realmonitor?channel=1&subtype=1';
const HLS_FOLDER = path.join(__dirname, 'hls');

// Ensure the HLS folder exists
if (!fs.existsSync(HLS_FOLDER)) {
    fs.mkdirSync(HLS_FOLDER);
}

// Use CORS middleware
app.use(cors());

app.use('/hls', express.static(HLS_FOLDER));

app.get('/start', (req, res) => {
    console.log('Starting stream...');
    ffmpeg(RTSP_URL)
        .addOptions([
            '-f hls',
            '-hls_time 2',
            '-hls_list_size 4',
            '-hls_flags delete_segments',
            `-hls_segment_filename ${path.join(HLS_FOLDER, 'segment_%03d.ts')}`,
        ])
        .output(path.join(HLS_FOLDER, 'stream.m3u8'))
        .on('start', (commandLine) => {
            console.log('FFmpeg process started with command: ' + commandLine);
        })
        .on('progress', (progress) => {
            console.log('Processing: ' + progress.percent + '% done');
        })
        .on('end', () => {
            console.log('Processing finished!');
        })
        .on('error', (err, stdout, stderr) => {
            console.error('FFmpeg error: ' + err.message);
            console.error('FFmpeg stderr: ' + stderr);
        })
        .run();

    res.send('Streaming started');
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
