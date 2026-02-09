import { NextRequest, NextResponse } from 'next/server';
import { getSignedPDFUrl } from '@/lib/cloudinary';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import r2Client from '@/lib/r2';
import fs from 'fs';
import path from 'path';

/**
 * Proxy route to serve PDF with proper headers for inline display
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        let fileUrl = searchParams.get('url');
        const publicId = searchParams.get('publicId');

        if (!fileUrl) {
            return NextResponse.json({ error: 'Missing URL parameter' }, { status: 400 });
        }

        // Handle R2 files (either by URL or publicId)
        if (fileUrl.includes('r2.cloudflarestorage.com') || (publicId && publicId.startsWith('r2-pdfs/'))) {
            try {
                const key = publicId && publicId.startsWith('r2-pdfs/')
                    ? publicId.replace('r2-pdfs/', 'pdfs/')
                    : fileUrl.split('.com/')[1];

                const command = new GetObjectCommand({
                    Bucket: process.env.R2_BUCKET_NAME,
                    Key: key,
                });

                const { Body } = await r2Client.send(command);
                if (Body) {
                    const arrayBuffer = await Body.transformToByteArray();
                    return new NextResponse(Buffer.from(arrayBuffer), {
                        headers: {
                            'Content-Type': 'application/pdf',
                            'Content-Disposition': 'inline; filename="tour.pdf"',
                            'Cache-Control': 'public, max-age=3600',
                            'Access-Control-Allow-Origin': '*',
                        },
                    });
                }
            } catch (r2Error) {
                console.error('Error fetching from R2:', r2Error);
            }
        }

        // Handle local files (legacy)
        if (fileUrl.startsWith('/uploads/')) {
            try {
                const filePath = path.join(process.cwd(), 'public', fileUrl);
                if (fs.existsSync(filePath)) {
                    const buffer = fs.readFileSync(filePath);
                    return new NextResponse(buffer, {
                        headers: {
                            'Content-Type': 'application/pdf',
                            'Content-Disposition': 'inline; filename="tour.pdf"',
                            'Cache-Control': 'public, max-age=3600',
                            'Access-Control-Allow-Origin': '*',
                        },
                    });
                }
            } catch (localError) {
                console.error('Error serving local PDF:', localError);
                // Fall back to normal fetch (though it will likely fail for relative URLs)
            }
        }

        // If PDF is authenticated type and we have publicId, generate signed URL
        if (publicId && (fileUrl.includes('/authenticated/') || fileUrl.includes('?_a='))) {
            try {
                fileUrl = getSignedPDFUrl(publicId);
                console.log('Generated signed URL for authenticated PDF:', fileUrl);
            } catch (signError) {
                console.error('Error generating signed URL:', signError);
                // Continue with original URL if signing fails
            }
        }

        console.log('Fetching PDF from:', fileUrl);

        // Fetch PDF from Cloudinary with proper error handling
        let response;
        try {
            response = await fetch(fileUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0',
                    'Accept': 'application/pdf,application/octet-stream,*/*',
                },
            });
        } catch (fetchError) {
            console.error('Fetch error:', fetchError);
            return NextResponse.json(
                { error: 'Failed to fetch PDF from Cloudinary', details: fetchError instanceof Error ? fetchError.message : 'Unknown error' },
                { status: 500 }
            );
        }

        if (!response.ok) {
            console.error('PDF fetch failed:', response.status, response.statusText, 'for URL:', fileUrl);

            // If 401 and we have publicId, try generating signed URL
            if (response.status === 401 && publicId) {
                console.log('Got 401, attempting to retry with signed URL for publicId:', publicId);

                // Try 'upload' type first (for public but restricted files)
                try {
                    const signedUrlUpload = getSignedPDFUrl(publicId, 'upload');
                    console.log('Retrying with signed upload URL:', signedUrlUpload);
                    const retryResponseUpload = await fetch(signedUrlUpload);

                    if (retryResponseUpload.ok) {
                        console.log('Successfully fetched with signed upload URL');
                        const arrayBuffer = await retryResponseUpload.arrayBuffer();
                        const buffer = Buffer.from(arrayBuffer);
                        return new NextResponse(buffer, {
                            headers: {
                                'Content-Type': 'application/pdf',
                                'Content-Disposition': 'inline; filename="tour.pdf"',
                                'Cache-Control': 'public, max-age=3600',
                            },
                        });
                    }
                    console.warn('Signed upload URL also failed:', retryResponseUpload.status);
                } catch (retryError) {
                    console.error('Retry with signed upload URL error:', retryError);
                }

                // Try 'authenticated' type next
                try {
                    const signedUrlAuth = getSignedPDFUrl(publicId, 'authenticated');
                    console.log('Retrying with signed authenticated URL:', signedUrlAuth);
                    const retryResponseAuth = await fetch(signedUrlAuth);

                    if (retryResponseAuth.ok) {
                        console.log('Successfully fetched with signed authenticated URL');
                        const arrayBuffer = await retryResponseAuth.arrayBuffer();
                        const buffer = Buffer.from(arrayBuffer);
                        return new NextResponse(buffer, {
                            headers: {
                                'Content-Type': 'application/pdf',
                                'Content-Disposition': 'inline; filename="tour.pdf"',
                                'Cache-Control': 'public, max-age=3600',
                            },
                        });
                    }
                    console.warn('Signed authenticated URL also failed:', retryResponseAuth.status);
                } catch (retryError) {
                    console.error('Retry with signed authenticated URL error:', retryError);
                }
            }

            return NextResponse.json(
                { error: `Failed to fetch PDF: ${response.status} ${response.statusText}` },
                { status: response.status }
            );
        }

        // Get PDF as array buffer
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Return PDF with headers that force inline display
        return new NextResponse(buffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename="tour.pdf"', // Force browser to display PDF
                'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
                'Access-Control-Allow-Origin': '*', // Allow CORS
            },
        });
    } catch (error) {
        console.error('PDF Proxy Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            { error: 'Error loading PDF', details: errorMessage },
            { status: 500 }
        );
    }
}
