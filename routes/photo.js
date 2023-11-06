import { Router } from "express";

// middlewares
import * as photoControllers from "../controllers/photo.js";
import upload from "../middlewares/multer.js";
import validate from "../middlewares/validation.js";

// schemas
import { photoSchema } from "../schemas/info.js";

const router = Router();

router.post('/add', upload.single("photo"), validate(photoSchema), photoControllers.add_photo);
router.get('/list', photoControllers.get_all_photos);
router.get('/:id', photoControllers.get_photo_by_id);
router.post("/:id/update", upload.single('photo'), validate(photoSchema), photoControllers.update_photo);
router.delete("/:id/delete", photoControllers.delete_photo);

export default router;
