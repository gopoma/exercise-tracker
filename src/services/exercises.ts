import { Prisma } from "@prisma/client";
import client from "../libs/db";
import { AddExerciseDTO, GetLogsQueryDTO } from "../dtos";
import { normalizeDate } from "../helpers";

class ExercisesService {
    async create(idUser: string, data: AddExerciseDTO) {
        const current = new Date();
        const currentBase = `${current.getFullYear()}-${((current.getMonth() + 1).toString().length === 1 ? "0" : "") + (current.getMonth() + 1).toString()}-${(current.getDate().toString().length === 1 ? "0" : "") + current.getDate().toString()}`;
        const base: string = data.date || currentBase;
        const date = normalizeDate(base);

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

    async getRelated(idUser: string, filters: GetLogsQueryDTO) {
        let query: Prisma.ExerciseFindManyArgs = {
            where: {
                idUser,
                date: {
                    gte: filters.from && normalizeDate(filters.from),
                    lte: filters.to && normalizeDate(filters.to)
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
            _id: user.id,
            username: user.username,
            from: filters.from,
            to: filters.to,
            count: logs.length,
            log: logs
        };
    }

    async deleteAll() {
        await client.exercise.deleteMany();
    }
}

export default ExercisesService;
