import HttpException from "../../../common/HttpException";
import Email from "../../entities/Email";
import UserModel from "../../entities/MongoDBModels/User.model";
import User from "../../entities/User";
import UserPassword from "../../entities/UserPassword";
import IUsersRepository from "../UsersRepository.interface";

export default class MongoDBUsersAdapter implements IUsersRepository {
    async getUserByEmail(email: string): Promise<User> {
        const userModel = await UserModel.findOne({ email: email });
        if (!userModel) {
            throw new HttpException(401, "User doesn't exist !")
        }
        const user = new User({
            id: userModel.userId,
            email: Email.create(userModel.email).value,
            username: userModel.username,
            password: UserPassword.create(userModel.password).value
        })
        return user
    }

    async getUserById(id: string): Promise<User> {
        const userModel = await UserModel.findOne({ userId: id });
        if (!userModel) {
            throw new HttpException(401, "User doesn't exist !")
        }
        const user = new User({
            id: userModel.userId,
            email: Email.create(userModel.email).value,
            username: userModel.username,
            password: UserPassword.create(userModel.password).value
        })
        return user
    }

    async saveUser(newUser: User): Promise<void> {
        try {
            const user = new UserModel({
                email: newUser.email,
                username: newUser.username,
                password: newUser.password,
                userId: newUser.id
            })
            await user.save();

        } catch (error) {
            console.log(error)
        }
    }

}