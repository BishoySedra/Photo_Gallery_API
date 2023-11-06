import { createCustomError } from "../errors/custom-error.js";
import Album from "../models/album.js";
import AlbumOfPhotos from "../models/album_of_photos.js";
import Photo from "../models/photo.js";

export async function add_album(req, res, next) {
    try {

        const { name, description, has_photos } = req.body;

        //console.log(name, description, photos);

        // check if this album name already existed or not
        let existingAlbum = await Album.findOne({ where: { name } });
        if (existingAlbum) {
            next(createCustomError("This Album already existed!!", 409));
        }

        // creating the album with name and description
        let new_album = await Album.create({ name, description });

        if (!has_photos) {
            return res.status(200).json(new_album);
        }

        // get the photos indices array for looping
        const photos_indices = has_photos;

        // get the photos array to be updated and album id after creation
        const target_array = [];
        const album_id = new_album.id;

        for (let i = 0; i < photos_indices.length; i++) {

            // create relation between the photo and its album
            await AlbumOfPhotos.create({ photoId: photos_indices[i], albumId: album_id });

            // get the photo id
            const id = photos_indices[i];

            // get the photo from db without in_albums attribute to be added
            let target_photo = await Photo.findOne({ where: { id }, attributes: { exclude: ["in_albums"] } });

            // edit the array of images with pushing a new one
            target_array.push(target_photo);

            // get the photo from db with in_albums attribute to be updated  
            target_photo = await Photo.findByPk(id);

            // get the in_albums attribute of the photo
            const in_albums_array = target_photo.in_albums;

            // edit the in_albums_array with the new album index
            in_albums_array.push(album_id);

            // update the in_albums attribute of the photo
            const updated_in_albums_attribute = await Photo.update({ in_albums: in_albums_array }, { where: { id } });
        }

        // update the new_album with the targeted photos
        await Album.update({ has_photos: target_array }, { where: { id: album_id } });
        new_album = await Album.findByPk(album_id);

        return res.status(200).json(new_album);

    } catch (error) {
        next(error);
    }
}

export async function get_album_by_id(req, res, next) {
    try {
        const { id } = req.params;
        const found_album = await Album.findByPk(id);

        // check if the album existed or not
        if (!found_album) {
            next(createCustomError("No album found with this ID!", 404));
        }

        return res.status(200).json(found_album);

    } catch (error) {

        next(error);

    }
}

export async function get_all_albums(req, res, next) {
    try {
        const found_albums = await Album.findAll();

        // check if the album existed or not
        if (!found_albums) {
            next(createCustomError("No albums found!", 404));
        }

        return res.status(200).json(found_albums);

    } catch (error) {

        next(error);

    }
}

export async function delete_album(req, res, next) {
    try {
        const { id } = req.params;

        const found_album = await Album.findByPk(id);

        // check if this album existed or not
        if (!found_album) {
            next(createCustomError("No Album found with this ID to be deleted!!", 404));
        }

        // get has_photos from the current album
        const all_records = await AlbumOfPhotos.findAll({
            where: {
                albumId: id
            }
        });

        const photoIds = all_records.map(({ dataValues: { photoId } }) => photoId);
        console.log(photoIds);

        for (let i = 0; i < photoIds.length; i++) {
            // get the current photo id
            const photo_id = photoIds[i];

            // get the current photo to be updated
            const current_photo = await Photo.findByPk(photo_id);

            // get the in_albums array from the current photo
            const { in_albums } = current_photo;
            console.log(in_albums);

            // update the in_albums
            const result_array = in_albums.filter((albumId) => albumId != id);
            console.log(result_array);

            // update the current photo
            await Photo.update({ in_albums: result_array }, { where: { id: photo_id } });
        }

        // delete the current album
        await Album.destroy({ where: { id } });
        await AlbumOfPhotos.destroy({ where: { albumId: id } });

        return res.status(200).json({ msg: "Album deleted successfully" });

    } catch (error) {
        next(error);
    }
}

export async function update_album(req, res, next) {
    try {
        const { id } = req.params;
        const { name, description, has_photos } = req.body;

        // check if the album existed or not
        const found_album = await Album.findByPk(id);
        if (!found_album) {
            next(createCustomError("No album found with this ID to be updated!", 404));
        }

        // get has_photos from the current album
        const all_records = await AlbumOfPhotos.findAll({
            where: {
                albumId: id
            }
        });

        const photoIds = all_records.map(record => record.photoId);

        // Updating the in_albums attribute for photos
        for (let i = 0; i < photoIds.length; i++) {
            const photo_id = photoIds[i];
            const current_photo = await Photo.findByPk(photo_id);
            const in_albums_array = current_photo.in_albums.filter(albumId => albumId != id);
            await Photo.update({ in_albums: in_albums_array }, { where: { id: photo_id } });
        }

        // Delete the old relations between the old photos and the current album
        await AlbumOfPhotos.destroy({ where: { albumId: id } });

        // Create new relations between photos and the current album
        for (let i = 0; i < has_photos.length; i++) {
            await AlbumOfPhotos.create({ photoId: has_photos[i], albumId: id });

            const target_photo = await Photo.findByPk(has_photos[i]);
            const in_albums_array = target_photo.in_albums;
            in_albums_array.push(parseInt(id));
            await Photo.update({ in_albums: in_albums_array }, { where: { id: has_photos[i] } });
        }

        // Update the album with the new photos
        const target_array = await Photo.findAll({ where: { id: has_photos }, attributes: { exclude: ["in_albums"] } });
        await Album.update({ name, description, has_photos: target_array }, { where: { id } });

        return res.status(200).json({ msg: "Album updated successfully" });

    } catch (error) {
        next(error);
    }
}
