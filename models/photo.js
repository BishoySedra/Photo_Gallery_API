import { DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js";

const Photo = sequelize.define('photo', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    in_albums: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [] // Assuming it's an array of album IDs
    }
});

export default Photo;