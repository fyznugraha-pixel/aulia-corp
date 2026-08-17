import { Sidebar } from '@/components/admin/Sidebar';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-background text-on-background font-body-md">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen ml-[260px] pb-12">
        {children}
      </div>
    </div>
  );
}
