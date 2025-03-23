module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("user", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		profilePic: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	});
	// Associations using sequelize.models
	User.associate = (models) => {
		User.hasMany(models.post, {
			foreignKey: "userId",
			as: "posts", // Added alias
			onDelete: "CASCADE",
		});

		User.hasMany(models.like, {
			foreignKey: "userId",
			as: "likes", // Added alias
			onDelete: "CASCADE",
		});

		User.hasMany(models.comment, {
			foreignKey: "userId",
			as: "comments", // Added alias
			onDelete: "CASCADE",
		});

		// Following relationships
		User.hasMany(models.follow, {
			foreignKey: "followerId",
			as: "Following",
			onDelete: "CASCADE",
		});

		User.hasMany(models.follow, {
			foreignKey: "followingId",
			as: "Followers",
			onDelete: "CASCADE",
		});
	};

	return User;
};
