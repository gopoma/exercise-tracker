import express, { Request, Response } from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import status from "http-status";

import config from "./config";
import { users } from "./routes";


// Create Express server
const app = express();

app.enable("trust proxy");


// Development logging
if(config.development) {
    app.use(morgan("dev"));
}


// Implementing CORS
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
    legacyHeaders: false
});
app.use(limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.use(compression());


app.get("/", (req: Request, res: Response) => {
    return res.sendFile(__dirname + "/views/index.html");
});

app.get("/api", (req, res) => {
    return res.status(status.OK).json({
        name: "exercise-tracker",
        version: "1.0.0",
        author: "Gustavo Eduardo Ordoño Poma"
    });
});

// Routes
users(app);

app.all("*", (req: Request, res: Response) => {
    return res.status(status.NOT_FOUND).json({
        success: false,
        message: `Can't find [${req.method}] ${req.originalUrl} resolver on this server!`
    });
});


export default app;
