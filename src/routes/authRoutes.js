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
	upload.single("image"),
	imageController.uploadImage,
);
router.post("/create-post", verifyToken, postController.createpost);
router.get("/get-own-post", verifyToken, postController.getOwnpost);
router.get("/get-all-post", verifyToken, postController.getAllpost);
router.put("/post-update/:postId", verifyToken, postController.updateOwnPost);
router.delete("/delete-post/:postId", verifyToken, postController.deleteOwnPost);
router.post("/post/:postId", verifyToken, postController.likepost);
router.delete("/post/:postId", verifyToken, postController.unlikepost);
router.post("/post/add-comment/:postId", verifyToken, postController.addComment);
router.post("/follow/:userId", verifyToken, postController.followUser);
router.delete("/un-follow/:userId", verifyToken, postController.unFollowUser);
router.get("/follow", verifyToken, postController.getFollowUser);
router.get("/following", verifyToken, postController.getFollowingUser);

export default router;
