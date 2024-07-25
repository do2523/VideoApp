import express from "express";
import ffmpeg from "fluent-ffmpeg";   // <symbolic link> Issue installing the actual ffmpeg  ***

const app = express();
const port = 3000;

app.post("/process-video", (req, res) =>{
    // Get path of the input video file from the request body

    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    if (!inputFilePath){
        res.status(400).send("Bad Request: Missing Input File Path")
    }
    if (!outputFilePath){
        res.status(400).send("Bad Request: Missing Output File Path")
    }
})

app.listen(port, () =>{
    console.log(`VideoApp Listening at https://localhost:${port}`)
})