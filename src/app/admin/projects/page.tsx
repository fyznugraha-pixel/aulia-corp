import { getProjects } from '@/lib/services/projects.service';
import { getSiteSettings } from '@/lib/services/settings.service';
import { ProjectManager } from './ProjectManager';

export default async function ProjectsPage() {
  const [projects, settings] = await Promise.all([
    getProjects(),
    getSiteSettings()
  ]);

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
      <ProjectManager 
        initialProjects={projects} 
        categories={settings?.projectCategories || ['MICE', 'EXHIBITION', 'BRANDING', 'FILM']} 
      />
    </div>
  );
}
