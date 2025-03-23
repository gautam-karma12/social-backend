import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import model from "../models";
import { Op } from "sequelize";
const { user, follow } = model;
export default {
	async signup(body) {
		try {
			const { email, username, password } = body;

			// Check for duplicates in both email and username
			const existingUser = await user.findOne({
				where: {
					[Op.or]: [{ email }, { username }], // Check both fields
				},
			});

			if (existingUser) {
				const message =
					existingUser.email === email
						? "Email already exists"
						: "Username already exists";

				return {
					message,
					success: false,
				};
			}
			const hashPassword = await bcrypt.hash(password, 10);
			const data = await user.create({ ...body, password: hashPassword });
			return {
				message: "User created successfully",
				data,
				success: true,
			};
		} catch (error) {
			console.log(error);
		}
	},
	async signin(body) {
		try {
			const { email, password } = body;
			const userData = await user.findOne({ where: { email } });
			if (!userData) {
				return {
					message: "User not found, Please create a new account",
					success: false,
				};
			}
			const isValid = await bcrypt.compare(password, userData.password);
			if (!isValid) {
				return {
					message: "Invalid password",
					success: false,
				};
			}
			const token = jwt.sign(
				{
					userData,
				},
				process.env.JWT_SECRET || "test",
				{
					expiresIn: "1d",
				},
			);
			return {
				name: userData.name,
				email: userData.email,
				token,
				success: true,
			};
		} catch (error) {
			console.log(error);
		}
	},
	async getLoggedInUserProfile(req) {
		try {
			// Extract the logged-in user's ID from the JWT token
			const userId = req.user.id;

			// Fetch the user details
			const userData = await user.findByPk(userId, {
				attributes: ["id", "username", "email", "profilePic"],
			});
			if (!userData) {
				return {
					message: "User not found",
					success: false,
				};
			}

			// Fetch followers count
			const followersCount = await follow.count({
				where: { followingId: userId },
			});

			// Fetch following count
			const followingCount = await follow.count({
				where: { followerId: userId },
			});
			return {
				id: userData.id,
				username: userData.username,
				email: userData.email,
				profileImage: userData.profilePic,
				followersCount,
				followingCount,
			};
		} catch (error) {
			console.log(error);
		}
	},
};
