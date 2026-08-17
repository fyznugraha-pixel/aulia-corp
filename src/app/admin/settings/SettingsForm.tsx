'use client';

import { useState, useActionState, useEffect } from 'react';
import { updateSettingsAction } from './actions';
import { ImageCropper } from '@/components/admin/ImageCropper';
import { Loader2 } from 'lucide-react';

export function SettingsForm({ initialData }: { initialData: any }) {
  const [state, formAction, isPending] = useActionState(updateSettingsAction, null);
  const [croppedAboutImage, setCroppedAboutImage] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isAboutImageRemoved, setIsAboutImageRemoved] = useState(false);

  useEffect(() => {
    if (state) {
      setIsCompressing(false);
      if (state.success) {
        setCroppedAboutImage(null);
        setIsAboutImageRemoved(false);
      }
    }
  }, [state]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (croppedAboutImage) {
      formData.set('aboutImageFile', croppedAboutImage);
    }
    
    const file = formData.get('aboutImageFile') as File;
    if (file && file.size > 0) {
      setIsCompressing(true);
    }
    
    // @ts-ignore
    formAction(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="removeAboutImage" value={croppedAboutImage === null && isAboutImageRemoved ? 'true' : 'false'} />
      {state?.success && (
        <div className="p-4 rounded-lg bg-green-50 text-green-700 text-sm font-medium border border-green-200">
          {state.message}
        </div>
      )}
      {state?.error && (
        <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-200">
          {state.error}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Hero Headline</label>
        <textarea 
          name="heroHeadline" 
          defaultValue={initialData.heroHeadline}
          required 
          rows={3}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Hero Subheadline</label>
        <textarea 
          name="heroSubheadline" 
          defaultValue={initialData.heroSubheadline}
          required 
          rows={3}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Years Active</label>
        <input 
          type="number" 
          name="yearsActive" 
          defaultValue={initialData.yearsActive}
          required 
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">CTA Text</label>
        <input 
          type="text" 
          name="ctaText" 
          defaultValue={initialData.ctaText}
          required 
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="pt-6 border-t border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Tentang Auliacorp Section</h3>
        <div>
          <ImageCropper 
            label="Upload Foto Tentang Kami (Bisa digeser & dicrop)"
            aspect={1} // Assuming square for About section image
            defaultPreview={initialData.aboutImage}
            onCropComplete={(f) => { setCroppedAboutImage(f); setIsAboutImageRemoved(false); }}
            removable={true}
            onRemove={() => setIsAboutImageRemoved(true)}
          />
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">About Section</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">About Headline</label>
            <input type="text" name="aboutHeadline" defaultValue={initialData.aboutHeadline} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">About Description</label>
            <textarea name="aboutDescription" defaultValue={initialData.aboutDescription} required rows={3} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Contact Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
            <input type="email" name="contactEmail" defaultValue={initialData.contactEmail} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
            <input type="text" name="contactPhone" defaultValue={initialData.contactPhone} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">WhatsApp Number (e.g. 628...)</label>
            <input type="text" name="contactWhatsapp" defaultValue={initialData.contactWhatsapp} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Address</label>
            <textarea name="contactAddress" defaultValue={initialData.contactAddress} required rows={2} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Social Media Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Instagram URL</label>
            <input type="url" name="socialInstagram" defaultValue={initialData.socialInstagram || ''} placeholder="https://instagram.com/..." className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Facebook URL</label>
            <input type="url" name="socialFacebook" defaultValue={initialData.socialFacebook || ''} placeholder="https://facebook.com/..." className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">TikTok URL</label>
            <input type="url" name="socialTiktok" defaultValue={initialData.socialTiktok || ''} placeholder="https://tiktok.com/..." className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">YouTube URL</label>
            <input type="url" name="socialYoutube" defaultValue={initialData.socialYoutube || ''} placeholder="https://youtube.com/..." className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-slate-200">
        <button 
          type="submit" 
          disabled={isPending || isCompressing}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 shadow-sm flex items-center gap-2"
        >
          {(isPending || isCompressing) && <Loader2 className="w-4 h-4 animate-spin" />}
          {isCompressing ? 'Uploading Image...' : isPending ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </form>
  );
}
