import { createCustomError } from "../errors/custom-error.js";
import Album from "../models/album.js";
import AlbumOfPhotos from "../models/album_of_photos.js";
import Photo from "../models/photo.js";


export async function add_photo(req, res, next) {
    try {
        const { name, description } = req.body;
        const { path } = req.file;

        if (!path) {
            next(createCustomError("please upload a photo!", 400));
        }

        const new_photo = await Photo.create({ name, description, photo: path });
        //console.log(req.file);
        return res.status(200).json(new_photo);
    } catch (error) {
        next(error);
    }
}

export async function get_photo_by_id(req, res, next) {
    try {

        const { id } = req.params;

        const found_photo = await Photo.findByPk(id);

        if (!found_photo) {
            next(createCustomError("No Photo Found with this ID!", 404));
        }

        return res.status(200).json(found_photo);

    } catch (error) {

        next(error);

    }
}

export async function get_all_photos(req, res, next) {
    try {

        const found_photos = await Photo.findAll();

        if (!found_photos) {
            next(createCustomError("No Photos Found!", 404));
        }

        return res.status(200).json(found_photos);

    } catch (error) {

        next(error);

    }
}

export async function update_photo(req, res, next) {
    try {

        const { id } = req.params;

        const found_photo = await Photo.findByPk(id);

        // check if this photo existed or not
        if (!found_photo) {
            next(createCustomError("No Photo found with this ID to be updated!!", 404));
        }

        const { name, description } = req.body;
        const { path } = req.file;

        const updated_photo = await Photo.update({ name, description, photo: path }, { where: { id } });

        return res.status(200).json({ msg: "Photo updated successfully" });

    } catch (error) {

        next(error);

    }
}

export async function delete_photo(req, res, next) {
    try {

        const { id } = req.params;

        const found_photo = await Photo.findByPk(id);

        // check if this photo existed or not
        if (!found_photo) {
            next(createCustomError("No Photo found with this ID to be deleted!!", 404));
        }

        const { in_albums } = await Photo.findOne({ where: { id } });

        for (let i = 0; i < in_albums.length; i++) {
            // get album id
            const album_id = in_albums[i];

            // get the album to be updated
            const target_album = await Album.findByPk(album_id);

            // get the has_photos array from target_album
            const { has_photos } = target_album;

            // filter has_photos without the deleted one by the current photo_id
            const result_array = has_photos.filter((photo) => photo.id != id);

            //console.log(result_array);

            // update the current album with the new photos array
            await Album.update({ has_photos: result_array }, { where: { id: album_id } });
        }

        // delete the current photo
        const deleted_photo = await Photo.destroy({ where: { id } });

        if (deleted_photo) {
            await AlbumOfPhotos.destroy({ where: { photoId: id } });
        }
        return res.status(200).json({ msg: "Photo deleted successfully" });

    } catch (error) {

        next(error);

    }
}
