'use server';

import { createClientLogo, updateClientLogo, deleteClientLogo } from '@/lib/services/clients.service';
import { clientLogoSchema } from '@/lib/validations';
import { uploadImage, deleteImage } from '@/lib/upload';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';

export async function saveClientAction(prevState: any, formData: FormData) {
  const id = formData.get('id') as string | null;
  const logoFile = formData.get('logoFile') as File | null;
  
  const rawData: any = {
    name: formData.get('name'),
    category: formData.get('category'),
    order: formData.get('order'),
    logoUrl: formData.get('logoUrl') || '[PLACEHOLDER]', 
  };

  if (logoFile && logoFile.size > 0) {
    rawData.logoUrl = await uploadImage(logoFile);
  }

  const result = clientLogoSchema.safeParse(rawData);

  if (!result.success) {
    return { error: 'Invalid input data' };
  }

  try {
    if (id) {
      const existing = await prisma.clientLogo.findUnique({ where: { id } });
      if (existing && existing.logoUrl !== result.data.logoUrl && existing.logoUrl !== '[PLACEHOLDER]') {
        await deleteImage(existing.logoUrl);
      }
      await updateClientLogo(id, result.data);
    } else {
      await createClientLogo(result.data);
    }
    revalidatePath('/');
    revalidatePath('/admin/clients');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to save client logo' };
  }
}

export async function deleteClientAction(id: string) {
  try {
    const existing = await prisma.clientLogo.findUnique({ where: { id } });
    if (existing && existing.logoUrl !== '[PLACEHOLDER]') {
      await deleteImage(existing.logoUrl);
    }
    await deleteClientLogo(id);
    revalidatePath('/');
    revalidatePath('/admin/clients');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete' };
  }
}
