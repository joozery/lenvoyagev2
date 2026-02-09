import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload image to Cloudinary
 * @param file - Base64 string or file path
 * @param folder - Cloudinary folder name
 * @returns Upload result with URL and public_id
 */
export async function uploadImage(file: string, folder: string = 'lensvoyage') {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder,
            resource_type: 'image',
            transformation: [
                { width: 1200, height: 800, crop: 'limit' },
                { quality: 'auto' },
                { fetch_format: 'auto' }
            ]
        });

        return {
            url: result.secure_url,
            publicId: result.public_id,
        };
    } catch (error) {
        console.error('Cloudinary image upload error:', error);
        throw new Error('Failed to upload image');
    }
}

/**
 * Upload PDF to Cloudinary
 * @param file - Base64 string or file path
 * @param folder - Cloudinary folder name
 * @returns Upload result with URL and public_id
 */
export async function uploadPDF(file: string, folder: string = 'lensvoyage/pdfs') {
    try {
        // Upload PDF as public raw file - use public access mode explicitly
        const result = await cloudinary.uploader.upload(file, {
            folder,
            resource_type: 'raw',
            // Force public access - remove any authentication requirements
            type: 'upload', // Use 'upload' type instead of 'authenticated'
            access_mode: 'public',
            use_filename: true,
            unique_filename: true,
        });

        // Ensure we return secure HTTPS URL
        const pdfUrl = result.secure_url || result.url;

        if (!pdfUrl) {
            throw new Error('Failed to get PDF URL from Cloudinary');
        }

        return {
            url: pdfUrl,
            publicId: result.public_id,
        };
    } catch (error) {
        console.error('Cloudinary PDF upload error:', error);
        throw new Error('Failed to upload PDF');
    }
}

/**
 * Generate signed URL for PDF
 * @param publicId - Cloudinary public_id
 * @param type - Cloudinary delivery type ('upload', 'authenticated', etc.)
 * @returns Signed URL that won't expire immediately
 */
export function getSignedPDFUrl(publicId: string, type: string = 'upload'): string {
    try {
        // Generate fresh signed URL
        const signedUrl = cloudinary.url(publicId, {
            resource_type: 'raw',
            type: type,
            sign_url: true,
            secure: true,
        });

        return signedUrl;
    } catch (error) {
        console.error('Cloudinary signed URL generation error:', error);
        throw new Error('Failed to generate signed URL');
    }
}

/**
 * Check if PDF URL is authenticated type and regenerate if needed
 * @param pdfUrl - PDF URL to check
 * @param publicId - Cloudinary public_id
 * @returns Updated PDF URL (regenerated if authenticated)
 */
export function fixAuthenticatedPDFUrl(pdfUrl: string | undefined, publicId: string | undefined): string | undefined {
    if (!pdfUrl || !publicId) return pdfUrl;

    // Check if URL contains '/authenticated/' which means it's authenticated type
    if (pdfUrl.includes('/authenticated/')) {
        try {
            // Generate fresh signed URL for authenticated resource
            return getSignedPDFUrl(publicId, 'authenticated');
        } catch (error) {
            console.error('Error regenerating PDF URL:', error);
            return pdfUrl; // Return original if error
        }
    }

    return pdfUrl; // Return as-is if not authenticated
}

/**
 * Delete file from Cloudinary
 * @param publicId - Cloudinary public_id
 * @param resourceType - Type of resource (image, raw, video)
 */
export async function deleteFile(publicId: string, resourceType: 'image' | 'raw' | 'video' = 'image') {
    try {
        await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
        console.log(`✅ Deleted file: ${publicId}`);
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        throw new Error('Failed to delete file');
    }
}

export default cloudinary;
