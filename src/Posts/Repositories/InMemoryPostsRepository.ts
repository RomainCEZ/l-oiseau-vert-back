import Post from "../entities/Post";
import PostsRepository from "./PostsRepository.interface";

const HttpException = require("../../common/HttpException");

class InMemoryPostsRepository implements PostsRepository {
    posts: Post[];
    constructor() {
        this.posts = [{
            id: "random_nanoid",
            authorId: "uuid",
            author: "Me",
            content: "Ceci est un post !",
            timestamp: 1656190787175,
            comments: []
        }];
    }
    async getPosts() {
        return [...this.posts.sort((a, b) => b.timestamp - a.timestamp).slice(0, 10)];
    }

    async getNextTenPosts(date: number): Promise<Post[]> {
        const nextPosts = [...this.posts.filter(post => post.timestamp < date)]
        return nextPosts.length > 10 ? nextPosts.slice(0, 10) : nextPosts
    }
    async getPostById(postId: string) {
        const post = this.posts.find((post) => post.id === postId);
        if (!post) {
            throw new HttpException(404, "Post not found !");
        }
        return post;
    }
    async savePost(newPost: Post) {
        this.posts.push(newPost);
    }
    async updatePost(post: Post) {
        this.deletePost(post.id);
        this.posts.push(post);
    }
    async deletePost(postId: string) {
        this.posts = this.posts.filter((post) => post.id !== postId);
    }
}

export default InMemoryPostsRepository;
