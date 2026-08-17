import { getSiteSettings } from '@/lib/services/settings.service';
import { SettingsForm } from './SettingsForm';

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  if (!settings) {
    return <div>Settings not found. Please run the seed script.</div>;
  }

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Site Settings</h2>
        <p className="text-slate-500 text-sm mt-1">Kelola informasi dan pengaturan utama website Anda.</p>
      </div>
      <SettingsForm initialData={settings} />
    </div>
  );
}
