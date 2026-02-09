import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { verifyRequest } from '@/lib/auth';

// GET all contacts (admin only)
export async function GET(request: NextRequest) {
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

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const limit = parseInt(searchParams.get('limit') || '100');
        const skip = parseInt(searchParams.get('skip') || '0');

        // Build query
        const query: any = {};
        if (status) {
            query.status = status;
        }

        const contacts = await Contact.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);

        const total = await Contact.countDocuments(query);

        return NextResponse.json(
            {
                success: true,
                data: contacts,
                total,
                limit,
                skip,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Get contacts error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch contacts' },
            { status: 500 }
        );
    }
}

// POST create new contact (public)
export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const { name, email, phone, subject, message } = body;

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Create contact
        const contact = await Contact.create({
            name,
            email,
            phone: phone || undefined,
            subject: subject || undefined,
            message,
            status: 'new',
        });

        return NextResponse.json(
            {
                success: true,
                data: contact,
                message: 'Contact message submitted successfully',
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Create contact error:', error);
        return NextResponse.json(
            { error: 'Failed to submit contact message' },
            { status: 500 }
        );
    }
}
