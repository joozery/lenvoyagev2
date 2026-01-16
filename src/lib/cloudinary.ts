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
        // Upload PDF as authenticated raw file
        // This solves the 401 Unauthorized issue on new Cloudinary accounts
        const result = await cloudinary.uploader.upload(file, {
            folder,
            resource_type: 'raw',
            type: 'authenticated', // Mark as authenticated
            format: 'pdf',
        });

        // Generate Signed URL for access
        const signedUrl = cloudinary.url(result.public_id, {
            resource_type: 'raw',
            type: 'authenticated',
            sign_url: true,
            secure: true,
            version: result.version // Add version explicitly
        });

        return {
            url: signedUrl, // Return Signed URL instead of direct URL
            publicId: result.public_id,
        };
    } catch (error) {
        console.error('Cloudinary PDF upload error:', error);
        throw new Error('Failed to upload PDF');
    }
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
