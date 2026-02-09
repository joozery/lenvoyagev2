import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';
import { verifyRequest } from '@/lib/auth';

// GET all gallery items (public - only visible items)
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type'); // 'image' or 'video'
        const category = searchParams.get('category');
        const includeInvisible = searchParams.get('includeInvisible') === 'true'; // For admin

        // Build query
        const query: any = {};
        if (type) {
            query.type = type;
        }
        if (category) {
            query.category = category;
        }
        // Public API only shows visible items unless admin requests all
        if (!includeInvisible) {
            query.isVisible = true;
        }

        const gallery = await Gallery.find(query)
            .sort({ order: 1, createdAt: -1 });

        return NextResponse.json(
            {
                success: true,
                data: gallery,
                count: gallery.length,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Get gallery error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch gallery' },
            { status: 500 }
        );
    }
}

// POST create new gallery item (admin only)
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
        const { title, description, imageUrl, publicId, type, category, isVisible, order } = body;

        // Validation
        if (!imageUrl || !publicId) {
            return NextResponse.json(
                { error: 'Image URL and public ID are required' },
                { status: 400 }
            );
        }

        // Create gallery item
        const galleryItem = await Gallery.create({
            title: title || undefined,
            description: description || undefined,
            imageUrl,
            publicId,
            type: type || 'image',
            category: category || undefined,
            isVisible: isVisible !== undefined ? isVisible : true,
            order: order || 0,
        });

        return NextResponse.json(
            { success: true, data: galleryItem },
            { status: 201 }
        );
    } catch (error) {
        console.error('Create gallery error:', error);
        return NextResponse.json(
            { error: 'Failed to create gallery item' },
            { status: 500 }
        );
    }
}
