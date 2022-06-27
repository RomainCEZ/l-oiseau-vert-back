import HttpException from "../../common/HttpException";


class Email {
    email: string
    constructor(email: string) {
        this.email = email;
    }
    get value(): string {
        const emailIsValid = this.emailIsValid(this.email)
        if (!emailIsValid) {
            throw new HttpException(400, 'Email invalid !');
        }
        return this.email;
    }
    static create(email: string): Email {
        return new Email(email.toLowerCase())
    }
    private emailIsValid(email: string): boolean {
        return new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email);
    }
}

export default Email;