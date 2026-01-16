import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { verifyRequest, hashPassword } from '@/lib/auth';

// GET single admin
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
        const admin = await Admin.findById(id).select('-passwordHash');

        if (!admin) {
            return NextResponse.json(
                { error: 'Admin not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: admin },
            { status: 200 }
        );
    } catch (error) {
        console.error('Get admin error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch admin' },
            { status: 500 }
        );
    }
}

// PUT update admin
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
        const { username, email, password, role } = body;

        const admin = await Admin.findById(id);

        if (!admin) {
            return NextResponse.json(
                { error: 'Admin not found' },
                { status: 404 }
            );
        }

        // Update fields
        if (username) admin.username = username;
        if (email) admin.email = email;
        if (role) admin.role = role;

        // Update password if provided
        if (password) {
            admin.passwordHash = await hashPassword(password);
        }

        await admin.save();

        // Return without password hash
        const { passwordHash, ...adminData } = admin.toObject();

        return NextResponse.json(
            { success: true, data: adminData },
            { status: 200 }
        );
    } catch (error) {
        console.error('Update admin error:', error);
        return NextResponse.json(
            { error: 'Failed to update admin' },
            { status: 500 }
        );
    }
}

// DELETE admin
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
        const admin = await Admin.findById(id);

        if (!admin) {
            return NextResponse.json(
                { error: 'Admin not found' },
                { status: 404 }
            );
        }

        // Prevent deleting yourself (optional safety check)
        if (user.id === id) {
            return NextResponse.json(
                { error: 'Cannot delete your own account' },
                { status: 400 }
            );
        }

        await Admin.findByIdAndDelete(id);

        return NextResponse.json(
            { success: true, message: 'Admin deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Delete admin error:', error);
        return NextResponse.json(
            { error: 'Failed to delete admin' },
            { status: 500 }
        );
    }
}
