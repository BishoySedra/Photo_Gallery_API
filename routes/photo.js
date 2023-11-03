import { Router } from "express";
import upload from "../middlewares/multer.js";
import * as photoControllers from "../controllers/photo.js";

const router = Router();

router.post('/add', upload.single("photo"), photoControllers.add_photo);
router.get('/list', photoControllers.get_all_photos);
router.get('/:id', photoControllers.get_photo_by_id);
router.post("/:id/update", upload.single('photo'), photoControllers.update_photo);
router.delete("/:id/delete", photoControllers.delete_photo);

export default router;
