import { Router } from "express";
import * as albumControllers from "../controllers/album.js";

const router = Router();
router.post("/add", albumControllers.add_album);
router.get("/list", albumControllers.get_all_albums);
router.get("/:id", albumControllers.get_album_by_id);
//router.post("/:id/update", albumControllers.update_album);


export default router;
