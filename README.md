# VideoApp (In Progress)

## Overview

This project leverages several technologies to build a web application with video processing capabilities. This is designed to handle video uploads, processing, and serving, utilizing various Google Cloud and Firebase services along with modern frameworks and tools.


1. **Video Storage**:
   - **Google Cloud Storage** will store both raw and processed videos buckets.

2. **Video Processing**:
   - **Google Cloud Pub/Sub** will send messages to the video processing service.
   - **Google Cloud Run** will host a non-public video processing service that handles video transcoding through FFMPEG. Processed videos are then uploaded back to **Google Cloud Storage**.

3. **Metadata Management**:
   - **Firebase Firestore** will store metadata related to the videos, such as video details and user information.

4. **Web Client**:
   - **Cloud Run** will also host a **Next.js** application that serves as the Video Web App client.

5. **API Integration**:
   - The **Next.js** app will make API calls to **Firebase Functions**.
   - **Firebase Functions** will fetch video metadata from **Cloud Firestore** and return it to the web client.

