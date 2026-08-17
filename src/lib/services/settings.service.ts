import { prisma } from '../db';

export async function getSiteSettings() {
  return await prisma.siteSettings.findUnique({
    where: { id: 1 },
  });
}

export async function updateSiteSettings(data: any) {
  return await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });
}
