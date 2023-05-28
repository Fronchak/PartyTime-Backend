import { Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import ValidationError from "../errors/validation-error";
import FieldError from "../errors/field-error";
import CustomRequest from "../interfaces/custom-request";
import partyService from "../services/party-service";

class PartyController {

    public async save(req: Request, res: Response) {
        const files = req.files as Express.Multer.File[];
        if(!files || files.length === 0) {
            throw new ValidationError([
                new FieldError('photos', 'Party must have at least one photo')
            ]);
        }
        const photos = files.map((file) => file.filename);
        const username = (req as  CustomRequest).username;
        const partyDTO = await partyService.save({
            ...req.body,
            photos
        }, username);
        return res.status(201).json(partyDTO);
    }

    public async updateById(req: Request, res: Response) {
        let files = req.files as Express.Multer.File[];
        if(!files) {
            files = [];
        }
        const photos = files.map((file) => file.filename);
        const username = (req as  CustomRequest).username;
        const partyDTO = await partyService.updateById({
            ...req.body, photos
        }, username, req.params.id);
        return res.status(200).json(partyDTO);
    }

    public async findAllPublics(req: Request, res: Response) {
        const partiesDTO = await partyService.findAllPublics();
        return res.status(200).json(partiesDTO);
    }

    public async findById(req: Request, res: Response) {
        const authHeaders = req.headers.authorization;
        let username: string | undefined;
        if(authHeaders && authHeaders.startsWith("Bearer ")) {
            const token = authHeaders.substring(7);
            try {
                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '')
                username = (decoded as JwtPayload).username;
            }
            catch(e) {}  
        }
        const partyDTO = await partyService.findById(req.params.id, username);
        return res.status(200).json(partyDTO);
    }

    public async deleteById(req: Request, res: Response) {
        const username = (req as CustomRequest).username;
        await partyService.deleteById(req.params.id, username);
        return res.status(204).json();
    }
}

export default new PartyController();