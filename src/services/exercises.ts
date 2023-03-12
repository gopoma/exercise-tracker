import { Prisma } from "@prisma/client";
import client from "../libs/db";
import { AddExerciseDTO, GetLogsQueryDTO } from "../dtos";

class ExercisesService {
    async create(idUser: string, data: AddExerciseDTO) {
        const user = await client.user.findUnique({
            where: {
                id: idUser
            }
        });

        if(!user) {
            return {};
        }

        const exercise = await client.exercise.create({
            data: {
                user: {
                    connect: {
                        id: idUser
                    }
                },
                description: data.description,
                duration: Number.parseInt(data.duration),
                date: data.date ? new Date(data.date) : new Date()
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

    async getRelated(idUser: string, filters: GetLogsQueryDTO) {
        let query: Prisma.ExerciseFindManyArgs = {
            where: {
                idUser,
                date: {
                    gte: filters.from && new Date(filters.from),
                    lte: filters.to && new Date(filters.to)
                }
            }
        };

        if(filters.limit && Number.parseInt(filters.limit) !== 0) {
            query = {
                ...query,
                take: Number.parseInt(filters.limit)
            };
        }

        const user = await client.user.findUnique({
            where: {
                id: idUser
            }
        });

        if(!user) {
            return {};
        }

        const exercises = await client.exercise.findMany({
            ...query,
            select: {
                description: true,
                duration: true,
                date: true
            }
        } as Prisma.ExerciseFindManyArgs);

        const logs = exercises.map(exercise => ({
            ...exercise,
            date: exercise.date.toDateString()
        }));

        return {
            username: user.username,
            count: logs.length,
            _id: user.id,
            log: logs
        };
    }

    async deleteAll() {
        await client.exercise.deleteMany();
    }
}

export default ExercisesService;
