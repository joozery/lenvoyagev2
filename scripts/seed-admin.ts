/**
 * Seed script to create initial admin user
 * Run with: node --loader ts-node/esm scripts/seed-admin.ts
 * Or: npx tsx scripts/seed-admin.ts
 */

import mongoose from 'mongoose';
import { hashPassword } from '../src/lib/auth';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://devwooyoujake_db_user:Xd5Oo68hCVYWH4Z7@lensvoyage.th52jz4.mongodb.net/?appName=lensvoyage';
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'lensvoyage';

// Admin schema (inline for seed script)
const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'super-admin'], default: 'admin' },
    lastLogin: Date,
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function seedAdmin() {
    try {
        console.log('🌱 Starting admin seed...');

        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI, {
            dbName: MONGODB_DB_NAME,
        });
        console.log('✅ Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username: 'admin' });

        if (existingAdmin) {
            console.log('⚠️  Admin user already exists');
            await mongoose.connection.close();
            return;
        }

        // Hash password
        const passwordHash = await hashPassword('password');

        // Create admin user
        const admin = await Admin.create({
            username: 'admin',
            email: 'admin@lensvoyage.com',
            passwordHash,
            role: 'super-admin',
        });

        console.log('✅ Admin user created successfully:');
        console.log('   Username: admin');
        console.log('   Password: password');
        console.log('   Email: admin@lensvoyage.com');
        console.log('   Role: super-admin');
        console.log('   ID:', admin._id);

        await mongoose.connection.close();
        console.log('✅ Seed completed');
    } catch (error) {
        console.error('❌ Seed error:', error);
        process.exit(1);
    }
}

seedAdmin();
