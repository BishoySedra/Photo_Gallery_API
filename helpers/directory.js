import fs from "fs";

export function create_uploads_directory() {
    const directoryPath = 'public/uploads';

    // Check if the directory exists
    if (!fs.existsSync(directoryPath)) {
        // If it doesn't exist, create it
        fs.mkdirSync(directoryPath);
        console.log('Directory created successfully.');
    }
};
