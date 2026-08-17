'use server';

import { createClient } from '@supabase/supabase-js';
import { writeFile, unlink, mkdir } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseKey.startsWith('[PLACEHOLDER]')) {
    return null; // Return null if not properly configured yet
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });
};

const BUCKET_NAME = 'auliacorp-media';

export async function uploadImage(file: File) {
  const supabase = getSupabaseClient();
  
  // Convert File to Buffer
  const bytes = await file.arrayBuffer();
  const rawBuffer = Buffer.from(bytes);

  // Convert to WebP using Sharp with HIGH quality
  const webpBuffer = await sharp(rawBuffer)
    .webp({ quality: 95, effort: 6 }) // 95 is very high quality, near lossless visually
    .toBuffer();

  const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.webp`;
  
  if (!supabase) {
    // FALLBACK: Local file system upload for development
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      
      // Ensure directory exists
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (err) {
        // ignore if exists
      }
      
      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, webpBuffer);
      
      return `/uploads/${fileName}`; // Return local path URL
    } catch (error) {
      console.error('Failed to save file locally:', error);
      return '[PLACEHOLDER]'; // ultimate fallback
    }
  }

  // Supabase Upload
  try {
    const filePath = `${fileName}`;

    // Use Buffer directly instead of File object which can cause issues in Node.js
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, webpBuffer, {
        contentType: 'image/webp',
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw new Error(`Supabase error: ${error.message || JSON.stringify(error)}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  } catch (error: any) {
    console.error('Failed to upload image:', error);
    throw new Error(error.message || 'Failed to upload image to Supabase Storage');
  }
}

export async function deleteImage(url: string) {
  if (url === '[PLACEHOLDER]') return;

  const supabase = getSupabaseClient();
  
  if (!supabase) {
    // FALLBACK: Delete from local file system
    if (url.startsWith('/uploads/')) {
      try {
        const fileName = url.replace('/uploads/', '');
        const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
        await unlink(filePath);
      } catch (error) {
        console.error('Failed to delete local file:', error);
      }
    }
    return;
  }

  // Supabase delete
  try {
    // Extract file path from public URL
    // Format: https://[project].supabase.co/storage/v1/object/public/[bucket]/[filepath]
    const urlParts = url.split('/');
    const filePath = urlParts[urlParts.length - 1]; // Assuming flat directory structure for now
    
    if (filePath) {
      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([filePath]);

      if (error) {
        console.error('Supabase delete error:', error);
      }
    }
  } catch (error) {
    console.error('Failed to delete image:', error);
  }
}
