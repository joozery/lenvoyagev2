import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISettings extends Document {
    facebookUrl: string;
    lineUrl: string;
    phoneNumber?: string;
    email?: string;
    updatedAt: Date;
}

const SettingsSchema: Schema = new Schema(
    {
        facebookUrl: {
            type: String,
            default: '',
        },
        lineUrl: {
            type: String,
            default: '',
        },
        phoneNumber: {
            type: String,
            default: '',
        },
        email: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

const Settings: Model<ISettings> = mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);

export default Settings;
