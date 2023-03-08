import { Application, Request, Response, Router } from "express";
import { UsersService } from "../services";
import { validateSchema } from "../middlewares";
import { CreateUserDTOSchema } from "../dtos";
import status from "http-status";


function users(app: Application) {
    const router = Router();
    const usersServ = new UsersService();

    app.use("/api/users", router);

    router.post("/", validateSchema(CreateUserDTOSchema), async (req: Request, res: Response) => {
        const result = await usersServ.create(req.body);

        return res.status(status.CREATED).json(result);
    });
}

export default users;
