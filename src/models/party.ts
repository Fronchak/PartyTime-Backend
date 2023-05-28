import { Schema, model, Types } from 'mongoose';

export interface IParty {
    title: string,
    description: string,
    partyData: Date,
    privacy: boolean,
    photos: Array<string>,
    userId: Types.ObjectId
}

const Party = model<IParty>('Parties', new Schema<IParty>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    partyData: {
        type: Date,
        required: true
    },
    privacy: {
        type: Boolean,
        required: true
    },
    photos: {
        type: [String],
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }
}));

export default Party;