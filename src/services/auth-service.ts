import bcrypt from 'bcrypt';
import RegisterInputDTO from "../dtos/auth/register-input-dto";
import tokenService from './token-service';
import User from '../models/user';
import TokenOutputDTO from '../dtos/auth/token-output-dto';
import UnauthorizedEror from '../errors/unauthorized-error';
import LoginInputDTO from '../dtos/auth/login-input-dto';
import ValidationError from '../errors/validation-error';
import FieldError from '../errors/field-error';
import UpdateInputDTO from '../dtos/auth/update-input-dto';
import userService from './user-service';
import UserUpdateOutputDTO from '../dtos/user/user-update-output-dto';

class AuthService {

    public async register(registerInputDTO: RegisterInputDTO): Promise<TokenOutputDTO> {
        if(registerInputDTO.password !== registerInputDTO.confirmPassword) {
            throw new ValidationError([
                new FieldError('password', 'Passwords must match'),
                new FieldError('confirmPassword', 'Passwords must match')
            ]);
        }
        const password = await bcrypt.hash(registerInputDTO.password, 10);
        const user = new User({ 
            name: registerInputDTO.name,
            email: registerInputDTO.email,
            password
        });
        await user.save();
        return tokenService.makeToken(registerInputDTO.email, user._id.toString());
    }

    public async update(updateInputDTO: UpdateInputDTO, username: string): Promise<UserUpdateOutputDTO> {
        const user = await userService.getUserByEmail(username);
        user.name = updateInputDTO.name;
        user.email = updateInputDTO.email;
        await user.save();
        const tokenOutputDTO = tokenService.makeToken(user.email, user._id.toString());
        return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            access_token: tokenOutputDTO.access_token
        }
    }

    public async login(loginInputDTO: LoginInputDTO): Promise<TokenOutputDTO> {
        if(!loginInputDTO.email || !loginInputDTO.password) {
            throw new UnauthorizedEror('Email or password invalid');
        }
        const user = await User.findOne({ email: loginInputDTO.email });
        if(!user) {
            throw new UnauthorizedEror('Email or password invalid');
        }
        const match = await bcrypt.compare(loginInputDTO.password, user.password);
        if(!match) {
            throw new UnauthorizedEror('Email or password invalid'); 
        }
        return tokenService.makeToken(user.email, user._id.toString());
    }
}

export default new AuthService();