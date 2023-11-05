import { DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js";

const Album = sequelize.define('album', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    has_photos: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
    }
});

export default Album;