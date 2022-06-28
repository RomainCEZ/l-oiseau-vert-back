import { Router } from "express";
import LocalAuth from "../common/localAuth";
import PostsController from "./Posts.controller";

const router: Router = Router();
const postsController: PostsController = new PostsController();

router.get("/", LocalAuth.isAuthenticated, postsController.getPosts);
router.get("/next/:date", LocalAuth.isAuthenticated, postsController.getNextTenPosts);
router.get('/:id', LocalAuth.isAuthenticated, postsController.getPostById);
router.post("/", LocalAuth.isAuthenticated, postsController.postPost);
router.put('/:id', LocalAuth.isAuthenticated, postsController.updatePost);
router.delete('/:id', LocalAuth.isAuthenticated, postsController.deletePost);
// router.post('/:id/like', auth, postsController.updateLikes);

export { router };
