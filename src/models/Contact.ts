import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContact extends Document {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    status: 'new' | 'read' | 'replied' | 'archived';
    createdAt: Date;
    updatedAt: Date;
}

const ContactSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        subject: {
            type: String,
            trim: true,
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            trim: true,
        },
        status: {
            type: String,
            enum: ['new', 'read', 'replied', 'archived'],
            default: 'new',
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
ContactSchema.index({ status: 1, createdAt: -1 });
ContactSchema.index({ email: 1 });

const Contact: Model<IContact> = mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

export default Contact;
