'use server';

import { createVideo, updateVideo, deleteVideo } from '@/lib/services/videos.service';
import { eventVideoSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';

export async function saveVideoAction(prevState: any, formData: FormData) {
  const id = formData.get('id') as string | null;
  
  const rawData = {
    title: formData.get('title'),
    youtubeUrl: formData.get('youtubeUrl'),
    order: formData.get('order'),
    isFeatured: formData.get('isFeatured') === 'on',
  };

  const result = eventVideoSchema.safeParse(rawData);

  if (!result.success) {
    return { error: 'Invalid input data', details: result.error.flatten().fieldErrors };
  }

  try {
    if (id) {
      await updateVideo(id, result.data);
    } else {
      await createVideo(result.data);
    }
    revalidatePath('/');
    revalidatePath('/admin/videos');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to save video' };
  }
}

export async function deleteVideoAction(id: string) {
  try {
    await deleteVideo(id);
    revalidatePath('/');
    revalidatePath('/admin/videos');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete video' };
  }
}
