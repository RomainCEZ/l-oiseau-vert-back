import * as bcrypt from "bcrypt"

class UserPassword {
    password: string
    constructor(password: string) {
        this.password = password;
    }

    get value() {
        return this.password
    }

    public static create(password: string): UserPassword {
        return new UserPassword(password.toString())
    }

    public async comparePassword(hash: string): Promise<boolean> {
        return await bcrypt.compare(this.value, hash);
    }
    public async hashPassword(): Promise<string> {
        return await bcrypt.hash(this.password, 10);
    }
}

export default UserPassword;