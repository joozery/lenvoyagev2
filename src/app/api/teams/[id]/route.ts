import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Team from '@/models/Team';
import { verifyRequest } from '@/lib/auth';
import { deleteFile } from '@/lib/cloudinary';

// GET single team member
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const teamMember = await Team.findById(id);

        if (!teamMember) {
            return NextResponse.json(
                { error: 'Team member not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: teamMember },
            { status: 200 }
        );
    } catch (error) {
        console.error('GET /api/teams/[id] error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch team member' },
            { status: 500 }
        );
    }
}

// PUT update team member
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

        const teamMember = await Team.findById(id);
        if (!teamMember) {
            return NextResponse.json(
                { error: 'Team member not found' },
                { status: 404 }
            );
        }

        // If avatar is being updated and old avatar exists, delete it
        if (body.avatar && teamMember.avatar?.publicId && teamMember.avatar.publicId !== body.avatar.publicId) {
            try {
                await deleteFile(teamMember.avatar.publicId, 'image');
            } catch (deleteError) {
                console.error('Failed to delete old avatar:', deleteError);
            }
        }

        // Update fields
        Object.assign(teamMember, {
            name: body.name ?? teamMember.name,
            role: body.role ?? teamMember.role,
            bio: body.bio !== undefined ? body.bio : teamMember.bio,
            avatar: body.avatar !== undefined ? body.avatar : teamMember.avatar,
            email: body.email !== undefined ? body.email : teamMember.email,
            socialLinks: body.socialLinks !== undefined ? body.socialLinks : teamMember.socialLinks,
            order: body.order !== undefined ? body.order : teamMember.order,
            isVisible: body.isVisible !== undefined ? body.isVisible : teamMember.isVisible,
        });

        await teamMember.save();

        return NextResponse.json(
            { success: true, data: teamMember },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('PUT /api/teams/[id] error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to update team member' },
            { status: 500 }
        );
    }
}

// DELETE team member
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

        const teamMember = await Team.findById(id);
        if (!teamMember) {
            return NextResponse.json(
                { error: 'Team member not found' },
                { status: 404 }
            );
        }

        // Delete avatar from Cloudinary if exists
        if (teamMember.avatar?.publicId) {
            try {
                await deleteFile(teamMember.avatar.publicId, 'image');
            } catch (deleteError) {
                console.error('Failed to delete avatar:', deleteError);
            }
        }

        await Team.findByIdAndDelete(id);

        return NextResponse.json(
            { success: true, message: 'Team member deleted successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('DELETE /api/teams/[id] error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to delete team member' },
            { status: 500 }
        );
    }
}
