import { Document, Types } from "mongoose";
import { IParty } from "../models/party";
import { IUser } from "../models/user";
import PartyOutputDTO from "../dtos/party/party-output-dto";
import UserMapper from "./user-mapper";
import SimplePartyOutputDTO from "../dtos/party/simple-party-output-dto";

class PartyMapper {
    public static toPartyOutputDTO(
        party: Document<unknown, {}, IParty> & Omit<IParty & {
                _id: Types.ObjectId;
            }, never>,
        user: Document<unknown, {}, IUser> & Omit<IUser & {
            _id: Types.ObjectId;
        }, never>): PartyOutputDTO {
        return {
            id: party._id.toString(),
            title: party.title,
            description: party.description,
            privacy: party.privacy,
            partyData: party.partyData,
            photos: party.photos,
            owner: UserMapper.toUserDTO(user)
        }
    }

    public static toSimpleParties(parties: (Document<unknown, {}, IParty> & Omit<IParty & {
        _id: Types.ObjectId;
    }, never>)[]): Array<SimplePartyOutputDTO> {
        return parties.map((party) => ({
            id: party._id.toString(),
            title: party.title,
            partyData: party.partyData,
            photo: party.photos[0]
        }));
    }
}

export default PartyMapper;
