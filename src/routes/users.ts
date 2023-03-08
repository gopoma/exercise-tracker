import { Application,Router } from "express";

function users(app: Application) {
    const router = Router();

    app.use("/api/users", router);
}

export default users;
