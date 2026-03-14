import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import Tour from '@/models/Tour';
import { verifyRequest } from '@/lib/auth';
import { deleteFile, fixAuthenticatedPDFUrl } from '@/lib/cloudinary';

// GET single tour
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;
        let tour;

        if (mongoose.Types.ObjectId.isValid(id)) {
            tour = await Tour.findById(id);
        }

        if (!tour) {
            // Decoding the URL parameter properly (it might be double encoded from browser to Next.js API)
            const decodedName = decodeURIComponent(id);
            // Try matching by exact name if not found by ObjectId
            tour = await Tour.findOne({ name: decodedName });
            
            // If still not found, try double decoding just in case it was encoded twice (e.g. %2520 -> %20 -> ' ')
            if (!tour && decodedName !== decodeURIComponent(decodedName)) {
                 tour = await Tour.findOne({ name: decodeURIComponent(decodedName) });
            }
        }

        if (!tour) {
            return NextResponse.json(
                { error: 'Tour not found' },
                { status: 404 }
            );
        }

        // Fix authenticated PDF URL (regenerate signed URL if expired)
        const tourObj = tour.toObject();
        if (tourObj.pdf?.url && tourObj.pdf?.publicId) {
            const fixedUrl = fixAuthenticatedPDFUrl(tourObj.pdf.url, tourObj.pdf.publicId);
            if (fixedUrl) {
                tourObj.pdf.url = fixedUrl;
            }
        }

        return NextResponse.json(
            { success: true, data: tourObj },
            { status: 200 }
        );
    } catch (error) {
        console.error('Get tour error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch tour' },
            { status: 500 }
        );
    }
}

// PUT update tour
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Verify authentication
        const user = verifyRequest(request);
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();

        const { id } = await params;
        const body = await request.json();
        const { name, location, price, duration, tourDate, startDate, endDate, seatsAvailable, status, image, pdf, tripDetails, dailyItinerary } = body;

        const tour = await Tour.findById(id);

        if (!tour) {
            return NextResponse.json(
                { error: 'Tour not found' },
                { status: 404 }
            );
        }

        // Update fields
        if (name) tour.name = name;
        if (location) tour.location = location;
        if (price !== undefined) tour.price = price;
        if (duration) tour.duration = duration;
        if (tourDate) tour.tourDate = tourDate;
        if (startDate) tour.startDate = startDate;
        if (endDate) tour.endDate = endDate;
        if (seatsAvailable !== undefined) tour.seatsAvailable = seatsAvailable;
        if (status) tour.status = status;
        if (image) tour.image = image;
        if (pdf) tour.pdf = pdf;
        if (tripDetails !== undefined) tour.tripDetails = tripDetails;
        if (dailyItinerary !== undefined) tour.dailyItinerary = dailyItinerary;

        await tour.save();

        return NextResponse.json(
            { success: true, data: tour },
            { status: 200 }
        );
    } catch (error) {
        console.error('Update tour error:', error);
        return NextResponse.json(
            { error: 'Failed to update tour' },
            { status: 500 }
        );
    }
}

// DELETE tour
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Verify authentication
        const user = verifyRequest(request);
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();

        const { id } = await params;
        const tour = await Tour.findById(id);

        if (!tour) {
            return NextResponse.json(
                { error: 'Tour not found' },
                { status: 404 }
            );
        }

        // Delete associated files from Cloudinary
        if (tour.image?.publicId) {
            await deleteFile(tour.image.publicId, 'image');
        }
        if (tour.pdf?.publicId) {
            await deleteFile(tour.pdf.publicId, 'raw');
        }

        await Tour.findByIdAndDelete(id);

        return NextResponse.json(
            { success: true, message: 'Tour deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Delete tour error:', error);
        return NextResponse.json(
            { error: 'Failed to delete tour' },
            { status: 500 }
        );
    }
}
