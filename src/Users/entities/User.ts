import { v4 as uuidv4 } from "uuid";

interface IUser {
    id?: string
    email: string
    password: string
    username: string
}

class User {
    id?: string
    email: string
    password: string
    username: string
    constructor({ id, email, password, username }: IUser) {
        this.id = id || uuidv4()
        this.email = email;
        this.password = password;
        this.username = username;
    }
}

export default User;