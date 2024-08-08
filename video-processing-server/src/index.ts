import express from "express";
import { convertVideo, 
    uploadProcessedVideo, 
    downloadRawVideo, 
    setupDirectories, 
    deleteRawVideo, 
    deleteProcessedVideo } from './storage'
// import { error } from "console";

setupDirectories();

const app = express();
app.use(express.json()); // So express can handle JS req

app.post("/process-video", async (req, res) =>{
    // Get bucket and filename from Cloud Pub/Sub message
    let data;
    try {
        const message = Buffer.from(req.body.message.data, 'base64').toString('utf8');
        data = JSON.parse(message);
        if (!data.name) {
            throw new Error ('Invalid message payload recieved')
        }
    }
    catch (error) {
        console.error(error);
        return res.status(400).send('Bad Request: missing filename');
    }
    
    const inputFileName = data.name;
    const outputFileName = `processed-${inputFileName}`;

    // Download the raw video from Cloud Storage
    await downloadRawVideo(inputFileName)

    // Convert the video to 360p 
    try {
        await convertVideo(inputFileName, outputFileName)
    }
    catch (err) {
        // Just in case it processed a corrupt video
        await deleteRawVideo(inputFileName) 
        await deleteProcessedVideo(outputFileName)
        console.log(err)
        return res.status(500).send('Internal Service Error: Video Processing Failed')
    }

    // Upload the processed video to Cloud Storage
    await uploadProcessedVideo(outputFileName)
    await deleteRawVideo(inputFileName) 
    await deleteProcessedVideo(outputFileName)

    return res.status(200).send('Processing finished successfully')
})

const port = process.env.PORT || 3000 //standard way to provide port at runtime
app.listen(port, () =>{
    console.log(`VideoApp Listening at https://localhost:${port}`)
})