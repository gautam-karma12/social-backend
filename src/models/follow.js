import User from "./user";
module.exports = (sequelize, DataTypes) => {
	const Follow = sequelize.define("follow", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		followerId: {
			// The one following
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		followingId: {
			// The one being followed
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});
	Follow.associate = (models) => {
		Follow.belongsTo(models.user, {
			foreignKey: "followerId",
			as: "Follower",
			onDelete: "CASCADE",
		});
		Follow.belongsTo(models.user, {
			foreignKey: "followingId",
			as: "Following",
			onDelete: "CASCADE",
		});
	};
	return Follow;
};
