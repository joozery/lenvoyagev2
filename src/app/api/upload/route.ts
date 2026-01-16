import { NextRequest, NextResponse } from 'next/server';
import { uploadImage, uploadPDF } from '@/lib/cloudinary';
import { verifyRequest } from '@/lib/auth';

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

        const formData = await request.formData();
        const file = formData.get('file') as File;
        const type = formData.get('type') as string; // 'image' or 'pdf'

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Convert file to base64
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

        let result;

        if (type === 'pdf') {
            // Upload PDF
            result = await uploadPDF(base64);
        } else {
            // Upload image
            result = await uploadImage(base64);
        }

        return NextResponse.json(
            {
                success: true,
                url: result.url,
                publicId: result.publicId,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Failed to upload file' },
            { status: 500 }
        );
    }
}
