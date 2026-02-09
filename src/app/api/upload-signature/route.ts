import { NextRequest, NextResponse } from 'next/server';
import { verifyRequest } from '@/lib/auth';
import cloudinary from '@/lib/cloudinary';

// Generate Cloudinary upload signature for direct client upload
export const runtime = 'nodejs';
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

        const body = await request.json();
        const { folder = 'lensvoyage', resourceType = 'auto' } = body;

        // Generate timestamp and signature for Cloudinary signed upload
        const timestamp = Math.round(new Date().getTime() / 1000);
        
        // Build all parameters that will be sent to Cloudinary upload
        // Note: resource_type is NOT included in signature because it's in the URL endpoint
        // Parameters must be sorted alphabetically for signature generation
        const paramsToSign: Record<string, any> = {
            access_mode: 'public',
            folder,
            timestamp,
        };

        // Add PDF-specific parameters if needed (must be in alphabetical order)
        if (resourceType === 'raw') {
            paramsToSign.unique_filename = 'true';
            paramsToSign.use_filename = 'true';
        }

        // Generate signature with all parameters
        // Cloudinary.utils.api_sign_request will sort and sign the parameters
        const signature = cloudinary.utils.api_sign_request(
            paramsToSign,
            process.env.CLOUDINARY_API_SECRET!
        );

        return NextResponse.json({
            timestamp,
            signature,
            apiKey: process.env.CLOUDINARY_API_KEY,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            folder,
            resourceType,
        });
    } catch (error) {
        console.error('Upload signature error:', error);
        return NextResponse.json(
            { error: 'Failed to generate upload signature' },
            { status: 500 }
        );
    }
}
