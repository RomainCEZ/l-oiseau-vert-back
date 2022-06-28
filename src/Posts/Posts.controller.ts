import { NextFunction, Request, Response } from "express";
import Post from "./entities/Post";
import PostsService from "./Posts.service";
import InMemoryPostsRepository from "./Repositories/InMemoryPostsRepository";
import PostsRepository from "./Repositories/PostsRepository.interface";
import HttpException from "../common/HttpException";
import MongoDBPostsAdapter from "./Repositories/mongoDB/Posts.adapter";

const postsRepository: PostsRepository = new MongoDBPostsAdapter();
const postsService: PostsService = new PostsService(postsRepository)

class PostsController {
    constructor() {
    }

    async getPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const allPosts = await postsService.getPosts();
            res.status(200).json(allPosts);
        } catch (error) {
            next(error);
        }
    };

    async getNextTenPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const nextPosts: Post[] = await postsService.getNextTenPosts(+req.params.date)
            res.status(200).json(nextPosts);
        } catch (error) {
            next(error);
        }
    }

    async getPostById(req: Request, res: Response, next: NextFunction) {
        try {
            const post = await postsService.getPostById(req.params.id);
            res.status(200).json(post);
        } catch (error) {
            next(error)
        }
    }

    async postPost(req: Request, res: Response, next: NextFunction) {
        try {
            const newPost = new Post({
                ...req.body,
                // @ts-ignore
                authorId: req.user.userId,
                // @ts-ignore
                author: req.user.username
            });
            await postsService.createPost(newPost);
            res.status(201).json({ message: "New post created !" });
        } catch (error) {
            next(error);
        }
    };
    async updatePost(req: Request, res: Response, next: NextFunction) {
        try {
            const post = await postsService.getPostById(req.params.id);
            // @ts-ignore
            if (req.user.userId !== post.authorId) {
                throw new HttpException(403, 'Unauthorized request !')
            }
            await postsService.updatePost(req.params.id.toString(), req.body.content.toString());

            res.status(200).json({ message: 'Post updated !' });
        } catch (error) {
            next(error)
        }
    }

    async deletePost(req: Request, res: Response, next: NextFunction) {
        try {
            const post = await postsService.getPostById(req.params.id);
            // @ts-ignore
            if (req.user.userId !== post.authorId) {
                throw new HttpException(403, 'Unauthorized request !')
            }
            await postsService.deletePost(req.params.id);
            res.status(200).json({ message: `Post deleted !` });
        } catch (error) {
            next(error)
        }
    }

    // updateLikes = async (req, res, next) => {
    //     try {
    //         const postId = req.params.id;
    //         const userId = req.body.userId;
    //         switch (req.body.like) {
    //             case 1: await this.postsService.likePost(postId, userId);
    //             break;
    //             case -1: await this.postsService.dislikePost(postId, userId);
    //             break;
    //         }
    //         res.status(200).json({ message: 'Likes updated !' });
    //     } catch (error) {
    //         next(error)
    //     }
    // }
}

export default PostsController;
