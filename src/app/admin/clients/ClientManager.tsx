'use client';

import { useState, useActionState, useEffect, startTransition } from 'react';
import { ClientLogo } from '@prisma/client';
import { SlideOver } from '@/components/admin/SlideOver';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { saveClientAction, deleteClientAction } from './actions';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { ImageCropper } from '@/components/admin/ImageCropper';

export function ClientManager({ initialClients }: { initialClients: ClientLogo[] }) {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientLogo | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [croppedLogo, setCroppedLogo] = useState<File | null>(null);
  
  const [state, formAction, isPending] = useActionState(saveClientAction, null);

  useEffect(() => {
    if (state?.success) {
      setIsSlideOverOpen(false);
      setEditingClient(null);
      setCroppedLogo(null);
    }
    if (state) {
      setIsCompressing(false);
    }
  }, [state]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (croppedLogo) {
      formData.set('logoFile', croppedLogo);
    }
    
    const file = formData.get('logoFile') as File;
    if (file && file.size > 0) {
      setIsCompressing(true);
    }
    
    startTransition(() => {
      formAction(formData);
    });
  };

  const handleEdit = (c: ClientLogo) => {
    setEditingClient(c);
    setCroppedLogo(null);
    setIsSlideOverOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteConfirmId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmId) {
      await deleteClientAction(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="p-4 border-b border-slate-200 flex justify-end">
        <button onClick={() => { setEditingClient(null); setCroppedLogo(null); setIsSlideOverOpen(true); }} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          <Plus className="w-4 h-4" /> Add Client Logo
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Logo</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {initialClients.map(c => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="w-20 h-10 relative bg-slate-100 rounded flex items-center justify-center p-1">
                    {c.logoUrl !== '[PLACEHOLDER]' ? (
                      <Image src={c.logoUrl} alt={c.name} fill className="object-contain" />
                    ) : (
                      <span className="text-xs text-slate-400">Placeholder</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">{c.name}</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-slate-100 rounded-md text-xs font-medium text-slate-600">
                    {c.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleEdit(c)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg mr-2"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(c.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SlideOver isOpen={isSlideOverOpen} onClose={() => setIsSlideOverOpen(false)} title={editingClient ? 'Edit Client Logo' : 'Add Client Logo'}>
        <div className="relative">
          {(isCompressing || isPending) && (
            <div className="absolute inset-0 z-50 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg border border-slate-200">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
              <p className="text-sm font-semibold text-slate-800">
                {isCompressing ? 'Uploading Image...' : 'Saving to Database...'}
              </p>
              <p className="text-xs text-slate-500 mt-1 text-center px-4">
                {isCompressing ? 'Sending high-quality photo to server...' : 'Please wait while we update your data.'}
              </p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {state?.error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">{state.error}</div>}
            {editingClient && <input type="hidden" name="id" value={editingClient.id} />}
            {editingClient && <input type="hidden" name="logoUrl" value={editingClient.logoUrl} />}

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">domain</span>
                Informasi Klien
              </h3>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nama Perusahaan/Klien</label>
                <input type="text" name="name" defaultValue={editingClient?.name} required className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none placeholder:text-slate-400 text-slate-700" placeholder="Misal: PT Aulia Kreasindo Utama" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kategori Industri</label>
                <select name="category" defaultValue={editingClient?.category || 'CORPORATE'} required className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700">
                  <option value="GOVERNMENT_BUMN">GOVERNMENT & BUMN</option>
                  <option value="CORPORATE">CORPORATE</option>
                  <option value="OTHERS">OTHERS</option>
                </select>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">image</span>
                Media & Pengaturan
              </h3>
              
              <div>
                <ImageCropper 
                  label="Upload Logo (Bisa digeser & dicrop)"
                  aspect={undefined} // Free crop for logos
                  defaultPreview={editingClient?.logoUrl !== '[PLACEHOLDER]' ? editingClient?.logoUrl : null}
                  onCropComplete={setCroppedLogo}
                  removable={!editingClient}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Urutan Tampil (Opsional)</label>
                <input type="number" name="order" defaultValue={editingClient?.order || 0} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700" />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button type="button" onClick={() => setIsSlideOverOpen(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">Batal</button>
              <button type="submit" disabled={isPending || isCompressing} className="flex-1 px-5 py-2.5 text-sm font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2 transition-all">
                {(isPending || isCompressing) ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isCompressing ? 'MENGUNGGAH LOGO...' : 'MENYIMPAN...'}
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">save</span>
                    SIMPAN KLIEN
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
        title="Delete Client Logo"
        message="Are you sure you want to delete this client logo? This action cannot be undone."
        confirmText="Delete"
        isDestructive={true}
      />
    </div>
  );
}
