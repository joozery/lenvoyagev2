import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';
import { verifyRequest } from '@/lib/auth';
import { deleteFile } from '@/lib/cloudinary';

// GET single gallery item
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;
        const galleryItem = await Gallery.findById(id);

        if (!galleryItem) {
            return NextResponse.json(
                { error: 'Gallery item not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: galleryItem },
            { status: 200 }
        );
    } catch (error) {
        console.error('Get gallery item error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch gallery item' },
            { status: 500 }
        );
    }
}

// PUT update gallery item (admin only)
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
        const { title, description, imageUrl, publicId, type, category, isVisible, order } = body;

        const galleryItem = await Gallery.findById(id);

        if (!galleryItem) {
            return NextResponse.json(
                { error: 'Gallery item not found' },
                { status: 404 }
            );
        }

        // Update fields
        if (title !== undefined) galleryItem.title = title;
        if (description !== undefined) galleryItem.description = description;
        if (imageUrl) galleryItem.imageUrl = imageUrl;
        if (publicId) galleryItem.publicId = publicId;
        if (type) galleryItem.type = type;
        if (category !== undefined) galleryItem.category = category;
        if (isVisible !== undefined) galleryItem.isVisible = isVisible;
        if (order !== undefined) galleryItem.order = order;

        await galleryItem.save();

        return NextResponse.json(
            { success: true, data: galleryItem },
            { status: 200 }
        );
    } catch (error) {
        console.error('Update gallery item error:', error);
        return NextResponse.json(
            { error: 'Failed to update gallery item' },
            { status: 500 }
        );
    }
}

// DELETE gallery item (admin only)
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
        const galleryItem = await Gallery.findById(id);

        if (!galleryItem) {
            return NextResponse.json(
                { error: 'Gallery item not found' },
                { status: 404 }
            );
        }

        // Delete file from Cloudinary
        if (galleryItem.publicId) {
            const resourceType = galleryItem.type === 'video' ? 'video' : 'image';
            await deleteFile(galleryItem.publicId, resourceType);
        }

        await Gallery.findByIdAndDelete(id);

        return NextResponse.json(
            { success: true, message: 'Gallery item deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Delete gallery item error:', error);
        return NextResponse.json(
            { error: 'Failed to delete gallery item' },
            { status: 500 }
        );
    }
}
