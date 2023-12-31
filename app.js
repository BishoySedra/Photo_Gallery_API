import Express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connection.js";
import Photo from "./models/photo.js";
import Album from "./models/album.js";
//import AlbumOfPhotos from "./models/album_of_photos.js";
import photoRoutes from "./routes/photo.js";
import albumRoutes from "./routes/album.js";
import * as directoryFunctions from "./helpers/directory.js";
import notFoundHandler from "./middlewares/not-found.js";
import errorHandler from "./middlewares/error-handler.js";

dotenv.config();

const app = Express();

// static
app.use(Express.static('./public'));

// parsing
app.use(Express.json());


// photo routes
const baseURL = '/api';
app.use(`${baseURL}/photo`, photoRoutes);
app.use(`${baseURL}/album`, albumRoutes);

// connecting with DataBase
connectDB();

// error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// create uploads folder
directoryFunctions.create_uploads_directory();

try {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
} catch (error) {
    console.error(error);
}

