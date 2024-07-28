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

    ffmpeg(inputFilePath) 
        .outputOptions("-vf", "scale = -1:360") //Resolution to 360p
        .on("end", () => {
            res.status(200).send("Processing is Complete")
        })
        // conditional because ffmpeg runs Asynchronously 
        .on("error", (err) =>{
            console.log(`An error has occurred: ${err.message}`);
            res.status(500).send(`We've run into an Error: ${err.message}`);
        })
        .save(outputFilePath);
        
})

const port = process.env.PORT || 3000 //standard way to provide port at runtime
app.listen(port, () =>{
    console.log(`VideoApp Listening at https://localhost:${port}`)
})