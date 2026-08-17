'use server';

import { createProject, updateProject, deleteProject } from '@/lib/services/projects.service';
import { projectSchema } from '@/lib/validations';
import { uploadImage, deleteImage } from '@/lib/upload';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';

export async function saveProjectAction(prevState: any, formData: FormData) {
  const id = formData.get('id') as string | null;
  const coverImageFile = formData.get('coverImageFile') as File | null;
  
  const rawData: any = {
    title: formData.get('title'),
    category: formData.get('category'),
    year: formData.get('year'),
    city: formData.get('city'),
    shortDesc: formData.get('shortDesc'),
    fullDesc: formData.get('fullDesc'),
    isFeatured: formData.get('isFeatured') === 'on',
    order: formData.get('order'),
    coverImage: formData.get('coverImage') || '[PLACEHOLDER]', // fallback
    gallery: [],
  };

  // 1. Parse existing gallery URLs that the user kept
  const existingGalleryStr = formData.get('existingGallery') as string;
  const keptGalleryUrls = existingGalleryStr ? JSON.parse(existingGalleryStr) : [];
  
  // 2. Process new gallery files
  const galleryFiles = formData.getAll('galleryFiles') as File[];
  const newGalleryUrls: string[] = [];

  if (coverImageFile && coverImageFile.size > 0) {
    rawData.coverImage = await uploadImage(coverImageFile);
  }

  // Upload new gallery files in parallel
  const validGalleryFiles = galleryFiles.filter(file => file.size > 0);
  if (validGalleryFiles.length > 0) {
    const uploadPromises = validGalleryFiles.map(file => uploadImage(file));
    const uploadedUrls = await Promise.all(uploadPromises);
    newGalleryUrls.push(...uploadedUrls);
  }

  rawData.gallery = [...keptGalleryUrls, ...newGalleryUrls];

  const result = projectSchema.safeParse(rawData);

  if (!result.success) {
    return { error: 'Invalid input data', details: result.error.flatten().fieldErrors };
  }

  try {
    if (id) {
      // Update
      const existing = await prisma.project.findUnique({ where: { id } });
      if (existing) {
        // Handle cover image deletion
        if (existing.coverImage !== result.data.coverImage && existing.coverImage !== '[PLACEHOLDER]') {
          await deleteImage(existing.coverImage);
        }
        
        // Handle gallery images deletion
        const urlsToDelete = existing.gallery.filter(url => !keptGalleryUrls.includes(url));
        if (urlsToDelete.length > 0) {
          const deletePromises = urlsToDelete.map(url => deleteImage(url));
          await Promise.all(deletePromises);
        }
      }
      await updateProject(id, result.data);
    } else {
      // Create
      await createProject(result.data);
    }
    revalidatePath('/');
    revalidatePath('/admin/projects');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to save project' };
  }
}

export async function deleteProjectAction(id: string) {
  try {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (existing) {
      if (existing.coverImage !== '[PLACEHOLDER]') {
        await deleteImage(existing.coverImage);
      }
      if (existing.gallery && existing.gallery.length > 0) {
        const deletePromises = existing.gallery.map(url => deleteImage(url));
        await Promise.all(deletePromises);
      }
    }
    await deleteProject(id);
    revalidatePath('/');
    revalidatePath('/admin/projects');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete project' };
  }
}
