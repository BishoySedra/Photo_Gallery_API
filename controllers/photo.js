import Photo from "../models/photo.js";

export async function add_photo(req, res) {
    try {
        const { name, description } = req.body;
        const { path } = req.file;

        if (!path) {
            return res.json({ message: "please upload a photo!" });
        }

        const new_photo = await Photo.create({ name, description, photo: path });
        //console.log(req.file);
        return res.json({ new_photo });
    } catch (error) {
        return res.json({ message: error });
    }
}

export async function get_photo_by_id(req, res) {
    try {

        const { id } = req.params;

        const found_photo = await Photo.findByPk(id);

        if (!found_photo) {
            return res.json({ message: "No Photo Found with this ID!" });
        }

        return res.json(found_photo);

    } catch (error) {

        return res.json({ message: error });

    }
}

export async function get_all_photos(req, res) {
    try {

        const found_photos = await Photo.findAll();

        if (!found_photos) {
            return res.json({ message: "No Photos Found!" });
        }

        return res.json(found_photos);

    } catch (error) {

        return res.json({ message: error });

    }
}

export async function update_photo(req, res) {
    try {

        const { id } = req.params;

        const found_photo = await Photo.findByPk(id);

        // check if this photo existed or not
        if (!found_photo) {
            return res.json({ message: "No Photo found with this ID to be updated!!" });
        }

        const { name, description } = req.body;
        const { path } = req.file;

        const updated_photo = await Photo.update({ name, description, photo: path }, { where: { id } });

        return res.json({ msg: "Photo updated successfully" });

    } catch (error) {

        return res.json({ message: error });

    }
}

export async function delete_photo(req, res) {
    try {

        const { id } = req.params;

        const found_photo = await Photo.findByPk(id);

        // check if this photo existed or not
        if (!found_photo) {
            return res.json({ message: "No Photo found with this ID to be deleted!!" });
        }

        const deleted_photo = await Photo.destroy({ where: { id } });

        return res.json({ msg: "Photo deleted successfully" });

    } catch (error) {

        return res.json({ message: error });

    }
}

