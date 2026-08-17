import { prisma } from '../db';
import { EventVideo } from '@prisma/client';

export async function getVideos() {
  return prisma.eventVideo.findMany({
    orderBy: {
      order: 'asc'
    }
  });
}

export async function createVideo(data: Omit<EventVideo, 'id' | 'createdAt' | 'updatedAt'>) {
  if (data.isFeatured) {
    await prisma.eventVideo.updateMany({
      where: { isFeatured: true },
      data: { isFeatured: false }
    });
  }
  return prisma.eventVideo.create({
    data
  });
}

export async function updateVideo(id: string, data: Partial<Omit<EventVideo, 'id' | 'createdAt' | 'updatedAt'>>) {
  if (data.isFeatured) {
    await prisma.eventVideo.updateMany({
      where: { id: { not: id }, isFeatured: true },
      data: { isFeatured: false }
    });
  }
  return prisma.eventVideo.update({
    where: { id },
    data
  });
}

export async function deleteVideo(id: string) {
  return prisma.eventVideo.delete({
    where: { id }
  });
}
