import { Request, Response } from "express";
import authService from "../services/auth-service";
import TokenOutputDTO from "../dtos/auth/token-output-dto";
import CustomRequest from "../interfaces/custom-request";

class AuthController {

    public async register(req: Request, res: Response) {
        const token: TokenOutputDTO = await authService.register(req.body);
        return res.status(201).json(token);
    }

    public async update(req: Request, res: Response) {
        const username = (req as CustomRequest).username;
        const userDTO = await authService.update(req.body, username);
        return res.status(200).json(userDTO);
    }

    public async login(req: Request, res: Response) {
        const token: TokenOutputDTO = await authService.login(req.body);
        return res.status(200).json(token);
    }
}

export default new AuthController();