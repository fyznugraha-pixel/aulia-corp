'use client';

import { useState, useActionState, useEffect, startTransition } from 'react';
import { TeamMember } from '@prisma/client';
import { SlideOver } from '@/components/admin/SlideOver';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { saveTeamAction, deleteTeamAction } from './actions';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { ImageCropper } from '@/components/admin/ImageCropper';

export function TeamManager({ initialTeam }: { initialTeam: TeamMember[] }) {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [croppedPhoto, setCroppedPhoto] = useState<File | null>(null);
  
  const [state, formAction, isPending] = useActionState(saveTeamAction, null);

  useEffect(() => {
    if (state?.success) {
      setIsSlideOverOpen(false);
      setEditingMember(null);
      setCroppedPhoto(null);
    }
    if (state) {
      setIsCompressing(false);
    }
  }, [state]);

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
    
    startTransition(() => {
      formAction(formData);
    });
  };

  const handleEdit = (m: TeamMember) => {
    setEditingMember(m);
    setCroppedPhoto(null);
    setIsSlideOverOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteConfirmId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmId) {
      await deleteTeamAction(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="p-4 border-b border-slate-200 flex justify-end">
        <button onClick={() => { setEditingMember(null); setCroppedPhoto(null); setIsSlideOverOpen(true); }} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Photo</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Leadership</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {initialTeam.map(m => (
              <tr key={m.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="w-10 h-10 relative rounded-full overflow-hidden bg-slate-200">
                    {m.photo !== '[PLACEHOLDER]' && <Image src={m.photo} alt={m.name} fill className="object-cover" />}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">{m.name}</td>
                <td className="px-6 py-4 text-slate-600">{m.role}</td>
                <td className="px-6 py-4">{m.isLeadership ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleEdit(m)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg mr-2"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(m.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SlideOver isOpen={isSlideOverOpen} onClose={() => setIsSlideOverOpen(false)} title={editingMember ? 'Edit Member' : 'Add Member'}>
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
            {editingMember && <input type="hidden" name="id" value={editingMember.id} />}
            {editingMember && <input type="hidden" name="photo" value={editingMember.photo} />}

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">person</span>
                Data Anggota
              </h3>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nama Lengkap</label>
                <input type="text" name="name" defaultValue={editingMember?.name} required className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none placeholder:text-slate-400 text-slate-700" placeholder="Misal: John Doe" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Posisi / Jabatan</label>
                <input type="text" name="role" defaultValue={editingMember?.role} required className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none placeholder:text-slate-400 text-slate-700" placeholder="Misal: Creative Director" />
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-5">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">badge</span>
                Pengaturan
              </h3>
              
              <div>
                <ImageCropper 
                  label="Foto Profil (Bisa digeser & dicrop)"
                  aspect={1} // Square for profile photos
                  defaultPreview={editingMember?.photo !== '[PLACEHOLDER]' ? editingMember?.photo : null}
                  onCropComplete={setCroppedPhoto}
                  removable={!editingMember}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Tim Inti (Leadership)</p>
                  <p className="text-xs text-slate-500">Tandai jika ini adalah pimpinan/direksi</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="isLeadership" className="sr-only peer" defaultChecked={editingMember?.isLeadership} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Urutan Tampil (Opsional)</label>
                <input type="number" name="order" defaultValue={editingMember?.order || 0} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700" />
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
                    SIMPAN ANGGOTA TIM
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
        title="Delete Team Member"
        message="Are you sure you want to delete this team member? This action cannot be undone."
        confirmText="Delete"
        isDestructive={true}
      />
    </div>
  );
}
