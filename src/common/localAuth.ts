import { NextFunction, Request, Response } from "express";
import usersService from "../Users/Users.service";
import HttpException from "./HttpException";

export default class LocalAuth {

    static async authenticate(email: string, password: string, done: any) {
        try {
            const user = await usersService.createLoginSession({ email, password })
            return done(null, { id: user.userId, username: user.username })
        } catch (err) {
            console.log(err)
        }
    }

    static isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.isAuthenticated()) {
                next()
            } else {
                throw new HttpException(401, "Not authorized")
            }
        } catch (error) {
            console.log(error)
        }
    }

    static serializeUser = (userId: any, done: any) => {
        done(null, userId)
    }

    static deserializeUser = async (serializedUser: any, done: any) => {
        try {
            const user = await usersService.getUserById(serializedUser.id)
            done(null, { userId: user.id, username: user.username })
        } catch (error) {
            console.log(error)
        }
    }
}
