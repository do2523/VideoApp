// Keeps track of Google Cloud Storage File Interactions and Local File Interactions
import { Storage } from '@google-cloud/storage';
import fs from 'fs'; // linux file system package
import ffmpeg from 'fluent-ffmpeg';

// Instance of cloud storage to interact with that API
const storage = new Storage();

// Bucket Name can not include capital letters :(
const rawVideoBucketName = "swe314-raw-videos";
const processedVideoBucketName = "swe314-processed-videos";

const localRawVideoPath = "./raw-videos";
const localProcessedVideoPath = "./processed-videos";

// Creates the local directories for raw and processed videos
export function setupDirectories() {
    ensureDirectoryExistence(localRawVideoPath);
    ensureDirectoryExistence(localProcessedVideoPath)
}

/**
 * Checks if directory exists and makes one if it dosen't exist
 * @param {string} dirPath - the directory path to check
 */

function ensureDirectoryExistence(dirPath: string) {
    if (!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath, { recursive: true }); // recursive allows creating nested directories
        console.log(`Directory created at ${dirPath}`);
    }
}

/** 
 * @param rawVideoName - The name of the file to convert from {@link localRawVideoPath}
 * @param processedVideoName - The name of the file to convert from {@link localProcessedVideoPath}
 * @returns - A promise that resolves when the video has been converted
*/

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
                reject(err)
            })
            .save(`${localProcessedVideoPath}/${processedVideoName}`);
    })

}

export async function downloadRawVideo(fileName: string){
    // await. Since this is an async function and we want to console.log last
    await storage.bucket(rawVideoBucketName)
        .file(fileName)
        .download({ destination: `${localRawVideoPath}/${fileName}`})

    console.log(`gs://${rawVideoBucketName}/${fileName} downloaded to ${localRawVideoPath}/${fileName}`)
}

export async function downloadProcessedVideo(fileName: string){
    await storage.bucket(processedVideoBucketName)
        .file(fileName)
        .download({destination: `${localProcessedVideoPath}/${fileName}`})

    console.log(`gs://${processedVideoBucketName}/${fileName} downloaded to ${localProcessedVideoPath}/${fileName}`)
}


/**
 * @param fileName - The name of the file to upload from the >
 * {@link localProcessedVideoPath} folder into the {@link processedVideoBucketName}
 * @returns A promise that resolves when the file has been uploaded
*/

export async function uploadProcessedVideo(fileName: string){
    const bucket = storage.bucket(processedVideoBucketName);
    await bucket.upload(`${localProcessedVideoPath}/${fileName}`, {
        destination: fileName
    })

    console.log(
        `${localProcessedVideoPath}/${fileName} uploaded to gs://${processedVideoBucketName}/${fileName}`
    );

    await bucket.file(fileName).makePublic();
}

/**
 * @param fileName the name of the file to be deleted from >
 * {@link localRawVideoPath} folder
 * @returns A promise that resolves when the folder has been deleted 
 */

export function deleteRawVideo(fileName: string){
    return deleteFile(`${localRawVideoPath}/${fileName}`)
}

/**
 * @param fileName the name of the file to be deleted from >
 * {@link localProcessedVideoPath} folder
 * @returns A promise that resolves when the folder has been deleted 
 */

export function deleteProcessedVideo(fileName: string){
    return deleteFile(`${localProcessedVideoPath}/${fileName}`)
}

/**
 * @param filePath - The path of the files to delete
 * @returns A promise that resolves when the file has been deleted
 */

export function deleteFile(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        // Check if the file exists
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(`Failed to delete files at ${filePath}`, err);
                    reject(err);
                } else{
                    console.log(`File deleted at ${filePath}`);
                    resolve()
                }
            })
        }
        else {
            console.log(`File not found at, ${filePath}`); //check
            resolve();
        }
    })
}
