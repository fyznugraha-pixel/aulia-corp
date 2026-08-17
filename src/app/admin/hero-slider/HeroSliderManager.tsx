'use client';

import { useState, useActionState, useEffect, startTransition } from 'react';
import { HeroSlider } from '@prisma/client';
import { SlideOver } from '@/components/admin/SlideOver';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { saveHeroSlideAction, deleteHeroSlideAction } from './actions';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { ImageCropper } from '@/components/admin/ImageCropper';

export function HeroSliderManager({ initialSlides }: { initialSlides: HeroSlider[] }) {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlider | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [state, formAction, isPending] = useActionState(saveHeroSlideAction, null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [croppedImage, setCroppedImage] = useState<File | null>(null);

  useEffect(() => {
    if (state?.success) {
      setIsSlideOverOpen(false);
      setEditingSlide(null);
      setCroppedImage(null);
    }
    if (state) {
      setIsCompressing(false);
    }
  }, [state]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (croppedImage) {
      formData.set('imageFile', croppedImage);
    }
    
    const file = formData.get('imageFile') as File;
    if (file && file.size > 0) {
      setIsCompressing(true);
    }
    
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-5 md:p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50">
        <h2 className="text-lg md:text-xl font-bold text-slate-800">Manage Slider Images</h2>
        <button 
          onClick={() => { setEditingSlide(null); setCroppedImage(null); setIsSlideOverOpen(true); }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Title (Internal)</th>
              <th className="px-6 py-4">Urutan</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {initialSlides.map(s => (
              <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-24 h-16 relative rounded overflow-hidden bg-slate-100 border border-slate-200">
                    <Image src={s.imageUrl} alt={s.title || 'Slider'} fill className="object-cover" />
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">{s.title || '-'}</td>
                <td className="px-6 py-4">{s.order}</td>
                <td className="px-6 py-4">
                  {s.isActive ? (
                    <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-medium border border-green-200">Active</span>
                  ) : (
                    <span className="text-slate-500 bg-slate-100 px-2 py-1 rounded text-xs font-medium border border-slate-200">Hidden</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => { setEditingSlide(s); setCroppedImage(null); setIsSlideOverOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg mr-2 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteConfirmId(s.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {initialSlides.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">No images found. Add some to display on the hero section.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <SlideOver isOpen={isSlideOverOpen} onClose={() => setIsSlideOverOpen(false)} title={editingSlide ? 'Edit Image' : 'Add Image'}>
        <div className="relative">
          {(isCompressing || isPending) && (
            <div className="absolute inset-0 z-50 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg border border-slate-200">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
              <p className="text-sm font-semibold text-slate-800">{isCompressing ? 'Uploading...' : 'Saving...'}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {state?.error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">{state.error}</div>}
            {editingSlide && <input type="hidden" name="id" value={editingSlide.id} />}
            {editingSlide && <input type="hidden" name="imageUrl" value={editingSlide.imageUrl} />}

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">image</span>
                Media Utama
              </h3>
              
              <div>
                <ImageCropper 
                  label="Upload Gambar (Bisa digeser & dicrop)"
                  aspect={16/9} // Hero usually 16:9 or similar
                  defaultPreview={editingSlide?.imageUrl}
                  onCropComplete={setCroppedImage}
                  removable={!editingSlide}
                />
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">settings</span>
                Pengaturan Tampilan
              </h3>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Judul (Catatan Internal)</label>
                <input type="text" name="title" defaultValue={editingSlide?.title || ''} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none placeholder:text-slate-400 text-slate-700" placeholder="Misal: Slider Acara Tahunan" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Urutan (Semakin kecil semakin awal)</label>
                <input type="number" name="order" defaultValue={editingSlide?.order || 0} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700" />
              </div>

              <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Aktifkan Slide</p>
                  <p className="text-xs text-slate-500">Tampilkan gambar ini di beranda</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="isActive" className="sr-only peer" defaultChecked={editingSlide ? editingSlide.isActive : true} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button type="button" onClick={() => setIsSlideOverOpen(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">Batal</button>
              <button type="submit" disabled={isPending || isCompressing} className="flex-1 px-5 py-2.5 text-sm font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2 transition-all">
                {(isPending || isCompressing) ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isCompressing ? 'MENGUNGGAH FOTO...' : 'MENYIMPAN...'}
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">save</span>
                    SIMPAN GAMBAR
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </SlideOver>

      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={async () => {
          if (deleteConfirmId) {
            await deleteHeroSlideAction(deleteConfirmId);
            setDeleteConfirmId(null);
          }
        }}
        title="Delete Image"
        message="Are you sure you want to delete this slider image?"
        confirmText="Delete"
        isDestructive={true}
      />
    </div>
  );
}
