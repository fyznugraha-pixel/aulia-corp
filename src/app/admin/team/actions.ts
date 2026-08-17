'use server';

import { createTeamMember, updateTeamMember, deleteTeamMember } from '@/lib/services/team.service';
import { teamMemberSchema } from '@/lib/validations';
import { uploadImage, deleteImage } from '@/lib/upload';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';

export async function saveTeamAction(prevState: any, formData: FormData) {
  const id = formData.get('id') as string | null;
  const photoFile = formData.get('photoFile') as File | null;
  
  const rawData: any = {
    name: formData.get('name'),
    role: formData.get('role'),
    isLeadership: formData.get('isLeadership') === 'on',
    order: formData.get('order'),
    photo: formData.get('photo') || '[PLACEHOLDER]', 
  };

  if (photoFile && photoFile.size > 0) {
    rawData.photo = await uploadImage(photoFile);
  }

  const result = teamMemberSchema.safeParse(rawData);

  if (!result.success) {
    return { error: 'Invalid input data' };
  }

  try {
    if (id) {
      const existing = await prisma.teamMember.findUnique({ where: { id } });
      if (existing && existing.photo !== result.data.photo && existing.photo !== '[PLACEHOLDER]') {
        await deleteImage(existing.photo);
      }
      await updateTeamMember(id, result.data);
    } else {
      await createTeamMember(result.data);
    }
    revalidatePath('/');
    revalidatePath('/admin/team');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to save team member' };
  }
}

export async function deleteTeamAction(id: string) {
  try {
    const existing = await prisma.teamMember.findUnique({ where: { id } });
    if (existing && existing.photo !== '[PLACEHOLDER]') {
      await deleteImage(existing.photo);
    }
    await deleteTeamMember(id);
    revalidatePath('/');
    revalidatePath('/admin/team');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete' };
  }
}
