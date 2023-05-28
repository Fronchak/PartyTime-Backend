type PartyInputDTO = {
    title: string,
    description: string,
    privacy: boolean,
    partyData: Date,
    photos: Array<string>
}

export default PartyInputDTO;