import { Router } from "express";
import controller from "../controllers";
const { authController, postController, imageController } = controller;
import verifyToken from "../middlerware/verifyToken";
import upload from "../middlerware/upload";
const router = Router();
router.post("/sign-up", authController.signup);
router.post("/sign-in", authController.signin);
router.get("/profile", verifyToken, authController.getLoggedInUserProfile);
router.post(
	"/upload-image",
	verifyToken,
	upload.single("image"),
	imageController.uploadImage,
);
router.post("/create-post", verifyToken, postController.createpost);
router.get("/get-own-post", verifyToken, postController.getOwnpost);
router.get("/get-all-post", verifyToken, postController.getAllpost);
router.put("/update-own-post", verifyToken, postController.updateOwnPost);
router.delete("/delete-own-post", verifyToken, postController.deleteOwnPost);
router.post("/:postId", verifyToken, postController.likepost);
router.delete("/:postId", verifyToken, postController.unlikepost);
router.post("/:postId", verifyToken, postController.addComment);
router.post("/:userId", verifyToken, postController.followUser);
router.delete("/:postId", verifyToken, postController.unFollowUser);
router.get("/follow", verifyToken, postController.getFollowUser);
router.get("/following", verifyToken, postController.getFollowingUser);

export default router;
