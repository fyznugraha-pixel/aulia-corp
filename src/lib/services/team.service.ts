import { prisma } from '../db';

export async function getTeamMembers() {
  return await prisma.teamMember.findMany({
    orderBy: { order: 'asc' },
  });
}

export async function createTeamMember(data: any) {
  if (typeof data.order === 'number') {
    await prisma.teamMember.updateMany({
      where: { order: { gte: data.order } },
      data: { order: { increment: 1 } }
    });
  }
  return await prisma.teamMember.create({ data });
}

export async function updateTeamMember(id: string, data: any) {
  if (typeof data.order === 'number') {
    const existing = await prisma.teamMember.findUnique({ where: { id } });
    if (existing && existing.order !== data.order) {
      await prisma.teamMember.updateMany({
        where: { order: { gte: data.order } },
        data: { order: { increment: 1 } }
      });
    }
  }
  return await prisma.teamMember.update({
    where: { id },
    data,
  });
}

export async function deleteTeamMember(id: string) {
  return await prisma.teamMember.delete({
    where: { id },
  });
}
