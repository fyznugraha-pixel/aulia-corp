import { getTeamMembers } from '@/lib/services/team.service';
import { TeamManager } from './TeamManager';

export default async function TeamPage() {
  const members = await getTeamMembers();

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
      <TeamManager initialTeam={members} />
    </div>
  );
}
