import { Request, Response } from "express";
import userService from "../services/user-service";
import CustomRequest from "../interfaces/custom-request";
import partyService from "../services/party-service";

class UserController {

    public async findById(req: Request, res: Response) {
        const userDTO = await userService.findById(req.params.id);
        return res.status(200).json(userDTO);
    }

    public async findAllUserParties(req: Request, res: Response) {
        const username = (req as CustomRequest).username;
        const partiesDTO = await partyService.findAllUserParties(username);
        return res.status(200).json(partiesDTO);
    }

    public async findUserParty(req: Request, res: Response) {
        const username = (req as CustomRequest).username;
        const partyDTO = await partyService.findUserParty(req.params.id, username);
        return res.status(200).json(partyDTO);
    }
}

export default new UserController();