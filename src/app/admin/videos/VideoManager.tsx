'use client';

import { useState, useActionState, useEffect } from 'react';
import { EventVideo } from '@prisma/client';
import { SlideOver } from '@/components/admin/SlideOver';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { saveVideoAction, deleteVideoAction } from './actions';
import { Plus, Edit2, Trash2, Loader2, Star } from 'lucide-react';

export function VideoManager({ initialVideos }: { initialVideos: EventVideo[] }) {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<EventVideo | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  const [state, formAction, isPending] = useActionState(saveVideoAction, null);

  useEffect(() => {
    if (state?.success) {
      setIsSlideOverOpen(false);
      setEditingVideo(null);
    }
  }, [state]);

  const handleAddNew = () => {
    setEditingVideo(null);
    setIsSlideOverOpen(true);
  };

  const handleEdit = (video: EventVideo) => {
    setEditingVideo(video);
    setIsSlideOverOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteConfirmId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmId) {
      await deleteVideoAction(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <h2 className="text-xl font-bold text-slate-900">Manage Event Videos</h2>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Video
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-100 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">YouTube URL</th>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {initialVideos.map(v => (
              <tr key={v.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  {v.isFeatured ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                      <Star className="w-3 h-3 fill-current" />
                      Featured
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">
                      Standard
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">{v.title}</td>
                <td className="px-6 py-4 text-slate-500 truncate max-w-[200px]">{v.youtubeUrl}</td>
                <td className="px-6 py-4">{v.order}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleEdit(v)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg mr-2"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(v.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {initialVideos.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500 bg-slate-50/50">
                  No videos found. Click "Add Video" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <SlideOver
        isOpen={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        title={editingVideo ? 'Edit Video' : 'Add New Video'}
      >
        <div className="flex flex-col h-full">
          <form action={formAction} className="space-y-6">
            {state?.error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">{state.error}</div>}
            {editingVideo && <input type="hidden" name="id" value={editingVideo.id} />}

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">movie</span>
                Detail Video
              </h3>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Judul Video</label>
                <input type="text" name="title" defaultValue={editingVideo?.title} required className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none placeholder:text-slate-400 text-slate-700" placeholder="Misal: Event Highlight 2023" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">URL YouTube</label>
                <input type="url" name="youtubeUrl" defaultValue={editingVideo?.youtubeUrl} required placeholder="https://youtube.com/watch?v=..." className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none placeholder:text-slate-400 text-slate-700" />
                <p className="mt-1 text-xs text-slate-500">Masukkan link utuh dari YouTube</p>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">tune</span>
                Pengaturan
              </h3>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Urutan Tampil (Opsional)</label>
                <input type="number" name="order" defaultValue={editingVideo?.order || 0} required className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700" />
                <p className="mt-1 text-xs text-slate-500">Menentukan urutan video di halaman utama.</p>
              </div>

              <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg mt-2">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Jadikan Featured Video</p>
                  <p className="text-xs text-slate-500">Tampil besar di posisi utama (Maks 1 video)</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="isFeatured" className="sr-only peer" defaultChecked={editingVideo?.isFeatured} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button type="button" onClick={() => setIsSlideOverOpen(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">Batal</button>
              <button type="submit" disabled={isPending} className="flex-1 px-5 py-2.5 text-sm font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2 transition-all">
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    MENYIMPAN...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">save</span>
                    SIMPAN VIDEO
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
        title="Delete Video"
        message="Are you sure you want to delete this video? This action cannot be undone."
        confirmText="Delete"
        isDestructive={true}
      />
    </div>
  );
}
