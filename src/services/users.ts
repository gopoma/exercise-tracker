import client from "../libs/db";
import { CreateUserDTO } from "../dtos";

class UsersService {
    async create(data: CreateUserDTO) {
        const user = await client.user.create({
            data
        });

        return {
            _id: user.id,
            username: user.username
        };
    }

    async getAll() {
        const users = await client.user.findMany();

        return users.map(user => ({
            _id: user.id,
            username: user.username
        }));
    }

    async deleteAll(){
        await client.user.deleteMany();
    }
}

export default UsersService;
