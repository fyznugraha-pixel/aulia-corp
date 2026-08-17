import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { getSiteSettings } from '@/lib/services/settings.service';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { ProjectGallery } from '@/components/public/ProjectGallery';

export const revalidate = 0;

export default async function ProjectDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const project = await prisma.project.findUnique({
    where: { id: params.id },
  });

  if (!project) {
    notFound();
  }

  const settings = await getSiteSettings();

  return (
    <div className="dark min-h-screen flex flex-col bg-background">
      <Navbar ctaText={settings?.ctaText} />
      
      <main className="flex-grow pt-24 pb-section-gap">
        <article className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          
          <div className="flex flex-col gap-6 mb-12">
            <Link href="/#portfolio" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-tertiary transition-colors font-label-md uppercase tracking-wider text-xs w-fit">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Kembali ke Portfolio
            </Link>
            
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-sm text-xs font-bold uppercase tracking-wider border border-outline-variant/30">{project.category}</span>
                <span className="text-on-surface-variant/70 font-label-md">•</span>
                <span className="text-on-surface-variant/70 font-label-md">{project.year} {project.city ? `- ${project.city}` : ''}</span>
              </div>
              <h1 className="font-display-xl text-display-md md:text-display-lg text-on-background font-black tracking-tighter uppercase leading-tight mt-4">
                {project.title}
              </h1>
            </div>
          </div>

          {project.coverImage && project.coverImage !== '[PLACEHOLDER]' && (
            <div className="w-full aspect-video relative rounded-md overflow-hidden bg-surface-container mb-16 border border-outline-variant/20">
              <Image 
                src={project.coverImage} 
                alt={project.title} 
                fill 
                className="object-cover" 
                priority
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24">
            <div className="lg:col-span-4">
              <div className="sticky top-32 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-px bg-tertiary"></div>
                  <h3 className="font-display-lg text-headline-sm text-on-background font-black tracking-tighter uppercase">Project Info</h3>
                </div>
                
                <div className="flex flex-col gap-4 bg-surface-container-low p-6 rounded-xl border border-outline-variant/20">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Kategori</span>
                    <span className="text-on-background font-medium">{project.category}</span>
                  </div>
                  <div className="w-full h-px bg-outline-variant/10"></div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Tahun</span>
                    <span className="text-on-background font-medium">{project.year}</span>
                  </div>
                  {project.city && (
                    <>
                      <div className="w-full h-px bg-outline-variant/10"></div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Lokasi</span>
                        <span className="text-on-background font-medium">{project.city}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-8 flex flex-col gap-12 pt-2 lg:pt-14">
              {project.shortDesc && project.shortDesc !== '[PLACEHOLDER]' && (
                <p className="font-body-lg text-xl md:text-2xl text-on-background leading-relaxed font-medium">
                  {project.shortDesc}
                </p>
              )}
              
              {project.fullDesc && project.fullDesc !== '[PLACEHOLDER]' && (
                <div className="prose prose-invert prose-lg max-w-none prose-p:text-on-background/70 prose-headings:text-on-background prose-headings:font-display-lg prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase">
                  {project.fullDesc.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-6 font-body-lg leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {project.gallery && project.gallery.length > 0 && (
            <div className="flex flex-col gap-8 w-full">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-px bg-tertiary"></div>
                <h3 className="font-display-lg text-headline-md text-on-background font-black tracking-tighter uppercase">Gallery</h3>
              </div>
              
              <div className="-mx-margin-mobile md:-mx-margin-desktop">
                <ProjectGallery images={project.gallery} title={project.title} />
              </div>
            </div>
          )}
          
        </article>
      </main>

      {settings && <Footer settings={settings} />}
    </div>
  );
}
