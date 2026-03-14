import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tour from '@/models/Tour';
import { verifyRequest } from '@/lib/auth';
import { fixAuthenticatedPDFUrl } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';


// GET all tours
export async function GET() {
    try {
        await connectDB();

        const tours = await Tour.find({}).sort({ createdAt: -1 });

        // Fix authenticated PDF URLs (regenerate signed URLs for expired ones)
        const toursWithFreshUrls = tours.map((tour: any) => {
            const tourObj = tour.toObject();
            if (tourObj.pdf?.url && tourObj.pdf?.publicId) {
                const fixedUrl = fixAuthenticatedPDFUrl(tourObj.pdf.url, tourObj.pdf.publicId);
                if (fixedUrl) {
                    tourObj.pdf.url = fixedUrl;
                }
            }
            return tourObj;
        });

        return NextResponse.json(
            { success: true, data: toursWithFreshUrls },
            { status: 200 }
        );
    } catch (error) {
        console.error('Get tours error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch tours' },
            { status: 500 }
        );
    }
}

// POST create new tour
export async function POST(request: NextRequest) {
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

        const body = await request.json();
        const { name, location, price, duration, tourDate, startDate, endDate, seatsAvailable, status, image, pdf } = body;

        // Validation
        if (!name || !location || !price || !duration || !tourDate || !seatsAvailable || !image) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create tour
        const tour = await Tour.create({
            name,
            location,
            price,
            duration,
            tourDate,
            startDate,
            endDate,
            seatsAvailable,
            status: status || 'ร่าง',
            image,
            pdf,
        });

        return NextResponse.json(
            { success: true, data: tour },
            { status: 201 }
        );
    } catch (error) {
        console.error('Create tour error:', error);
        return NextResponse.json(
            { error: 'Failed to create tour' },
            { status: 500 }
        );
    }
}
