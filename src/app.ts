import express, { Request, Response } from "express";
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

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
    legacyHeaders: false
});
app.use(limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

app.use(compression());


app.get("/", (req, res) => {
    return res.json({
        name: "exercise-tracker",
        version: "1.0.0",
        author: "Gustavo Eduardo Ordoño Poma",
    });
});

// Routes
users(app);

app.all("*", (req: Request, res: Response) => {
    return res.status(status.NOT_FOUND).json({
        success: false,
        message: `Can't find [${req.method}] ${req.originalUrl} resolver on this server!`,
    });
});


export default app;
