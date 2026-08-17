import { prisma } from '../db';

export async function getTestimonials() {
  return await prisma.testimonial.findMany({
    orderBy: { order: 'asc' },
  });
}

export async function createTestimonial(data: any) {
  return await prisma.testimonial.create({ data });
}

export async function updateTestimonial(id: string, data: any) {
  return await prisma.testimonial.update({
    where: { id },
    data,
  });
}

export async function deleteTestimonial(id: string) {
  return await prisma.testimonial.delete({
    where: { id },
  });
}
