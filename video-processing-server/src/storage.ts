// Keeps track of Google Cloud Storage File Interactions and Local File Interactions
import { Storage } from '@google-cloud/storage';
import fs from 'fs'; // linux file system package
import ffmpeg from 'fluent-ffmpeg';

// Instance of cloud storage to interact with that API
const storage = new Storage();

const rawVideoBucketName = "SWE314-raw-videos";
const processedVideoBucketName = "SWE314-processed-videos";

const localRawVideoPath = "./raw-videos";
const localProcessedVideoPath = "./processed-videos";

// Creates the local directories for raw and processed videos
export function setupDirectories() {
}

/** 
 * @param rawVideoName - The name of the file to convert from {@link localRawVideoPath}
 * @param processedVideoName - The name of the file to convert to {@link localProcessedVideoPath}
 * @returns - A promise that resolves when the video has been converted
*/

export async function downloadRawVideo(fileName: string){
    // await. Since this is an async function and we want to console.log last
    await storage.bucket(rawVideoBucketName)
        .file(fileName)
        .download({ destination: `${localRawVideoPath}/${fileName}`})

    console.log(`gs//${rawVideoBucketName}/${fileName} downloaded to ${localRawVideoPath}/${fileName}`)
}

export async function downloadProcessedVideo(fileName: string){

}

export function convertVideo(rawVideoName: string, processedVideoName: string) {
    // <void> so it dosen't have to resolve with a value
    return new Promise<void> ((resolve, reject) => {
        ffmpeg(`${localRawVideoPath}/${rawVideoName}`) 
            .outputOptions("-vf", "scale = -1:360") //Resolution to 360p
            .on("end", () => {
                console.log("Processing is Complete")
                resolve();
            })
            // conditional because ffmpeg runs Asynchronously 
            .on("error", (err) =>{
                console.log(`An error has occurred: ${err.message}`);
                reject()
            })
            .save(`${localProcessedVideoPath}/${processedVideoName}`);
    })

}