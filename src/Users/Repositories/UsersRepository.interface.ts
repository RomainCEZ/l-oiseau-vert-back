import User from "../entities/User"

export default interface IUsersRepository {
    getUserByEmail(email: string): Promise<User>
    getUserById(id: string): Promise<User>
    isUnique?(newUser: User): Promise<boolean>
    saveUser(newUser: User): Promise<void>
}