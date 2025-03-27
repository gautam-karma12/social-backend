import repository from "../repositories";

const { postRepository } = repository;
export default {
	async createpost(req, res, next) {
		try {
			const result = await postRepository.createpost(req);
			res.status(201).json({
				data: result,
				message: "Success",
				success: true,
			});
		} catch (err) {
			res.status(500).json({
				data: err,
				message: "Error",
				success: false,
			});
		}
	},
	async getOwnpost(req, res, next) {
		try {
			const result = await postRepository.getOwnpost(req);
			res.status(200).json({
				data: result,
				message: "Success",
				success: true,
			});
		} catch (err) {
			res.status(500).json({
				data: err,
				message: "Error",
				success: false,
			});
		}
	},
	async getAllpost(req, res, next) {
		try {
			const result = await postRepository.getAllpost(req);
			res.status(200).json({
				data: result,
				message: "Success",
				success: true,
			});
		} catch (err) {
			res.status(500).json({
				data: err,
				message: "Error",
				success: false,
			});
		}
	},
	async updateOwnPost(req, res, next) {
		try {
			const result = await postRepository.updateOwnPost(req);
			res.status(200).json({
				data: result,
				message: "Post updated successfully",
				success: true,
			});
		} catch (err) {
			res.status(500).json({
				data: err,
				message: "Error",
				success: false,
			});
		}
	},
	async deleteOwnPost(req, res, next) {
		try {
			const result = await postRepository.deleteOwnPost(req);
			res.status(200).json({
				data: result,
				message: "Post deleted successfully",
				success: true,
			});
		} catch (err) {
			res.status(500).json({
				data: err,
				message: "Error",
				success: false,
			});
		}
	},
	async likepost(req, res, next) {
		try {
			const result = await postRepository.likepost(req);
			res.status(200).json({
				data: result,
				message: "Post Like successfully",
				success: true,
			});
		} catch (err) {
			res.status(500).json({
				data: err,
				message: "Error",
				success: false,
			});
		}
	},
	async unlikepost(req, res, next) {
		try {
			const result = await postRepository.unlikepost(req);
			res.status(200).json({
				data: result,
				message: "Post Un-Like successfully",
				success: true,
			});
		} catch (err) {
			res.status(500).json({
				data: err,
				message: "Error",
				success: false,
			});
		}
	},
	async addComment(req, res, next) {
		try {
			const result = await postRepository.addComment(req);
			res.status(200).json({
				data: result,
				message: "Comment Add successfully",
				success: true,
			});
		} catch (err) {
			res.status(500).json({
				data: err,
				message: "Error",
				success: false,
			});
		}
	},
	async followUser(req, res, next) {
		try {
			const result = await postRepository.followUser(req);
			res.status(200).json({
				data: result,
				message: result.message,
				success: result.status,
			});
		} catch (err) {
			res.status(500).json({
				data: err,
				message: "Error",
				success: false,
			});
		}
	},
	async unFollowUser(req, res, next) {
		try {
			const result = await postRepository.unFollowUser(req);
			res.status(201).json({
				data: result,
				message: result.message,
				success: result.success,
			});
		} catch (err) {
			res.status(500).json({
				data: err,
				message: "Error",
				success: false,
			});
		}
	},
	async getFollowUser(req, res, next) {
		try {
			const result = await postRepository.getFollowUser(req);
			res.status(200).json({
				data: result,
				message: "successfully",
				success: true,
			});
		} catch (err) {
			res.status(500).json({
				data: err,
				message: "Error",
				success: false,
			});
		}
	},
	async getFollowingUser(req, res, next) {
		try {
			const result = await postRepository.getFollowingUser(req);
			res.status(200).json({
				data: result,
				message: "successfully",
				success: true,
			});
		} catch (err) {
			res.status(500).json({
				data: err,
				message: "Error",
				success: false,
			});
		}
	},
};
