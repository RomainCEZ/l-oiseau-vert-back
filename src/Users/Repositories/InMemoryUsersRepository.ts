import HttpException from "../../common/HttpException";
import User from "../entities/User";
import IUsersRepository from "./UsersRepository.interface";

class InMemoryUsersRepository implements IUsersRepository {
    users: User[]
    constructor() {
        this.users = [
            {
                id: "uuid",
                email: '123@123.fr',
                password: '$2b$10$VYEHsvAhkZ8LIYUA1a2izuTsgScIJMBuXNI5.KBSrP/poKx.9VubG', //123
                username: "user"
            }
        ]
    }
    async getUserByEmail(email: string): Promise<User> {
        const user = this.users.find(user => user.email === email);
        if (!user) {
            throw new HttpException(404, 'User not found !');
        } else {
            return user;
        }
    }
    async getUserById(id: string): Promise<User> {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new HttpException(404, 'User not found !');
        } else {
            return user;
        }
    }
    async isUnique(newUser: User): Promise<boolean> {
        return !(this.users.find(user => user.email === newUser.email) || this.users.find(user => user.username === newUser.username))
    }
    async saveUser(newUser: User): Promise<void> {
        if (!await this.isUnique(newUser)) {
            throw new HttpException(400, 'Email or Username already registered !');
        } else {
            this.users.push(newUser);
        }
    }
}

export default InMemoryUsersRepository;