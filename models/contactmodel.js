const { DataTypes } = require("sequelize");

const sequelize = require("../config/config");

const Contact = sequelize.define(
    "Contact",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                isEmail: true
            }
        },

        mobile: {
            type: DataTypes.STRING(15),
            allowNull: true
        },


        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },

    },
    {
        tableName: "Contacts",
        timestamps: true
    }
);
Contact.sync();
module.exports = Contact;