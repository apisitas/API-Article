"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Article extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Article.init(
        {
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            cover: {
                type: DataTypes.STRING,
                get() {
                    const cover = this.getDataValue("cover");
                    return cover ? cover : "assets/no-image-icon-23494.png";
                },
            },
            publisherId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Article",
        }
    );
    return Article;
};
