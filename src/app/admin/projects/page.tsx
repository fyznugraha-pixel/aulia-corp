import { getProjects } from '@/lib/services/projects.service';
import { ProjectManager } from './ProjectManager';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <header className="sticky top-0 right-0 w-full h-16 bg-background border-b border-outline-variant flex justify-between items-center px-container-padding z-10">
        <h1 className="font-display-lg text-title-lg font-bold text-on-background tracking-tight">Projects</h1>
        <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline flex items-center justify-center">
          <span className="material-symbols-outlined text-[16px] text-on-surface-variant">person</span>
        </div>
      </header>
      <div className="p-8 w-full">
        <ProjectManager initialProjects={projects} />
      </div>
    </>
  );
}
