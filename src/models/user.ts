import { Schema, model } from 'mongoose';

export interface IUser {
    name: string,
    email: string,
    password: string
}

const User = model<IUser>('Users', new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}));

export default User;