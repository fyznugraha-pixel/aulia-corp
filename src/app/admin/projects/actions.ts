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
  };

  if (coverImageFile && coverImageFile.size > 0) {
    rawData.coverImage = await uploadImage(coverImageFile);
  }

  const result = projectSchema.safeParse(rawData);

  if (!result.success) {
    return { error: 'Invalid input data', details: result.error.flatten().fieldErrors };
  }

  try {
    if (id) {
      // Update
      const existing = await prisma.project.findUnique({ where: { id } });
      if (existing && existing.coverImage !== result.data.coverImage && existing.coverImage !== '[PLACEHOLDER]') {
        await deleteImage(existing.coverImage);
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
    if (existing && existing.coverImage !== '[PLACEHOLDER]') {
      await deleteImage(existing.coverImage);
    }
    await deleteProject(id);
    revalidatePath('/');
    revalidatePath('/admin/projects');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete project' };
  }
}
