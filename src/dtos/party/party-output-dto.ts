import UserOutputDTO from "../user/user-output-dto"

type PartyOutputDTO = {
    id: string,
    title: string,
    description: string,
    privacy: boolean,
    partyData: Date,
    photos: Array<string>,
    owner: UserOutputDTO
}

export default PartyOutputDTO;