import UserOutputDTO from "../dtos/user/user-output-dto";
import EntityNotFoundError from "../errors/entity-not-found-error";
import UnauthorizedError from "../errors/unauthorized-error";
import UserMapper from "../mappers/user-mapper";
import User from "../models/user";

class UserService {
    public async findByEmail(email: string) {
        return await User.findOne({ email });
    }

    public async getUserByEmail(email: string) {
        const user = await User.findOne({ email });
        if(!user) {
            throw new UnauthorizedError();
        }
        return user;
    }

    public async findById(id: string): Promise<UserOutputDTO> {
        const user = await User.findById(id);
        if(!user) {
            throw new EntityNotFoundError('User not found');
        }
        return UserMapper.toUserDTO(user);
    }
}

export default new UserService();