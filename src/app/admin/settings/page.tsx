import { getSiteSettings } from '@/lib/services/settings.service';
import { SettingsForm } from './SettingsForm';

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  if (!settings) {
    return <div>Settings not found. Please run the seed script.</div>;
  }

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 md:p-6 border-b border-slate-200 bg-slate-50">
          <h2 className="text-lg md:text-xl font-bold text-slate-800">Site Settings</h2>
        </div>
        <div className="p-6 md:p-8">
          <SettingsForm initialData={settings} />
        </div>
      </div>
    </div>
  );
}
