import { getProjects } from '@/lib/services/projects.service';
import { ProjectManager } from './ProjectManager';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
      <ProjectManager initialProjects={projects} />
    </div>
  );
}
