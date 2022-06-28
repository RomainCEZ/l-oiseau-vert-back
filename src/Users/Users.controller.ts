import { NextFunction, Request, Response } from "express";
import Email from "./entities/Email";
import UserPassword from "./entities/UserPassword";
import usersService from "./Users.service";


class UsersController {
    constructor() { }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            await usersService.createUser({
                email: Email.create(req.body.email).value,
                password: await UserPassword.create(req.body.password).hashPassword(),
                username: req.body.username
            });
            res.status(201).json({ message: 'New user created !' });
        }
        catch (error) {
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).json(req.user)
        } catch (error) {
            next(error)
        }
    }

    async relog(req: Request, res: Response, next: NextFunction) {
        if (req.user) {
            res.status(200).json(req.user)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('logout')
            req.logout(err => { });
            res.status(200).json('Successfully logout !')
        } catch (error) {
            next(error)
        }
    }
}

export default new UsersController()