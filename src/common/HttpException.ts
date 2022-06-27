export default class HttpException {
    status: number
    message: string
    constructor(status = 500, message: string) {
        this.status = status;
        this.message = message;
    }
}
