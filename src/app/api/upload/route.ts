import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';
import cloudinary from '@/lib/cloudinary';
import { verifyRequest } from '@/lib/auth';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import r2Client from '@/lib/r2';

// Increase body size limit for this route (max 100MB has been set in next.config.ts)
export const runtime = 'nodejs';
export const maxDuration = 300; // 5 minutes timeout
export const dynamic = 'force-dynamic';

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

        let result;

        if (type === 'pdf') {
            // Upload PDF to Cloudflare R2 to bypass Cloudinary limits
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;

            const command = new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: `pdfs/${fileName}`,
                Body: buffer,
                ContentType: 'application/pdf',
            });

            await r2Client.send(command);

            // Generate the R2 URL (using the proxy route for consistency and access control)
            const r2Url = `https://${process.env.R2_BUCKET_NAME}.${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/pdfs/${fileName}`;

            result = {
                url: r2Url,
                publicId: `r2-pdfs/${fileName}`,
            };
        } else {
            // Upload image using base64
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;
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
