const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. SiteSettings
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      heroHeadline: 'Memberikan pelayanan terbaik bagi semua klien dengan mengedepankan inovasi dan kreativitas',
      heroSubheadline: 'A corporate creative team for MICE, gathering, company branding, and creative film & documentation.',
      yearsActive: 15,
      ctaText: 'Konsultasi Gratis',
    },
  });

  // 2. AdminUser
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.adminUser.upsert({
    where: { email: 'admin@auliacorp.com' },
    update: {},
    create: {
      email: 'admin@auliacorp.com',
      passwordHash,
    },
  });

  // 3. Projects
  const projectsData = [
    {
      title: 'Festival Cisadane',
      category: 'MICE',
      year: 2024,
      city: 'Kota Tangerang',
      shortDesc: '[PLACEHOLDER]',
      fullDesc: '[PLACEHOLDER]',
      coverImage: '[PLACEHOLDER]',
      isFeatured: true,
      order: 1,
    },
    {
      title: 'Asia Afrika Festival 2025',
      category: 'EXHIBITION',
      year: 2025,
      city: 'Kota Bandung',
      shortDesc: '[PLACEHOLDER]',
      fullDesc: '[PLACEHOLDER]',
      coverImage: '[PLACEHOLDER]',
      isFeatured: true,
      order: 2,
    },
    {
      title: 'Akselerasi Ekspor Kreasi Indonesia',
      category: 'BRANDING',
      year: 2024,
      city: 'EKRAF',
      shortDesc: '[PLACEHOLDER]',
      fullDesc: '[PLACEHOLDER]',
      coverImage: '[PLACEHOLDER]',
      isFeatured: true,
      order: 3,
    },
    {
      title: 'Bandung Great Sale 2025',
      category: 'EXHIBITION',
      year: 2025,
      city: 'Kota Bandung',
      shortDesc: '[PLACEHOLDER]',
      fullDesc: '[PLACEHOLDER]',
      coverImage: '[PLACEHOLDER]',
      isFeatured: false,
      order: 4,
    },
    {
      title: 'Inkubasi Kuliner',
      category: 'FILM',
      year: 2024,
      city: 'After Movie',
      shortDesc: '[PLACEHOLDER]',
      fullDesc: '[PLACEHOLDER]',
      coverImage: '[PLACEHOLDER]',
      isFeatured: false,
      order: 5,
    },
  ];

  for (const p of projectsData) {
    const existing = await prisma.project.findFirst({ where: { title: p.title } });
    if (!existing) {
      await prisma.project.create({ data: p });
    }
  }

  // 4. TeamMembers
  const teamMembersData = [
    { name: 'Haikal Aulia R', role: 'Founder / CEO', isLeadership: true },
    { name: 'Fitriana', role: 'CFO / Finance Director', isLeadership: true },
    { name: 'Arfi SN', role: 'COO', isLeadership: true },
    { name: 'Faishal Aulia Z', role: 'Project Manager', isLeadership: false },
    { name: 'Silvia Annisa', role: 'Marketing', isLeadership: false },
    { name: 'Devina Dianka', role: 'Admin Project', isLeadership: false },
    { name: 'Dina Rochani', role: 'Finance & Tax', isLeadership: false },
    { name: 'Ezra Al Ghifari Y.', role: 'Creative Designer', isLeadership: false },
    { name: 'M Aulia Raudha', role: 'Creative', isLeadership: false },
    { name: 'Difa Farhan', role: 'Creative', isLeadership: false },
    { name: 'Guan Iting', role: 'Camera Person', isLeadership: false },
    { name: 'Nufty Ibrahim', role: 'Camera Person', isLeadership: false },
    { name: 'Andri Abot', role: 'Creative', isLeadership: false },
    { name: 'Fadhil Ibnu Fauzan', role: 'Staff Project', isLeadership: false },
  ];

  for (let i = 0; i < teamMembersData.length; i++) {
    const member = teamMembersData[i];
    const existing = await prisma.teamMember.findFirst({ where: { name: member.name } });
    if (!existing) {
      await prisma.teamMember.create({
        data: {
          ...member,
          photo: '[PLACEHOLDER]',
          order: i + 1,
        },
      });
    }
  }

  // 5. Testimonials
  const testimonialsData = [
    { name: 'Veneradella', role: 'Client', quote: '[PLACEHOLDER]' },
    { name: 'Norman Ismail', role: 'Client', quote: '[PLACEHOLDER]' },
    { name: 'Adita', role: 'Client', quote: '[PLACEHOLDER]' },
    { name: 'Nadya Yulia', role: 'Event Partner', quote: 'Exceptional service and attention to detail.' },
  ];

  for (let i = 0; i < testimonialsData.length; i++) {
    const t = testimonialsData[i];
    const existing = await prisma.testimonial.findFirst({ where: { name: t.name } });
    if (!existing) {
      await prisma.testimonial.create({
        data: {
          ...t,
          order: i + 1,
        },
      });
    }
  }

  // 6. ClientLogo categories placeholder seed
  // The user asked to seed with empty/placeholder logos for now, categories only
  const clientLogosData = [
    { name: 'Client Gov 1', logoUrl: '[PLACEHOLDER]', category: 'GOVERNMENT_BUMN' },
    { name: 'Client Corp 1', logoUrl: '[PLACEHOLDER]', category: 'CORPORATE' },
    { name: 'Client Others 1', logoUrl: '[PLACEHOLDER]', category: 'OTHERS' },
  ];

  for (let i = 0; i < clientLogosData.length; i++) {
    const c = clientLogosData[i];
    const existing = await prisma.clientLogo.findFirst({ where: { name: c.name } });
    if (!existing) {
      await prisma.clientLogo.create({
        data: {
          ...c,
          order: i + 1,
        },
      });
    }
  }

  console.log('Seed completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
