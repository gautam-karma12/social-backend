// import User from "./user";
// import Post from "./post";
module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define("comment", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		content: {
			type: DataTypes.STRING,
			allowNull: false,
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
	// Associations using sequelize.models
	Comment.associate = (models) => {
		Comment.belongsTo(models.user, { foreignKey: "userId", as: "user" });
		Comment.belongsTo(models.post, { foreignKey: "postId", as: "post" });
	};
	// Comment.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
	// Comment.belongsTo(Post, { foreignKey: "postId", onDelete: "CASCADE" });
	return Comment;
};
