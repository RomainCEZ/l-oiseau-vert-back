export default interface IPost {
    id: string;
    authorId: string;
    author: string;
    content: string;
    timestamp: number;
    comments: Comment[];
}