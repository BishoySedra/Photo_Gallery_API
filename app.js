import Express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connection.js";

dotenv.config();

const app = Express();

try {
    connectDB();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
} catch (error) {
    console.error(error);
}

