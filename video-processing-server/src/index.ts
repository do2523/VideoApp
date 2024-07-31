import express from "express";
import ffmpeg from "fluent-ffmpeg";   // <symbolic link> Issue installing the actual ffmpeg  ***
import { setupDirectories } from './storage'

setupDirectories();

const app = express();
app.use(express.json()); // So express can handle JS req

app.post("/process-video", (req, res) =>{
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
})

const port = process.env.PORT || 3000 //standard way to provide port at runtime
app.listen(port, () =>{
    console.log(`VideoApp Listening at https://localhost:${port}`)
})