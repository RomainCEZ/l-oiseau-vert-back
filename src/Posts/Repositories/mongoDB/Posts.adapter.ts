import { STATUS_CODES } from "http";
import HttpException from "../../../common/HttpException";
import PostModel from "../../entities/MongoDBModels/Post.model";
import Post from "../../entities/Post";
import PostInterface from "../../interfaces/Post.interface";
import PostsRepository from "../PostsRepository.interface";

export default class MongoDBPostsAdapter implements PostsRepository {
    async getPosts(): Promise<PostInterface[]> {
        const postModels = await PostModel.find({ timestamp: { $lt: Date.now() } }).sort({ timestamp: 'desc' }).limit(10);
        const posts = postModels.map(postModel => {
            return new Post({
                id: postModel.postId,
                authorId: postModel.authorId,
                author: postModel.author,
                content: postModel.content,
                timestamp: postModel.timestamp,
                comments: postModel.comments
            });
        })
        return posts;
    }
    async getNextTenPosts(date: number): Promise<Post[]> {
        const postModels = await PostModel.find({ timestamp: { $lt: date } }).sort({ timestamp: 'desc' }).limit(10);
        const posts = postModels.map(postModel => {
            return new Post({
                id: postModel.postId,
                authorId: postModel.authorId,
                author: postModel.author,
                content: postModel.content,
                timestamp: postModel.timestamp,
                comments: postModel.comments
            });
        })
        return posts;
    }
    async getPostById(postId: string): Promise<PostInterface> {
        const postModel = await PostModel.findOne({ postId })
        if (!postModel) {
            throw new HttpException(404, "Post not found !");
        }
        return new Post({
            id: postModel.postId,
            authorId: postModel.authorId,
            author: postModel.author,
            content: postModel.content,
            timestamp: postModel.timestamp,
            comments: postModel.comments
        });
    }
    async savePost(newPost: Post): Promise<void> {
        const post = new PostModel({
            postId: newPost.id,
            authorId: newPost.authorId,
            author: newPost.author,
            content: newPost.content,
            timestamp: newPost.timestamp,
            comments: newPost.comments
        })
        post.save()
    }
    async updatePost(postId: string, content: string): Promise<void> {
        await PostModel.updateOne(
            { postId },
            { content }
        )
    }
    async deletePost(postId: string): Promise<void> {
        await PostModel.deleteOne({ postId })
    }
}