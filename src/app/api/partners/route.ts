import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Partner from '@/models/Partner';
import { verifyRequest } from '@/lib/auth';

// GET all partners
export async function GET() {
    try {
        await connectDB();

        const partners = await Partner.find({}).sort({ order: 1, createdAt: -1 });

        return NextResponse.json(
            { success: true, data: partners },
            { status: 200 }
        );
    } catch (error) {
        console.error('Get partners error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch partners' },
            { status: 500 }
        );
    }
}

// POST create new partner
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
        const { name, website, logo, isVisible, order } = body;

        // Validation
        if (!name || !logo) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create partner
        const partner = await Partner.create({
            name,
            website,
            logo,
            isVisible: isVisible !== undefined ? isVisible : true,
            order: order || 0,
        });

        return NextResponse.json(
            { success: true, data: partner },
            { status: 201 }
        );
    } catch (error) {
        console.error('Create partner error:', error);
        return NextResponse.json(
            { error: 'Failed to create partner' },
            { status: 500 }
        );
    }
}
