import User from "./user";
import Like from "./like";
import Comment from "./comment";
module.exports = (sequelize, DataTypes) => {
	const Post = sequelize.define("post", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	});
	Post.associate = (models) => {
		Post.belongsTo(models.user, {
			foreignKey: "userId",
			onDelete: "CASCADE",
		});
		Post.hasMany(models.like, {
			foreignKey: "postId",
			onDelete: "CASCADE",
		});
		Post.hasMany(models.comment, {
			foreignKey: "postId",
			onDelete: "CASCADE",
		});
	};
	return Post;
};
