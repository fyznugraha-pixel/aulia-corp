'use server';

import { createTestimonial, updateTestimonial, deleteTestimonial } from '@/lib/services/testimonials.service';
import { testimonialSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';
import { uploadImage } from '@/lib/upload';

export async function saveTestimonialAction(prevState: any, formData: FormData) {
  const id = formData.get('id') as string | null;
  
  let photoUrl = formData.get('photo') as string | null;
  const photoFile = formData.get('photoFile') as File;

  if (photoFile && photoFile.size > 0) {
    try {
      photoUrl = await uploadImage(photoFile);
    } catch (error: any) {
      return { error: error.message || 'Failed to upload photo' };
    }
  }

  const rawData: any = {
    name: formData.get('name'),
    role: formData.get('role'),
    quote: formData.get('quote'),
    rating: formData.get('rating'),
    photo: photoUrl,
    order: formData.get('order'),
  };

  const result = testimonialSchema.safeParse(rawData);

  if (!result.success) {
    return { error: 'Invalid input data' };
  }

  try {
    if (id) {
      await updateTestimonial(id, result.data);
    } else {
      await createTestimonial(result.data);
    }
    revalidatePath('/');
    revalidatePath('/admin/testimonials');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to save testimonial' };
  }
}

export async function deleteTestimonialAction(id: string) {
  try {
    await deleteTestimonial(id);
    revalidatePath('/');
    revalidatePath('/admin/testimonials');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete' };
  }
}
