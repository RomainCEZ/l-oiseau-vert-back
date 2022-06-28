import HttpException from "../common/HttpException";
import Post from "./entities/Post";
import IPost from "./interfaces/Post.interface";
import PostsRepository from "./Repositories/PostsRepository.interface";


class PostsService {
    postsRepository: PostsRepository;
    constructor(postsRepository: PostsRepository) {
        this.postsRepository = postsRepository;
    }
    public async getPosts() {
        return await this.postsRepository.getPosts();
    }

    async getNextTenPosts(date: number) {
        return await this.postsRepository.getNextTenPosts(date)
    }

    public async getPostById(postId: string) {
        const post = await this.postsRepository.getPostById(postId);
        if (!post) {
            throw new HttpException(404, "Post not found !");
        }
        return post;
    }
    public async createPost(post: Post): Promise<void> {
        await this.postsRepository.savePost(post);
    }
    public async updatePost(postId: string, content: string): Promise<void> {
        await this.postsRepository.updatePost(postId, content);
    }

    public async deletePost(postId: string): Promise<void> {
        const post = await this.postsRepository.getPostById(postId);
        await this.postsRepository.deletePost(postId);
    }
}
export default PostsService;
