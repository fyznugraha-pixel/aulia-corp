'use server';

import { updateSiteSettings } from '@/lib/services/settings.service';
import { siteSettingsSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';
import { uploadImage } from '@/lib/upload';

export async function updateSettingsAction(prevState: any, formData: FormData) {
  const data: any = {
    heroHeadline: formData.get('heroHeadline'),
    heroSubheadline: formData.get('heroSubheadline'),
    yearsActive: formData.get('yearsActive'),
    ctaText: formData.get('ctaText'),
    aboutHeadline: formData.get('aboutHeadline'),
    aboutDescription: formData.get('aboutDescription'),
    contactEmail: formData.get('contactEmail'),
    contactPhone: formData.get('contactPhone'),
    contactWhatsapp: formData.get('contactWhatsapp'),
    contactAddress: formData.get('contactAddress'),
    socialInstagram: formData.get('socialInstagram') || null,
    socialFacebook: formData.get('socialFacebook') || null,
    socialTiktok: formData.get('socialTiktok') || null,
    socialYoutube: formData.get('socialYoutube') || null,
    projectCategories: formData.get('projectCategories') || '["MICE", "EXHIBITION", "BRANDING", "FILM"]',
  };

  const aboutImageFile = formData.get('aboutImageFile') as File;
  if (aboutImageFile && aboutImageFile.size > 0) {
    try {
      const imageUrl = await uploadImage(aboutImageFile);
      data.aboutImage = imageUrl;
    } catch (error: any) {
      return { error: error.message || 'Failed to upload about image' };
    }
  }

  const result = siteSettingsSchema.safeParse(data);

  if (!result.success) {
    return { error: 'Invalid input data', details: result.error.flatten().fieldErrors };
  }

  const finalData = { ...result.data };
  if (data.aboutImage) {
    (finalData as any).aboutImage = data.aboutImage;
  } else if (formData.get('removeAboutImage') === 'true') {
    (finalData as any).aboutImage = null;
  }

  try {
    await updateSiteSettings(finalData);
    revalidatePath('/'); // Revalidate public homepage
    return { success: true, message: 'Settings updated successfully' };
  } catch (error) {
    return { error: 'Failed to update settings' };
  }
}
