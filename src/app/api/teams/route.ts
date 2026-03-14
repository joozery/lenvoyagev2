import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Team from '@/models/Team';
import { verifyRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET all teams

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const includeInvisible = searchParams.get('includeInvisible') === 'true';

        const query: any = {};
        if (!includeInvisible) {
            query.isVisible = true;
        }

        const teams = await Team.find(query).sort({ order: 1, createdAt: -1 });

        return NextResponse.json(
            { success: true, data: teams },
            { status: 200 }
        );
    } catch (error) {
        console.error('GET /api/teams error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch teams' },
            { status: 500 }
        );
    }
}

// POST create new team member
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

        const teamMember = new Team({
            name: body.name,
            role: body.role,
            bio: body.bio,
            avatar: body.avatar,
            email: body.email,
            socialLinks: body.socialLinks,
            order: body.order || 0,
            isVisible: body.isVisible !== undefined ? body.isVisible : true,
        });

        await teamMember.save();

        return NextResponse.json(
            { success: true, data: teamMember },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('POST /api/teams error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create team member' },
            { status: 500 }
        );
    }
}
