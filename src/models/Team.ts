import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITeam extends Document {
    name: string;
    role: string;
    bio?: string;
    avatar?: {
        url: string;
        publicId: string;
    };
    email?: string;
    socialLinks?: {
        instagram?: string;
        facebook?: string;
        twitter?: string;
        linkedin?: string;
    };
    order: number;
    isVisible: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TeamSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
            trim: true,
        },
        bio: {
            type: String,
            trim: true,
        },
        avatar: {
            url: {
                type: String,
            },
            publicId: {
                type: String,
            },
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
        },
        socialLinks: {
            instagram: { type: String, trim: true },
            facebook: { type: String, trim: true },
            twitter: { type: String, trim: true },
            linkedin: { type: String, trim: true },
        },
        order: {
            type: Number,
            default: 0,
        },
        isVisible: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

TeamSchema.index({ order: 1, isVisible: 1 });

const Team: Model<ITeam> = mongoose.models.Team || mongoose.model<ITeam>('Team', TeamSchema);

export default Team;
