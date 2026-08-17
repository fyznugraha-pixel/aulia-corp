'use client';

import { useState, useActionState, useEffect } from 'react';
import { Testimonial } from '@prisma/client';
import { SlideOver } from '@/components/admin/SlideOver';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { saveTestimonialAction, deleteTestimonialAction } from './actions';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { ImageCropper } from '@/components/admin/ImageCropper';

export function TestimonialManager({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [croppedPhoto, setCroppedPhoto] = useState<File | null>(null);
  
  const [state, formAction, isPending] = useActionState(saveTestimonialAction, null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (croppedPhoto) {
      formData.set('photoFile', croppedPhoto);
    }
    
    const file = formData.get('photoFile') as File;
    
    if (file && file.size > 0) {
      setIsCompressing(true);
    }
    
    // @ts-ignore
    formAction(formData);
  };

  useEffect(() => {
    if (state?.success) {
      setIsSlideOverOpen(false);
      setEditingTestimonial(null);
      setIsCompressing(false);
      setCroppedPhoto(null);
    }
    if (state?.error) {
      setIsCompressing(false);
    }
  }, [state]);

  const handleEdit = (t: Testimonial) => {
    setEditingTestimonial(t);
    setCroppedPhoto(null);
    setIsSlideOverOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteConfirmId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmId) {
      await deleteTestimonialAction(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="p-4 border-b border-slate-200 flex justify-end">
        <button onClick={() => { setEditingTestimonial(null); setCroppedPhoto(null); setIsSlideOverOpen(true); }} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Photo</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Rating</th>
              <th className="px-6 py-4 max-w-xs">Quote</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {initialTestimonials.map(t => (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="w-10 h-10 relative rounded-full overflow-hidden bg-slate-200">
                    {(t as any).photo && <Image src={(t as any).photo} alt={t.name} fill className="object-cover" />}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">{t.name}</td>
                <td className="px-6 py-4 text-slate-600">{t.role}</td>
                <td className="px-6 py-4">{t.rating}/5</td>
                <td className="px-6 py-4 text-slate-500 truncate max-w-xs">{t.quote}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleEdit(t)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg mr-2"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(t.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SlideOver isOpen={isSlideOverOpen} onClose={() => setIsSlideOverOpen(false)} title={editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}>
        <div className="relative">
          {(isCompressing || isPending) && (
            <div className="absolute inset-0 z-50 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg border border-slate-200">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
              <p className="text-sm font-semibold text-slate-800">
                {isCompressing ? 'Uploading Image...' : 'Saving to Database...'}
              </p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {state?.error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">{state.error}</div>}
            {editingTestimonial && <input type="hidden" name="id" value={editingTestimonial.id} />}
            {editingTestimonial && <input type="hidden" name="photo" value={(editingTestimonial as any).photo || ''} />}

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">person</span>
                Profil Pengulas
              </h3>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nama Lengkap</label>
                <input type="text" name="name" defaultValue={editingTestimonial?.name} required className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none placeholder:text-slate-400 text-slate-700" placeholder="Misal: Budi Santoso" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Jabatan / Perusahaan</label>
                <input type="text" name="role" defaultValue={editingTestimonial?.role} required className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none placeholder:text-slate-400 text-slate-700" placeholder="Misal: CEO PT Maju Bersama" />
              </div>

              <div>
                <ImageCropper 
                  label="Foto Profil (Bisa digeser & dicrop)"
                  aspect={1} // Square for profile photos
                  defaultPreview={(editingTestimonial as any)?.photo}
                  onCropComplete={setCroppedPhoto}
                />
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">rate_review</span>
                Ulasan
              </h3>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Rating (1-5)</label>
                <input type="number" name="rating" min="1" max="5" defaultValue={editingTestimonial?.rating || 5} required className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kutipan Ulasan</label>
                <textarea name="quote" defaultValue={editingTestimonial?.quote} required rows={4} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none placeholder:text-slate-400 text-slate-700" placeholder="Tuliskan testimoni di sini..." />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Urutan Tampil (Opsional)</label>
                <input type="number" name="order" defaultValue={editingTestimonial?.order || 0} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700" />
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
                    SIMPAN TESTIMONI
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
        onConfirm={handleConfirmDelete}
        title="Delete Testimonial"
        message="Are you sure you want to delete this testimonial? This action cannot be undone."
        confirmText="Delete"
        isDestructive={true}
      />
    </div>
  );
}
