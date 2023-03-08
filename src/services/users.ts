import client from "../libs/db";
import { CreateUserDTO } from "../dtos";

class UsersService {
    async create(data: CreateUserDTO) {
        const user = await client.user.create({
            data
        });

        return {
            username: user.username,
            _id: user.id
        };
    }

    async getAll() {
        const users = await client.user.findMany();

        return users.map(user => ({
            username: user.username,
            _id: user.id
        }));
    }

    async deleteAll(){
        await client.user.deleteMany();
    }
}

export default UsersService;
