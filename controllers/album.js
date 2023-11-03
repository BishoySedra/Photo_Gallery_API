import Album from "../models/album.js";
import Photo from "../models/photo.js";

// export async function add_album(req, res) {
//     try {
//         const { name, description, photos } = req.body;

//         const new_album = await Album.create({ name, description });

//         const album_id = new_album.id;

//         const target_array = [];

//         await Promise.all(photos.map(async (photo_id) => {
//             const target_photo = await Photo.findOne({ where: { id: photo_id }, attributes: { exclude: ["in_albums"] } });

//             if (target_photo) {
//                 target_array.push(target_photo);

//                 await target_photo.update({
//                     in_albums: [...(target_photo.in_albums || []), album_id]
//                 });
//             }
//         }));

//         await new_album.update({ photos: target_array });

//         return res.json(new_album);

//     } catch (error) {
//         return res.json({ message: error.message });
//     }
// }


export async function add_album(req, res) {
    try {

        const { name, description, photos } = req.body;

        //console.log(name, description, photos);


        // creating the album with name and description
        let new_album = await Album.create({ name, description });

        if (!photos) {
            return res.json(new_album);
        }

        // get the photos indices array for looping
        const photos_indices = photos;

        // get the photos array to be updated and album id after creation
        const target_array = [];
        const album_id = new_album.id;

        for (let i = 0; i < photos_indices.length; i++) {
            console.log(i);
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
        await Album.update({ photos: target_array }, { where: { id: album_id } });

        return res.json(new_album);

    } catch (error) {
        return res.json({ message: error });
    }
}

export async function get_album_by_id(req, res) {
    try {
        const { id } = req.params;
        const found_album = await Album.findByPk(id);

        // check if the album existed or not
        if (!found_album) {
            return res.json({ message: "No album found with this ID!" });
        }

        return res.json(found_album);

    } catch (error) {

        return res.json({ message: error });

    }
}

export async function get_all_albums(req, res) {
    try {
        const found_albums = await Album.findAll();

        // check if the album existed or not
        if (!found_albums) {
            return res.json({ message: "No albums found!" });
        }

        return res.json(found_albums);

    } catch (error) {

        return res.json({ message: error });

    }
}

// export async function update_album(req, res) {
//     try {

//         const { name, description, photos } = req.body;
//         const { id } = req.params;
//         //console.log(name, description, photos);

//         const found_album = await Album.findByPk(id);

//         // check if the album existed to be updated
//         if (!found_album) {
//             return res.json({ message: "No album found with this ID to be updated!" });
//         }

//         // updating the album with name and description
//         let updated_album = await Album.update({ name, description }, { where: { id } });

//         // get the photos indices array for looping
//         const photos_indices = photos;

//         // get the photos array to be updated and album id after creation
//         const target_array = [];
//         const album_id = updated_album.id;

//         for (let i = 0; i < photos_indices.length; i++) {
//             //console.log(i);
//             // get the photo id
//             const id = photos_indices[i];

//             // get the photo from db without in_albums attribute to be added
//             let target_photo = await Photo.findOne({ where: { id }, attributes: { exclude: ["in_albums"] } });

//             // edit the array of images with pushing a new one
//             target_array.push(target_photo);

//             // get the photo from db with in_albums attribute to be updated
//             target_photo = await Photo.findByPk(id);

//             // get the in_albums attribute of the photo
//             const in_albums_array = target_photo.in_albums;

//             // edit the in_albums_array with the new album index
//             in_albums_array.push(album_id);

//             // update the in_albums attribute of the photo
//             const updated_in_albums_attribute = await Photo.update({ in_albums: in_albums_array }, { where: { id } });
//         }

//         // update the new_album with the targeted photos
//         await Album.update({ photos: target_array }, { where: { id: album_id } });

//         return res.json({ msg: "Album updated successfully", updated_album });

//     } catch (error) {
//         return res.json({ message: error });
//     }
// }