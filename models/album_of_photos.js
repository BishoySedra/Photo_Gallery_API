import { sequelize } from "../config/connection.js";
import Album from "./album.js";
import Photo from "./photo.js";

const AlbumOfPhotos = sequelize.define('albums_of_photos', {

});

Photo.belongsToMany(Album, { through: 'albums_of_photos' });
Album.belongsToMany(Photo, { through: 'albums_of_photos' });

export default AlbumOfPhotos;