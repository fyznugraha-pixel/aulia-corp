import { prisma } from '../db';
import { HeroSlider } from '@prisma/client';

export async function getHeroSlides() {
  return prisma.heroSlider.findMany({
    orderBy: {
      order: 'asc'
    }
  });
}

export async function createHeroSlide(data: Omit<HeroSlider, 'id' | 'createdAt' | 'updatedAt'>) {
  return prisma.heroSlider.create({ data });
}

export async function updateHeroSlide(id: string, data: Partial<Omit<HeroSlider, 'id' | 'createdAt' | 'updatedAt'>>) {
  return prisma.heroSlider.update({
    where: { id },
    data
  });
}

export async function deleteHeroSlide(id: string) {
  return prisma.heroSlider.delete({
    where: { id }
  });
}
