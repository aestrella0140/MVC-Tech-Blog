const { Model, Datatypes } = require('sequelize');
const config = require('./../config/connection');

class Post extends Model {}

Post.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        title: {
            type: Datatypes.STRING,
            allowNull: false,
            autoIncrement: true,
        },
        comment: {
            type: Datatypes.STRING,
            allowNull: false,
            autoIncrement: true,
        },
        date_created: {
            type: Datatypes.DATE,
            allowNull: false,
            defaultValue: Datatypes.NOW,
        },
        user_id: {
            type: Datatypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        tableName: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Post',
    }
);

module.exports = Post;