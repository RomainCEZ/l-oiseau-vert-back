import { v4 as uuidv4 } from "uuid";
import IPost from '../interfaces/Post.interface';

export default class Post {
    id: string;
    authorId: string;
    author: string;
    content: string;
    creationDate: number;
    comments: Comment[];

    constructor({ id, authorId, author, content, creationDate, comments }: IPost) {
        this.id = id || uuidv4()
        this.authorId = authorId
        this.author = author;
        this.content = content;
        this.creationDate = creationDate || Date.now();
        this.comments = comments || []
    }
}
