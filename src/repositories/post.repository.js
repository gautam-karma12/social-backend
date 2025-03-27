import { Op } from "sequelize";
import model from "../models";
const { post, like, user, comment, follow } = model;
export default {
  async createpost(req, res) {
    const { body } = req;
    const userId = req.user.id;
    try {
      return await post.create({ ...body, userId });
    } catch (error) {
      console.log(error);
    }
  },
  async getOwnpost(req, res) {
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
  async getAllpost(req, res) {
    try {
      const userId = req.user.id; // Get the current authenticated user's ID

      const otherPosts = await post.findAll({
        // where: { userId: { [Op.ne]: userId } }, // Exclude current user's posts
        include: [
          {
            model: user,
            as: "user",
            attributes: ["id", "username", "email"], // Include user details
          },
          {
            model: like,
            as: "likes",
            attributes: ["id", "userId"],
          },
          {
            model: comment,
            as: "comments",
            attributes: ["id", "content", "userId"],
            include: [{ model: user, as: "user", attributes: ["username"] }],
          },
        ],
        order: [["createdAt", "DESC"]], // Sort by latest posts
      });
      return otherPosts;
    } catch (error) {
      console.log(error);
    }
  },
  async updateOwnPost(req, res) {
    try {
      const { postId } = req.params;
      const { title, content, imageUrl } = req.body;
      const userId = req.user.id;
      console.log("test", postId, title, content, imageUrl, userId);
      const postData = await post.findByPk(postId);
      if (!postData) {
        return res.status(404).json({ message: "Post not found" });
      }
      if (postData.userId !== userId) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      await post.update(
        { content, title, image: imageUrl || "" },
        { where: { id: postId, userId } }
      );
      return postData;
    } catch (error) {
      console.log(error);
    }
  },
  async deleteOwnPost(req, res) {
    try {
      const { postId } = req.params;
      const userId = req.user.id;

      const postData = await post.findByPk(postId);

      if (!postData) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (postData.userId !== userId) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      // 🔥 Use Sequelize's `destroy()` method
      await post.destroy({
        where: { id: postId, userId },
      });
      return postData;
    } catch (error) {
      console.log(error);
    }
  },
  async likepost(req, res) {
    try {
      const { postId } = req.params;
      const userId = req.user.id;

      // Check if already liked
      const existingLike = await like.findOne({ where: { postId, userId } });

      if (existingLike) {
        return {
          message: "You have already liked this post",
          status: 400,
          success: false,
        };
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
      const commentData = await comment.create({ content, postId, userId });
      if (!commentData) {
        return res.status(404).json({ message: "Post not found" });
      }
      return commentData;
    } catch (error) {
      console.log(error);
    }
  },
  async followUser(req, res, next) {
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
        return {
          message: "You are already following this user",
          status: 400,
          success: false,
        };
      }

      await follow.create({ followerId, followingId });
      return {
        status: 201,
        success: true,
        message: "User followed successfully",
      };
    } catch (error) {
      console.log(error);
    }
  },
  async unFollowUser(req, res, next) {
    try {
      const followerId = req.user.id; // The logged-in user
      const followingId = req.params.userId; // The user being unfollowed
      const existingFollow = await follow.findOne({
        where: { followerId, followingId },
      });
      if (!existingFollow) {
        return {
          status: 404,
          success: false,
          message: "You are not following this user",
        };
      }
      await existingFollow.destroy();

      return {
        status: 200,
        success: true,
        message: "User unfollowed successfully",
      };
    } catch (error) {
      console.log(error);
    }
  },
  async getFollowUser(req, res) {
    try {
      const userId = req.user.id;
      const followers = await follow.findAll({
        where: { followingId: userId },
        include: [
          {
            model: user,
            as: "Follower",
            attributes: ["id", "username", "email"],
          },
        ],
      });
      const followersList = followers?.map((follow) => follow.Follower);
      return followersList;
    } catch (error) {
      console.log(error);
    }
  },
  async getFollowingUser(req, res, next) {
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
