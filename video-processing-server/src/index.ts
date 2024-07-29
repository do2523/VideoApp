import express from "express";
import ffmpeg from "fluent-ffmpeg";   // <symbolic link> Issue installing the actual ffmpeg  ***
import { setupDirectories } from './storage.ts'

const app = express();
app.use(express.json()); // So express can handle JS req

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

const port = process.env.PORT || 3000 //standard way to provide port at runtime
app.listen(port, () =>{
    console.log(`VideoApp Listening at https://localhost:${port}`)
})