import { prisma } from '../db';

export async function getClientLogos() {
  return await prisma.clientLogo.findMany({
    orderBy: { order: 'asc' },
  });
}

export async function createClientLogo(data: any) {
  if (typeof data.order === 'number') {
    await prisma.clientLogo.updateMany({
      where: { order: { gte: data.order } },
      data: { order: { increment: 1 } }
    });
  }
  return await prisma.clientLogo.create({ data });
}

export async function updateClientLogo(id: string, data: any) {
  if (typeof data.order === 'number') {
    const existing = await prisma.clientLogo.findUnique({ where: { id } });
    if (existing && existing.order !== data.order) {
      await prisma.clientLogo.updateMany({
        where: { order: { gte: data.order } },
        data: { order: { increment: 1 } }
      });
    }
  }
  return await prisma.clientLogo.update({
    where: { id },
    data,
  });
}

export async function deleteClientLogo(id: string) {
  return await prisma.clientLogo.delete({
    where: { id },
  });
}
