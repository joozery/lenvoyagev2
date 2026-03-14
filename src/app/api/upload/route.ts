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
            const key = `pdfs/${fileName}`;

            const command = new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: key,
                Body: buffer,
                ContentType: 'application/pdf',
            });

            await r2Client.send(command);

            // Generate the R2 URL
            // Prefer R2_PUBLIC_DOMAIN if set (e.g., cdn.example.com)
            // Otherwise fallback to the R2.dev URL format if public access is enabled on the bucket
            let r2Url;
            if (process.env.R2_PUBLIC_DOMAIN) {
                r2Url = `${process.env.R2_PUBLIC_DOMAIN}/${key}`;
            } else {
                // Fallback: This might require the bucket to have public access enabled via r2.dev subdomain
                // or be just a placeholder if they haven't set up a domain.
                // Using the account-id.r2.cloudflarestorage.com is for S3 API, not public HTTP access usually.
                // Let's try to construct a potentially valid public URL or keep the internal one if they handle it via proxy.
                // But the user says "upload pdf not working", implying the URL returned isn't usable.
                r2Url = `https://${process.env.R2_BUCKET_NAME}.${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${key}`;
            }

            result = {
                url: r2Url,
                publicId: key,
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
