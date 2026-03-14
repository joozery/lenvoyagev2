import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Settings from '@/models/Settings';
import { verifyRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET settings
export async function GET() {
    try {
        await connectDB();
        let settings = await Settings.findOne({});

        if (!settings) {
            // Create default settings if not exists
            settings = await Settings.create({
                facebookUrl: '',
                lineUrl: '',
            });
        }

        return NextResponse.json(
            { success: true, data: settings },
            { status: 200 }
        );
    } catch (error) {
        console.error('Get settings error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch settings' },
            { status: 500 }
        );
    }
}

// PUT update settings
export async function PUT(request: NextRequest) {
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
        const { facebookUrl, lineUrl, phoneNumber, email } = body;

        let settings = await Settings.findOne({});

        if (!settings) {
            settings = new Settings({});
        }

        if (facebookUrl !== undefined) settings.facebookUrl = facebookUrl;
        if (lineUrl !== undefined) settings.lineUrl = lineUrl;
        if (phoneNumber !== undefined) settings.phoneNumber = phoneNumber;
        if (email !== undefined) settings.email = email;

        await settings.save();

        return NextResponse.json(
            { success: true, data: settings },
            { status: 200 }
        );
    } catch (error) {
        console.error('Update settings error:', error);
        return NextResponse.json(
            { error: 'Failed to update settings' },
            { status: 500 }
        );
    }
}
