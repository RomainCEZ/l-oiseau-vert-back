import { v4 as uuidv4 } from "uuid";
import IComment from "../interfaces/Comment.interface";

export default class Comment {
    id: string
    content: string
    authorId: string
    author: string
    timestamp: number

    constructor({ id, content, authorId, author, timestamp }: IComment) {
        this.id = id || uuidv4()
        this.content = content
        this.authorId = authorId
        this.author = author
        this.timestamp = timestamp || Date.now()
    }

}