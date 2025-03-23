import { Op } from "sequelize";
import model from "../models";
const { post, like, user, comment, follow } = model;
export default {
	async createpost(req) {
		const { body } = req;
		const userId = req.user.id;
		try {
			return await post.create({ ...body, userId });
		} catch (error) {
			console.log(error);
		}
	},
	async getOwnpost(req) {
		try {
			const userId = req.user.id;
			console.log("userId", userId);
			const ownPosts = await post.findAll({
				where: { userId },
				include: [
					{
						model: user,
						as: "user", // Use alias here
						attributes: ["id", "username", "email"],
					},
					{
						model: like,
						as: "likes", // Use alias here
						attributes: ["id", "userId"],
					},
					{
						model: comment,
						as: "comments", // Use alias here
						attributes: ["id", "content", "userId"],
						include: [
							{
								model: user,
								as: "user", // Use alias here
								attributes: ["username"],
							},
						],
					},
				],
				order: [["createdAt", "DESC"]],
			});

			console.log("ownPosts", ownPosts);
			return ownPosts;
		} catch (error) {
			console.log(error);
		}
	},
	async getAllpost(req) {
		try {
			const userId = req.user.id; // Get the current authenticated user's ID

			const otherPosts = await post.findAll({
				where: { userId: { [Op.ne]: userId } }, // Exclude current user's posts
				include: [
					{
						model: user,
						as: 'user',
						attributes: ["id", "username", "email"], // Include user details
					},
					{
						model: like,
						as : 'likes',
						attributes: ["id", "userId"],
					},
					{
						model: comment,
						as : 'comments',
						attributes: ["id", "content", "userId"],
						include: [{ model: user , as : 'user', attributes: ["username"] }],
					},
				],
				order: [["createdAt", "DESC"]], // Sort by latest posts
			});
			return otherPosts;
		} catch (error) {
			console.log(error);
		}
	},
	async updateOwnPost(id) {
		try {
			const { id } = req.params;
			const { content, imageUrl } = req.body;
			const userId = req.user.id;
			const postData = await post.findByPk(id);
			if (!postData) {
				return res.status(404).json({ message: "Post not found" });
			}
			if (postData.userId !== userId) {
				return res.status(403).json({ message: "Unauthorized" });
			}
			await post.update(
				{ content, image: imageUrl },
				{ where: { id, userId } },
			);
			return postData;
		} catch (error) {
			console.log(error);
		}
	},
	async deleteOwnPost(req) {
		try {
			const { id } = req.params;
			const userId = req.user.id;

			const postData = await post.findByPk(id);

			if (!postData) {
				return res.status(404).json({ message: "Post not found" });
			}

			if (postData.userId !== userId) {
				return res.status(403).json({ message: "Unauthorized" });
			}

			// 🔥 Use Sequelize's `destroy()` method
			await post.destroy({
				where: { id, userId },
			});
			return postData;
		} catch (error) {
			console.log(error);
		}
	},
	async likepost(req) {
		try {
			const { postId } = req.params;
			const userId = req.user.id;

			// Check if already liked
			const existingLike = await like.findOne({ where: { postId, userId } });

			if (existingLike) {
				return res.status(400).json({ message: "You already liked this post" });
			}

			await like.create({ postId, userId });
			return { message: "Post liked successfully" };
		} catch (error) {
			console.log(error);
		}
	},
	async unlikepost(req) {
		try {
			const { postId } = req.params;
			const userId = req.user.id;

			const like = await like.findOne({ where: { postId, userId } });

			if (!like) {
				return res
					.status(404)
					.json({ message: "You have not liked this post" });
			}

			await like.destroy();
			return { message: "Post liked successfully" };
		} catch (error) {
			console.log(error);
		}
	},
	async addComment(req) {
		try {
			const { postId } = req.params;
			const { content } = req.body;
			const userId = req.user.id;
			const comment = await Comment.create({ content, postId, userId });
			return comment;
		} catch (error) {
			console.log(error);
		}
	},
	async followUser(req) {
		try {
			const followerId = req.user.id; // The logged-in user
			const followingId = req.params.userId; // The user being followed

			if (followerId === parseInt(followingId)) {
				return res.status(400).json({ message: "You can't follow yourself!" });
			}

			const existingFollow = await follow.findOne({
				where: { followerId, followingId },
			});

			if (existingFollow) {
				return res
					.status(400)
					.json({ message: "You are already following this user" });
			}

			await follow.create({ followerId, followingId });
			return true;
		} catch (error) {
			console.log(error);
		}
	},
	async unFollowUser(req) {
		try {
			const followerId = req.user.id; // The logged-in user
			const followingId = req.params.userId; // The user being unfollowed

			const existingFollow = await follow.findOne({
				where: { followerId, followingId },
			});

			if (!existingFollow) {
				return res
					.status(404)
					.json({ message: "You are not following this user" });
			}
			await existingFollow.destroy();

			return true;
		} catch (error) {
			console.log(error);
		}
	},
	async getFollowUser(req) {
		try {
			const userId = req.user.id;
			const followers = await Follow.findAll({
				where: { followingId: userId },
				include: [
					{
						model: User,
						as: "Follower",
						attributes: ["id", "username", "email"],
					},
				],
			});
			const followersList = followers.map((follow) => follow.Follower);
			return followersList;
		} catch (error) {
			console.log(error);
		}
	},
	async getFollowingUser(req) {
		try {
			const userId = req.user.id;

			const following = await follow.findAll({
				where: { followerId: userId },
				include: [
					{
						model: user,
						as: "Following",
						attributes: ["id", "username", "email"],
					},
				],
			});

			const followingList = following.map((follow) => follow.Following);
			return followingList;
		} catch (error) {
			console.log(error);
		}
	},
};
