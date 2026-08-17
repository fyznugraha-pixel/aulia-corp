'use client';

import { useState, useActionState, useEffect, startTransition } from 'react';
import { updateSettingsAction } from './actions';
import { ImageCropper } from '@/components/admin/ImageCropper';
import { Loader2 } from 'lucide-react';

export function SettingsForm({ initialData }: { initialData: any }) {
  const [state, formAction, isPending] = useActionState(updateSettingsAction, null);
  const [croppedAboutImage, setCroppedAboutImage] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isAboutImageRemoved, setIsAboutImageRemoved] = useState(false);
  
  const [categories, setCategories] = useState<string[]>(initialData.projectCategories || ["MICE", "EXHIBITION", "BRANDING", "FILM"]);
  const [newCat, setNewCat] = useState('');

  const handleAddCategory = () => {
    if (newCat.trim() && !categories.includes(newCat.trim())) {
      setCategories([...categories, newCat.trim()]);
      setNewCat('');
    }
  };

  const handleRemoveCategory = (cat: string) => {
    setCategories(categories.filter(c => c !== cat));
  };

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
    
    startTransition(() => {
      // @ts-ignore
      formAction(formData);
    });
  };

  const TABS = [
    { id: 'hero', label: 'Hero Section', icon: 'home' },
    { id: 'about', label: 'Tentang Kami', icon: 'info' },
    { id: 'contact', label: 'Kontak', icon: 'contact_page' },
    { id: 'social', label: 'Sosial Media', icon: 'share' },
    { id: 'event', label: 'Kategori Event', icon: 'category' }
  ];

  const [activeTab, setActiveTab] = useState('hero');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Top Navbar / Tabs */}
      <div className="border-b border-slate-200 bg-slate-50 px-2 flex overflow-x-auto hide-scrollbar">
        {TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-5 md:p-6">
        <input type="hidden" name="removeAboutImage" value={croppedAboutImage === null && isAboutImageRemoved ? 'true' : 'false'} />
        
        {state?.success && (
          <div className="p-4 mb-6 rounded-lg bg-green-50 text-green-700 text-sm font-medium border border-green-200 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            {state.message}
          </div>
        )}
        {state?.error && (
          <div className="p-4 mb-6 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-200 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">error</span>
            {state.error}
          </div>
        )}

        {/* Tab Content: Hero */}
        <div className={activeTab === 'hero' ? 'block space-y-5' : 'hidden'}>
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">home</span>
              Beranda Utama
            </h3>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Hero Headline</label>
              <textarea 
                name="heroHeadline" 
                defaultValue={initialData.heroHeadline}
                rows={2}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Hero Subheadline</label>
              <textarea 
                name="heroSubheadline" 
                defaultValue={initialData.heroSubheadline}
                rows={2}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Years Active</label>
                <input 
                  type="number" 
                  name="yearsActive" 
                  defaultValue={initialData.yearsActive}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">CTA Text</label>
                <input 
                  type="text" 
                  name="ctaText" 
                  defaultValue={initialData.ctaText}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content: About */}
        <div className={activeTab === 'about' ? 'block space-y-5' : 'hidden'}>
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">info</span>
              Tentang Kami
            </h3>
            
            <div className="mb-6">
              <ImageCropper 
                label="Foto Profil Perusahaan (Bisa digeser & dicrop)"
                aspect={1}
                defaultPreview={initialData.aboutImage}
                onCropComplete={(f) => { setCroppedAboutImage(f); setIsAboutImageRemoved(false); }}
                removable={true}
                onRemove={() => setIsAboutImageRemoved(true)}
              />
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Judul (Headline)</label>
                <input type="text" name="aboutHeadline" defaultValue={initialData.aboutHeadline} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Deskripsi Lengkap</label>
                <textarea name="aboutDescription" defaultValue={initialData.aboutDescription} rows={5} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content: Contact */}
        <div className={activeTab === 'contact' ? 'block space-y-5' : 'hidden'}>
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">contact_page</span>
              Informasi Kontak
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Alamat Email</label>
                <input type="email" name="contactEmail" defaultValue={initialData.contactEmail} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nomor Telepon (Kantor)</label>
                <input type="text" name="contactPhone" defaultValue={initialData.contactPhone} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nomor WhatsApp (misal: 628...)</label>
                <input type="text" name="contactWhatsapp" defaultValue={initialData.contactWhatsapp} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Alamat Lengkap</label>
                <textarea name="contactAddress" defaultValue={initialData.contactAddress} rows={3} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content: Social */}
        <div className={activeTab === 'social' ? 'block space-y-5' : 'hidden'}>
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">share</span>
              Tautan Sosial Media
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-pink-600">photo_camera</span> Instagram
                </label>
                <input type="url" name="socialInstagram" defaultValue={initialData.socialInstagram || ''} placeholder="https://instagram.com/..." className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-blue-600">thumb_up</span> Facebook
                </label>
                <input type="url" name="socialFacebook" defaultValue={initialData.socialFacebook || ''} placeholder="https://facebook.com/..." className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-black">music_note</span> TikTok
                </label>
                <input type="url" name="socialTiktok" defaultValue={initialData.socialTiktok || ''} placeholder="https://tiktok.com/..." className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-red-600">play_circle</span> YouTube
                </label>
                <input type="url" name="socialYoutube" defaultValue={initialData.socialYoutube || ''} placeholder="https://youtube.com/..." className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content: Kategori Event */}
        <div className={activeTab === 'event' ? 'block space-y-5' : 'hidden'}>
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">category</span>
              Kelola Kategori Event
            </h3>
            
            <input type="hidden" name="projectCategories" value={JSON.stringify(categories)} />

            <div className="flex gap-2">
              <input 
                type="text" 
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); handleAddCategory(); } }}
                placeholder="Tambah kategori baru..." 
                className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              />
              <button 
                type="button" 
                onClick={handleAddCategory}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Tambah
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map(cat => (
                <div key={cat} className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-full text-sm font-medium text-slate-700">
                  {cat}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveCategory(cat)}
                    className="text-slate-400 hover:text-red-500 flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              ))}
              {categories.length === 0 && (
                <span className="text-sm text-slate-500 italic">Belum ada kategori. Harap tambahkan minimal 1.</span>
              )}
            </div>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-slate-200 flex justify-end">
          <button 
            type="submit" 
            formNoValidate
            disabled={isPending || isCompressing}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 shadow-md shadow-blue-500/20 flex items-center gap-2"
          >
            {(isPending || isCompressing) ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {isCompressing ? 'MENGUNGGAH FOTO...' : 'MENYIMPAN...'}
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">save</span>
                SIMPAN PENGATURAN
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
