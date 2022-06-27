import { NextFunction, Request, Response } from "express"
import HttpException from "./HttpException"

function errorHandler(err: HttpException, req: Request, res: Response, next: NextFunction) {
    console.log(err)
    res.status(err.status || 500).json({ message: err.message || 'Server error' })
}

export default errorHandler