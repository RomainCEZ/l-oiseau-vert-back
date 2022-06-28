import express from "express";
import cors from "cors"
import session from "express-session"
import passport from "passport"
import LocalStrategy from "passport-local"
import errorHandler from "./common/errorHandler";
import helmet from "helmet"
import dotenv from "dotenv"
import HttpException from "./common/HttpException"
import { router as postsRoutes } from "./Posts/Posts.routes"
import { router as usersRoutes } from "./Users/Users.routes"
import LocalAuth from "./common/localAuth";
import MongoDBStore from "connect-mongodb-session";
import { join } from "path";

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors({
    origin: `${process.env.CLIENT_ADDRESS}`,
    credentials: true
}))

const store = new (MongoDBStore(session))({
    uri: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_ADDRESS}/?retryWrites=true&w=majority`,
    collection: `${process.env.MONGO_SESSION_COLLECTION}`
});

app.use(session({
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET!,
    store: store,
    resave: false,
    cookie: {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24h
    },
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy.Strategy({ usernameField: 'email' }, LocalAuth.authenticate))

passport.serializeUser(LocalAuth.serializeUser)
passport.deserializeUser(LocalAuth.deserializeUser)
app.use(helmet({
    contentSecurityPolicy: false,
}));

app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use(express.static(join(__dirname, '..', './client/dist')));
app.use("/api/posts", postsRoutes);
app.use('/api/auth', usersRoutes);

app.use((req, res, next) => {
    const error = new HttpException(404, "Not found");
    next(error);
});

app.use(errorHandler);

export { app };
