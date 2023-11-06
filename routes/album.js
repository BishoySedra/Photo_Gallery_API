import { Router } from "express";

//middlewares
import * as albumControllers from "../controllers/album.js";
import validate from "../middlewares/validation.js";

// schemas
import { albumSchema } from "../schemas/info.js";

const router = Router();
router.post("/add", validate(albumSchema), albumControllers.add_album);
router.get("/list", albumControllers.get_all_albums);
router.get("/:id", albumControllers.get_album_by_id);
router.post("/:id/update", validate(albumSchema), albumControllers.update_album);
router.delete("/:id/delete", albumControllers.delete_album);


export default router;
