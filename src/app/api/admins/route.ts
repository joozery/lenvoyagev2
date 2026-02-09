import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { verifyRequest } from '@/lib/auth';
import { hashPassword } from '@/lib/auth';

// GET all admins
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

        const admins = await Admin.find({}).select('-passwordHash').sort({ createdAt: -1 });

        return NextResponse.json(
            { success: true, data: admins },
            { status: 200 }
        );
    } catch (error) {
        console.error('Get admins error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch admins' },
            { status: 500 }
        );
    }
}

// POST create new admin
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
        const { username, email, password, role } = body;

        // Validation
        if (!username || !email || !password) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({
            $or: [{ username }, { email }]
        });

        if (existingAdmin) {
            return NextResponse.json(
                { error: 'Username or email already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const passwordHash = await hashPassword(password);

        // Create admin
        const admin = await Admin.create({
            username,
            email,
            passwordHash,
            role: role || 'admin',
        });

        // Return without password hash
        const { passwordHash: _, ...adminData } = admin.toObject();

        return NextResponse.json(
            { success: true, data: adminData },
            { status: 201 }
        );
    } catch (error) {
        console.error('Create admin error:', error);
        return NextResponse.json(
            { error: 'Failed to create admin' },
            { status: 500 }
        );
    }
}
