import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPartner extends Document {
    name: string;
    website: string;
    logo: {
        url: string;
        publicId: string;
    };
    isVisible: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const PartnerSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Partner name is required'],
            trim: true,
        },
        website: {
            type: String,
            trim: true,
        },
        logo: {
            url: {
                type: String,
                required: [true, 'Logo URL is required'],
            },
            publicId: {
                type: String,
                required: [true, 'Logo public ID is required'],
            },
        },
        isVisible: {
            type: Boolean,
            default: true,
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Index for ordering
PartnerSchema.index({ order: 1, createdAt: -1 });
PartnerSchema.index({ isVisible: 1 });

const Partner: Model<IPartner> = mongoose.models.Partner || mongoose.model<IPartner>('Partner', PartnerSchema);

export default Partner;
