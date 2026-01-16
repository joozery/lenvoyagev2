import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Partner from '@/models/Partner';
import { verifyRequest } from '@/lib/auth';
import { deleteFile } from '@/lib/cloudinary';

// GET single partner
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;
        const partner = await Partner.findById(id);

        if (!partner) {
            return NextResponse.json(
                { error: 'Partner not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: partner },
            { status: 200 }
        );
    } catch (error) {
        console.error('Get partner error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch partner' },
            { status: 500 }
        );
    }
}

// PUT update partner
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
        const { name, website, logo, isVisible, order } = body;

        const partner = await Partner.findById(id);

        if (!partner) {
            return NextResponse.json(
                { error: 'Partner not found' },
                { status: 404 }
            );
        }

        // Update fields
        if (name) partner.name = name;
        if (website !== undefined) partner.website = website;
        if (logo) partner.logo = logo;
        if (isVisible !== undefined) partner.isVisible = isVisible;
        if (order !== undefined) partner.order = order;

        await partner.save();

        return NextResponse.json(
            { success: true, data: partner },
            { status: 200 }
        );
    } catch (error) {
        console.error('Update partner error:', error);
        return NextResponse.json(
            { error: 'Failed to update partner' },
            { status: 500 }
        );
    }
}

// DELETE partner
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
        const partner = await Partner.findById(id);

        if (!partner) {
            return NextResponse.json(
                { error: 'Partner not found' },
                { status: 404 }
            );
        }

        // Delete logo from Cloudinary
        if (partner.logo?.publicId) {
            await deleteFile(partner.logo.publicId, 'image');
        }

        await Partner.findByIdAndDelete(id);

        return NextResponse.json(
            { success: true, message: 'Partner deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Delete partner error:', error);
        return NextResponse.json(
            { error: 'Failed to delete partner' },
            { status: 500 }
        );
    }
}
