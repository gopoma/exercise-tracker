import { Application, Request, Response, Router } from "express";
import {
    UsersService,
    ExercisesService
} from "../services";
import { validateSchema } from "../middlewares";
import {
    CreateUserDTOSchema,
    AddExerciseParamsDTOSchema,
    AddExerciseDTOSchema
} from "../dtos";
import status from "http-status";


function users(app: Application) {
    const router = Router();
    const usersServ = new UsersService();
    const exercisesServ = new ExercisesService();

    app.use("/api/users", router);

    router.post("/", validateSchema(CreateUserDTOSchema), async (req: Request, res: Response) => {
        const result = await usersServ.create(req.body);

        return res.status(status.CREATED).json(result);
    });

    router.get("/", async (req: Request, res: Response) => {
        const result = await usersServ.getAll();

        return res.status(status.OK).json(result);
    });

    router.post("/:_id/exercises", validateSchema(AddExerciseParamsDTOSchema, "params"), validateSchema(AddExerciseDTOSchema), async (req: Request, res: Response) => {
        const result = await exercisesServ.create(req.params._id, req.body);

        return res.status(status.ACCEPTED).json(result);
    });
}

export default users;
