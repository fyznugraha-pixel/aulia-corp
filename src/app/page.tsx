import { getSiteSettings } from '@/lib/services/settings.service';
import { getProjects, getFeaturedProjects } from '@/lib/services/projects.service';
import { getTeamMembers } from '@/lib/services/team.service';
import { getClientLogos } from '@/lib/services/clients.service';
import { getTestimonials } from '@/lib/services/testimonials.service';
import { getVideos } from '@/lib/services/videos.service';
import { getHeroSlides } from '@/lib/services/hero.service';

import { Navbar } from '@/components/public/Navbar';
import { Hero } from '@/components/public/Hero';
import { TrustBar } from '@/components/public/TrustBar';
import { About } from '@/components/public/About';
import { Services } from '@/components/public/Services';
import { SelectedWork } from '@/components/public/SelectedWork';
import { AllProjects } from '@/components/public/AllProjects';
import { VideoReel } from '@/components/public/VideoReel';
import { Team } from '@/components/public/Team';
import { ClientTrust } from '@/components/public/ClientTrust';
import { Testimonials } from '@/components/public/Testimonials';
import { Footer } from '@/components/public/Footer';

// Revalidate path for dynamic data fetching in Next.js app router 
export const revalidate = 0;

export default async function Home() {
  // Parallel data fetching
  const [
    settings,
    projects,
    featuredProjects,
    teamMembers,
    clientLogos,
    testimonials,
    videos,
    heroSlides
  ] = await Promise.all([
    getSiteSettings(),
    getProjects(),
    getFeaturedProjects(),
    getTeamMembers(),
    getClientLogos(),
    getTestimonials(),
    getVideos(),
    getHeroSlides()
  ]);

  if (!settings) {
    return <div className="p-8 text-center">Settings not found. Please run the seed script.</div>;
  }

  return (
    <div className="dark min-h-screen flex flex-col">
      <Navbar ctaText={settings.ctaText} />
      
      <main className="flex-grow">
        <Hero 
          headline={settings.heroHeadline} 
          subheadline={settings.heroSubheadline} 
          ctaText={settings.ctaText} 
          slides={heroSlides.filter(s => s.isActive)}
        />
        
        <TrustBar years={settings.yearsActive} />
        
        <About 
          aboutImage={settings.aboutImage} 
          aboutHeadline={settings.aboutHeadline}
          aboutDescription={settings.aboutDescription}
        />
        
        <Services />
        
        <SelectedWork projects={featuredProjects} />
        
        <AllProjects projects={projects} />
        
        {videos.length > 0 && <VideoReel videos={videos} />}
        
        <Team members={teamMembers} />
        
        <ClientTrust clients={clientLogos} />
        
        {/* Testimonials positioned after Client Trust area */}
        <Testimonials testimonials={testimonials} />
      </main>

      <Footer settings={settings} />
    </div>
  );
}
