import { Document, Types } from "mongoose";
import User, { IUser } from "../models/user";
import UserOutputDTO from "../dtos/user/user-output-dto";

class UserMapper {
    public static toUserDTO(user: Document<unknown, {}, IUser> & Omit<IUser & {
        _id: Types.ObjectId;
    }, never>): UserOutputDTO {
        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email
        }
    }
}

export default UserMapper;