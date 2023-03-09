import client from "../libs/db";
import { AddExerciseDTO } from "../dtos";

class ExercisesService {
    async create(idUser: string, data: AddExerciseDTO) {
        const base = data.date ? new Date(data.date) : new Date();
        const normalizer = data.date ? 1 : 0;
        const date = new Date(base.getFullYear(), base.getMonth(), base.getDate() + normalizer);

        const exercise = await client.exercise.create({
            data: {
                user: {
                    connect: {
                        id: idUser
                    }
                },
                ...data,
                date
            },
            include: {
                user: true
            }
        });

        return {
            username: exercise.user.username,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date.toDateString(),
            _id: exercise.user.id
        };
    }

    async deleteAll() {
        await client.exercise.deleteMany();
    }
}

export default ExercisesService;
