import repository from "../repositories";

const { authRepository } = repository;
export default {
	async signup(req, res, next) {
		try {
			const { body } = req;
			const result = await authRepository.signup(body);
			res.status(200).json({
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
	async signin(req, res, next) {
		try {
			const { body } = req;
			const result = await authRepository.signin(body);
			res.status(200).json({
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
	async getLoggedInUserProfile(req, res, next) {
		try {
			const result = await authRepository.getLoggedInUserProfile(req);
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
};
