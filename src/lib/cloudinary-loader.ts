export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // If the src is already a full Cloudinary URL, extract the path and apply transformations
  const cloudinaryBase = 'https://res.cloudinary.com/';
  if (src.startsWith(cloudinaryBase)) {
    // Insert transformation parameters after the cloud name and upload path
    // URL format: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{public_id}
    const withoutBase = src.slice(cloudinaryBase.length);
    const parts = withoutBase.split('/');
    const cloudName = parts[0];
    const resourceType = parts[1]; // e.g. "image"
    const deliveryType = parts[2]; // e.g. "upload"
    const rest = parts.slice(3).join('/');

    const params = [`w_${width}`, `q_${quality ?? 75}`, 'f_auto'];
    return `${cloudinaryBase}${cloudName}/${resourceType}/${deliveryType}/${params.join(',')}/${rest}`;
  }

  // Fallback: return src as-is (not a Cloudinary URL)
  return src;
}
