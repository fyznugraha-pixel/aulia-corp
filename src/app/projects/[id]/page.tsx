import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { getSiteSettings } from '@/lib/services/settings.service';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';

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
              <div className="sticky top-32 flex flex-col gap-6">
                <div className="w-12 h-px bg-tertiary"></div>
                <h3 className="font-display-lg text-headline-sm text-on-background font-black tracking-tighter uppercase">Overview</h3>
                <p className="font-body-lg text-on-surface-variant leading-relaxed">
                  {project.shortDesc}
                </p>
              </div>
            </div>
            
            {project.fullDesc && (
              <div className="lg:col-span-8">
                <div className="prose prose-invert prose-lg max-w-none prose-p:text-on-background/80 prose-headings:text-on-background prose-headings:font-display-lg prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase">
                  {project.fullDesc.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-6 font-body-lg leading-relaxed text-on-surface-variant">{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {project.gallery && project.gallery.length > 0 && (
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-px bg-tertiary"></div>
                <h3 className="font-display-lg text-headline-md text-on-background font-black tracking-tighter uppercase">Gallery</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {project.gallery.map((imgUrl, i) => (
                  <div key={i} className="aspect-square relative rounded-md overflow-hidden bg-surface-container border border-outline-variant/20 group">
                    <Image 
                      src={imgUrl} 
                      alt={`${project.title} Gallery ${i + 1}`} 
                      fill 
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </article>
      </main>

      {settings && <Footer settings={settings} />}
    </div>
  );
}
