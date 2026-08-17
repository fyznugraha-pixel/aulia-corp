import { getSiteSettings } from '@/lib/services/settings.service';
import { SettingsForm } from './SettingsForm';

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  if (!settings) {
    return <div>Settings not found. Please run the seed script.</div>;
  }

  return (
    <>
      <header className="sticky top-0 right-0 w-full h-16 bg-background border-b border-outline-variant flex justify-between items-center px-container-padding z-10">
        <h1 className="font-display-lg text-title-lg font-bold text-on-background tracking-tight">Site Settings</h1>
        <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline flex items-center justify-center">
          <span className="material-symbols-outlined text-[16px] text-on-surface-variant">person</span>
        </div>
      </header>
      <div className="p-container-padding w-full mx-auto">
        <div className="bg-surface-container-low p-8 rounded border border-outline-variant shadow-sm w-full">
          <SettingsForm initialData={settings} />
        </div>
      </div>
    </>
  );
}
