import { Router } from "express";
import passport from "passport";
import LocalAuth from "../common/localAuth";
import usersController from "./Users.controller";

const router = Router();

router.post('/register', usersController.register);
router.post('/login', passport.authenticate('local'), usersController.login);
router.get('/', LocalAuth.isAuthenticated, usersController.relog);
router.delete('/logout', usersController.logout);

export { router };