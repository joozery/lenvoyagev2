import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-this';

/**
 * Generate JWT token
 * @param payload - Data to encode in token
 * @param expiresIn - Token expiration time
 * @returns JWT token string
 */
export function generateToken(payload: object, expiresIn: string = '7d'): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Verify JWT token
 * @param token - JWT token string
 * @returns Decoded payload or null if invalid
 */
export function verifyToken(token: string): any {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        console.error('JWT verification error:', error);
        return null;
    }
}

/**
 * Hash password using bcrypt
 * @param password - Plain text password
 * @returns Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

/**
 * Compare password with hash
 * @param password - Plain text password
 * @param hash - Hashed password
 * @returns True if password matches
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

/**
 * Extract token from request headers
 * @param request - Next.js request object
 * @returns Token string or null
 */
export function getTokenFromRequest(request: NextRequest): string | null {
    const authHeader = request.headers.get('authorization');

    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }

    // Also check cookies as fallback
    const tokenFromCookie = request.cookies.get('admin_token')?.value;
    return tokenFromCookie || null;
}

/**
 * Verify request is authenticated
 * @param request - Next.js request object
 * @returns Decoded user data or null
 */
export function verifyRequest(request: NextRequest): any {
    const token = getTokenFromRequest(request);

    if (!token) {
        return null;
    }

    return verifyToken(token);
}
