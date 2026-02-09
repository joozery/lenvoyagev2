import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGallery extends Document {
    title?: string;
    description?: string;
    imageUrl: string;
    publicId: string;
    type: 'image' | 'video';
    category?: string;
    isVisible: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const GallerySchema: Schema = new Schema(
    {
        title: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        imageUrl: {
            type: String,
            required: [true, 'Image URL is required'],
        },
        publicId: {
            type: String,
            required: [true, 'Public ID is required'],
        },
        type: {
            type: String,
            enum: ['image', 'video'],
            default: 'image',
        },
        category: {
            type: String,
            trim: true,
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

// Index for faster queries
GallerySchema.index({ type: 1, isVisible: 1, createdAt: -1 });
GallerySchema.index({ category: 1 });
GallerySchema.index({ order: 1 });

const Gallery: Model<IGallery> = mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);

export default Gallery;
