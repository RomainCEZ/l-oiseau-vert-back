import HttpException from "../common/HttpException";
import Email from "./entities/Email";
import User from "./entities/User";
import UserPassword from "./entities/UserPassword";
import InMemoryUsersRepository from "./Repositories/InMemoryUsersRepository";
import IUsersRepository from "./Repositories/UsersRepository.interface";

const usersRepository = new InMemoryUsersRepository()

class UsersService {
    usersRepository
    constructor(usersRepository: IUsersRepository) {
        this.usersRepository = usersRepository
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.getUserByEmail(email.toLowerCase());
        if (!user) {
            throw new HttpException(401, "Utilisateur introuvable !")
        }
        const passwordIsValid = await this.verifyPassword(UserPassword.create(password), user.password)
        if (passwordIsValid) {
            const { password, email, ...userInfo } = user;
            return userInfo;
        }
        return null;
    }
    async getUserByEmail(email: string) {
        return await this.usersRepository.getUserByEmail(email);
    }
    async getUserById(id: string) {
        const user = await this.usersRepository.getUserById(id);
        return user
    }
    async createUser({ email, password, username }: User) {
        const newUser = new User({ email, password, username });
        await this.usersRepository.saveUser(newUser);
    }
    async createLoginSession({ email, password }: { email: string, password: string }) {
        const user = await this.getUserByEmail(new Email(email).value);
        await this.verifyPassword(UserPassword.create(password), user.password);
        return {
            userId: user.id,
            username: user.username
        };
    }
    async verifyPassword(userPassword: UserPassword, hashedPassword: string) {
        const isEqual = await userPassword.comparePassword(hashedPassword)
        if (!isEqual) {
            throw new HttpException(401, 'Password invalid !')
        }
        return isEqual
    }
}
export default new UsersService(usersRepository);