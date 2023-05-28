import { Document, Types } from "mongoose";
import PartyInputDTO from "../dtos/party/party-input-dto";
import PartyOutputDTO from "../dtos/party/party-output-dto";
import SimplePartyOutputDTO from "../dtos/party/simple-party-output-dto";
import EntityNotFoundError from "../errors/entity-not-found-error";
import UnauthorizedError from "../errors/unauthorized-error";
import PartyMapper from "../mappers/party-mapper";
import Party from "../models/party";
import userService from "./user-service";
import { IUser } from "../models/user";

class PartyService {

    public async save(partyInputDTO: PartyInputDTO, username: string): Promise<PartyOutputDTO> {
        const user = await userService.getUserByEmail(username);
        const party = new Party({
            ...partyInputDTO,
            userId: user._id
        });
        await party.save();
        return PartyMapper.toPartyOutputDTO(party, user);
    }

    public async findAllPublics(): Promise<Array<SimplePartyOutputDTO>> {
        const parties = await Party.find({
            privacy: false
        }).sort([[ '_id', -1 ]]);
        return PartyMapper.toSimpleParties(parties);
    }

    public async findAllUserParties(username: string): Promise<Array<SimplePartyOutputDTO>> {
        const user = await userService.getUserByEmail(username);
        const parties = await Party.find({
            userId: user._id
        }).sort([['_id', -1]]);
        return PartyMapper.toSimpleParties(parties);
    }

    public async findUserParty(partyId: string, username: string): Promise<PartyOutputDTO> {
        const user = await userService.getUserByEmail(username);
        const party = await Party.findById(partyId);
        if(!party) {
            throw new EntityNotFoundError('Party not found');
        }
        if(!party.userId.equals(user._id)) {
            throw new UnauthorizedError('You can only see the details of your own party');
        }
        return PartyMapper.toPartyOutputDTO(party, user);
    }

    public async findById(partyId: string, username: string | undefined): Promise<PartyOutputDTO> {
        const party = await Party.findById(partyId).populate('userId');
        console.log(party);
        if(!party) {
            throw new EntityNotFoundError('Party not found');
        }
        const partyOwner = party.userId as unknown as (Document<unknown, {}, IUser> & Omit<IUser & {
            _id: Types.ObjectId;
        }, never>);
        if(!party.privacy) {
            return PartyMapper.toPartyOutputDTO(party, partyOwner);
        }
        if(!username) {
            throw new UnauthorizedError('You cannot se the details of a private party');
        }
        const user = await userService.getUserByEmail(username);
        if(user._id.equals(partyOwner._id)) {
            return PartyMapper.toPartyOutputDTO(party, partyOwner); 
        }
        else {
            throw new UnauthorizedError('You cannot se the details of a private party');
        }
    }

    public async deleteById(partyId: string, username: string) {
        const user = await userService.getUserByEmail(username);
        const party = await Party.findById(partyId);
        if(!party) {
            throw new EntityNotFoundError('Party not found');
        }
        if(!party.userId.equals(user._id)) {
            throw new UnauthorizedError('You cannot delete a party that is not yours');
        }
        await Party.findByIdAndDelete(party._id);
    }

    public async updateById(partyInputDTO: PartyInputDTO, username: string, partyId: string): Promise<PartyOutputDTO> {
        const user = await userService.getUserByEmail(username);
        const party = await Party.findById(partyId);
        if(!party) {
            throw new EntityNotFoundError('Party not found');
        }
        if(!party.userId.equals(user._id)) {
            throw new UnauthorizedError('You cannot update a party that is not yours');
        }
        party.title = partyInputDTO.title;
        party.description = partyInputDTO.description;
        party.privacy = partyInputDTO.privacy;
        party.partyData = partyInputDTO.partyData;
        partyInputDTO.photos.forEach((photo) => party.photos.push(photo));
        await party.save();
        return PartyMapper.toPartyOutputDTO(party, user);
    }
}

export default new PartyService();