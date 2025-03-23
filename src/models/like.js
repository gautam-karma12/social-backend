import User from "./user";
import Post from "./post";
module.exports = (sequelize, DataTypes) => {
	const Like = sequelize.define("like", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		postId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});
	Like.associate = (models) => {
		Like.belongsTo(models.user, {
			foreignKey: "userId",
			onDelete: "CASCADE",
		});
		Like.belongsTo(models.post, {
			foreignKey: "postId",
			onDelete: "CASCADE",
		});
	};
	return Like;
};
