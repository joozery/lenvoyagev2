import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { verifyRequest } from '@/lib/auth';

// GET single contact (admin only)
export async function GET(
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
        const contact = await Contact.findById(id);

        if (!contact) {
            return NextResponse.json(
                { error: 'Contact not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: contact },
            { status: 200 }
        );
    } catch (error) {
        console.error('Get contact error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch contact' },
            { status: 500 }
        );
    }
}

// PUT update contact (admin only)
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
        const { status } = body;

        const contact = await Contact.findById(id);

        if (!contact) {
            return NextResponse.json(
                { error: 'Contact not found' },
                { status: 404 }
            );
        }

        // Update status if provided
        if (status && ['new', 'read', 'replied', 'archived'].includes(status)) {
            contact.status = status;
            await contact.save();
        }

        return NextResponse.json(
            { success: true, data: contact },
            { status: 200 }
        );
    } catch (error) {
        console.error('Update contact error:', error);
        return NextResponse.json(
            { error: 'Failed to update contact' },
            { status: 500 }
        );
    }
}

// DELETE contact (admin only)
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
        const contact = await Contact.findByIdAndDelete(id);

        if (!contact) {
            return NextResponse.json(
                { error: 'Contact not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Contact deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Delete contact error:', error);
        return NextResponse.json(
            { error: 'Failed to delete contact' },
            { status: 500 }
        );
    }
}
