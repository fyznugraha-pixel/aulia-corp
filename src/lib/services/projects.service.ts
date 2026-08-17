import { prisma } from '../db';
import { ProjectCategory } from '@prisma/client';

export async function getProjects() {
  return await prisma.project.findMany({
    orderBy: { order: 'asc' },
  });
}

export async function getFeaturedProjects() {
  return await prisma.project.findMany({
    where: { isFeatured: true },
    orderBy: { order: 'asc' },
  });
}

export async function createProject(data: any) {
  if (typeof data.order === 'number') {
    await prisma.project.updateMany({
      where: { order: { gte: data.order } },
      data: { order: { increment: 1 } }
    });
  }
  return await prisma.project.create({
    data,
  });
}

export async function updateProject(id: string, data: any) {
  if (typeof data.order === 'number') {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (existing && existing.order !== data.order) {
      await prisma.project.updateMany({
        where: { order: { gte: data.order } },
        data: { order: { increment: 1 } }
      });
    }
  }
  return await prisma.project.update({
    where: { id },
    data,
  });
}

export async function deleteProject(id: string) {
  return await prisma.project.delete({
    where: { id },
  });
}
