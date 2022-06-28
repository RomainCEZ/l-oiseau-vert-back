import { v4 as uuidv4 } from "uuid";
import IPost from '../interfaces/Post.interface';

export default class Post {
    id: string;
    authorId: string;
    author: string;
    content: string;
    timestamp: number;
    comments: Comment[];

    constructor({ id, authorId, author, content, timestamp, comments }: IPost) {
        this.id = id || uuidv4()
        this.authorId = authorId
        this.author = author;
        this.content = content;
        this.timestamp = timestamp || Date.now();
        this.comments = comments || []
    }
}
