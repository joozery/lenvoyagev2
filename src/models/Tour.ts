import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITour extends Document {
    name: string;
    location: string;
    price: number;
    duration: string;
    tourDate: string;
    startDate?: Date;
    endDate?: Date;
    seatsAvailable: number;
    status: 'เปิดขาย' | 'เร็วๆนี้' | 'ร่าง';
    image: {
        url: string;
        publicId: string;
    };
    pdf?: {
        url: string;
        publicId: string;
    };
    tripDetails?: string;
    dailyItinerary?: string;
    faqs?: string;
    createdAt: Date;
    updatedAt: Date;
}

const TourSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Tour name is required'],
            trim: true,
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price must be positive'],
        },
        duration: {
            type: String,
            required: [true, 'Duration is required'],
        },
        tourDate: {
            type: String,
            required: [true, 'Tour date is required'],
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        seatsAvailable: {
            type: Number,
            required: [true, 'Seats available is required'],
            min: [0, 'Seats must be non-negative'],
            default: 0,
        },
        status: {
            type: String,
            enum: ['เปิดขาย', 'เร็วๆนี้', 'ร่าง'],
            default: 'ร่าง',
        },
        image: {
            url: {
                type: String,
                required: [true, 'Image URL is required'],
            },
            publicId: {
                type: String,
                required: [true, 'Image public ID is required'],
            },
        },
        pdf: {
            url: String,
            publicId: String,
        },
        tripDetails: {
            type: String,
        },
        dailyItinerary: {
            type: String,
        },
        faqs: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
TourSchema.index({ status: 1, createdAt: -1 });
TourSchema.index({ location: 1 });
TourSchema.index({ tourDate: 1 });

if (mongoose.models.Tour) {
    delete mongoose.models.Tour;
}

const Tour: Model<ITour> = mongoose.model<ITour>('Tour', TourSchema);

export default Tour;
