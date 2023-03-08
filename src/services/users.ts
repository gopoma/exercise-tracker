import client from "../libs/db";
import { CreateUserDTO } from "../dtos";

class UsersService {
    async create(data: CreateUserDTO) {
        return {
            success: true,
            message: "Creating...",
        };
    }
}

export default UsersService;
