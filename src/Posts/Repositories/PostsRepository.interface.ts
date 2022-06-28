import Post from "../entities/Post"
import IPost from "../interfaces/Post.interface"

export default interface PostsRepository {
    getPosts(): Promise<IPost[]>

    getNextTenPosts(date: number): Promise<Post[]>

    getPostById(postId: string): Promise<IPost>

    savePost(newPost: Post): Promise<void>

    updatePost(id: string, content: string): Promise<void>

    deletePost(postId: string): Promise<void>
}