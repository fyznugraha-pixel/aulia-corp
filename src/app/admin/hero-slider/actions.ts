'use server';

import { createHeroSlide, updateHeroSlide, deleteHeroSlide } from '@/lib/services/hero.service';
import { uploadImage, deleteImage } from '@/lib/upload';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';

export async function saveHeroSlideAction(prevState: any, formData: FormData) {
  const id = formData.get('id') as string | null;
  const imageFile = formData.get('imageFile') as File;
  
  const rawData: any = {
    title: formData.get('title') || null,
    order: Number(formData.get('order') || 0),
    isActive: formData.get('isActive') === 'on',
  };

  try {
    if (imageFile && imageFile.size > 0) {
      rawData.imageUrl = await uploadImage(imageFile);
    } else {
      rawData.imageUrl = formData.get('imageUrl');
    }

    if (!rawData.imageUrl) {
      return { error: 'Image is required' };
    }

    if (id) {
      const old = await prisma.heroSlider.findUnique({ where: { id }});
      if (old && imageFile && imageFile.size > 0 && old.imageUrl !== rawData.imageUrl) {
        await deleteImage(old.imageUrl).catch(console.error);
      }
      await updateHeroSlide(id, rawData);
    } else {
      await createHeroSlide(rawData);
    }
    
    revalidatePath('/');
    revalidatePath('/admin/hero-slider');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to save slide' };
  }
}

export async function deleteHeroSlideAction(id: string) {
  try {
    const old = await prisma.heroSlider.findUnique({ where: { id }});
    if (old) {
      await deleteImage(old.imageUrl).catch(console.error);
    }
    await deleteHeroSlide(id);
    revalidatePath('/');
    revalidatePath('/admin/hero-slider');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete slide' };
  }
}
