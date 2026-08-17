'use client';

import { useState, useActionState, useEffect, startTransition } from 'react';
import { Project } from '@prisma/client';
import { SlideOver } from '@/components/admin/SlideOver';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { saveProjectAction, deleteProjectAction } from './actions';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { ImageCropper } from '@/components/admin/ImageCropper';
import { CustomSelect } from '@/components/admin/CustomSelect';

export function ProjectManager({ 
  initialProjects, 
  categories 
}: { 
  initialProjects: Project[];
  categories: string[];
}) {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  const [state, formAction, isPending] = useActionState(saveProjectAction, null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [croppedCoverImage, setCroppedCoverImage] = useState<File | null>(null);

  // Gallery States
  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([]);
  const [newGalleryPreviews, setNewGalleryPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (state?.success) {
      setIsSlideOverOpen(false);
      setEditingProject(null);
      setCroppedCoverImage(null);
      setExistingGallery([]);
      setNewGalleryFiles([]);
      newGalleryPreviews.forEach(URL.revokeObjectURL);
      setNewGalleryPreviews([]);
    }
    // Always reset loading state when action completes (success or error)
    if (state) {
      setIsCompressing(false);
    }
  }, [state]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (croppedCoverImage) {
      formData.set('coverImageFile', croppedCoverImage);
    }
    
    // Add existing gallery URLs
    formData.set('existingGallery', JSON.stringify(existingGallery));
    
    // Add new gallery files
    newGalleryFiles.forEach((file) => {
      formData.append('galleryFiles', file);
    });
    
    const file = formData.get('coverImageFile') as File;
    if ((file && file.size > 0) || newGalleryFiles.length > 0) {
      setIsCompressing(true);
    }
    
    startTransition(() => {
      formAction(formData);
    });
  };

  const handleEdit = (p: Project) => {
    setEditingProject(p);
    setCroppedCoverImage(null);
    setExistingGallery(p.gallery || []);
    setNewGalleryFiles([]);
    newGalleryPreviews.forEach(URL.revokeObjectURL);
    setNewGalleryPreviews([]);
    setIsSlideOverOpen(true);
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setCroppedCoverImage(null);
    setExistingGallery([]);
    setNewGalleryFiles([]);
    newGalleryPreviews.forEach(URL.revokeObjectURL);
    setNewGalleryPreviews([]);
    setIsSlideOverOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteConfirmId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmId) {
      await deleteProjectAction(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const filteredProjects = initialProjects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-5 md:p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50">
        <h2 className="text-lg md:text-xl font-bold text-slate-800">Manage Projects</h2>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input 
            type="text" 
            placeholder="Search..." 
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm flex-1 md:w-64 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            onClick={handleAddNew}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Thumbnail</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Year/City</th>
              <th className="px-6 py-4">Featured</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredProjects.map(p => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-16 h-12 relative rounded-md overflow-hidden bg-slate-100 border border-slate-200">
                    {p.coverImage !== '[PLACEHOLDER]' && (
                      <Image src={p.coverImage} alt={p.title} fill className="object-cover" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">{p.title}</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-slate-100 rounded-md text-xs font-medium text-slate-600">{p.category}</span>
                </td>
                <td className="px-6 py-4 text-slate-500">{p.year} • {p.city || '-'}</td>
                <td className="px-6 py-4">
                  {p.isFeatured ? (
                    <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-medium border border-green-200">Yes</span>
                  ) : (
                    <span className="text-slate-500">No</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleEdit(p)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg mr-2 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SlideOver 
        isOpen={isSlideOverOpen} 
        onClose={() => setIsSlideOverOpen(false)} 
        title={editingProject ? 'Edit Project' : 'Tambah Project'}
      >
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
          
          {editingProject && <input type="hidden" name="id" value={editingProject.id} />}
          {editingProject && <input type="hidden" name="coverImage" value={editingProject.coverImage} />}

          {/* Group: Basic Info */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">info</span>
              Informasi Utama
            </h3>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Judul Proyek</label>
              <input type="text" name="title" defaultValue={editingProject?.title} required className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none placeholder:text-slate-400 text-slate-700" placeholder="Misal: Annual Gathering 2023" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kategori</label>
              <CustomSelect 
                name="category" 
                defaultValue={editingProject?.category || categories[0] || 'MICE'} 
                required 
                options={categories.map(cat => ({ label: cat, value: cat }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tahun</label>
                <input type="number" name="year" defaultValue={editingProject?.year || new Date().getFullYear()} required className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kota</label>
                <input type="text" name="city" defaultValue={editingProject?.city || ''} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none placeholder:text-slate-400 text-slate-700" placeholder="Misal: Jakarta" />
              </div>
            </div>
          </div>

          {/* Group: Descriptions */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">description</span>
              Deskripsi
            </h3>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Deskripsi Singkat</label>
              <textarea name="shortDesc" defaultValue={editingProject?.shortDesc} required rows={2} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none placeholder:text-slate-400 text-slate-700" placeholder="Ringkasan singkat proyek..." />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Deskripsi Lengkap (Opsional)</label>
              <textarea name="fullDesc" defaultValue={editingProject?.fullDesc || ''} rows={4} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none placeholder:text-slate-400 text-slate-700" placeholder="Cerita lengkap atau detail pekerjaan..." />
            </div>
          </div>

          {/* Group: Media & Settings */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-5">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">image</span>
              Media & Pengaturan
            </h3>
            
            <div>
              <ImageCropper 
                label="Foto Sampul (Bisa digeser & dicrop)"
                aspect={16/9}
                defaultPreview={editingProject?.coverImage && editingProject.coverImage !== '[PLACEHOLDER]' ? editingProject.coverImage : null}
                onCropComplete={setCroppedCoverImage}
                removable={!editingProject}
              />
            </div>

            <div className="pt-4 border-t border-slate-200">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Galeri Proyek (Opsional)</label>
              <p className="text-xs text-slate-500 mb-4">Tambahkan foto-foto lain terkait acara/proyek ini. Akan ditampilkan di halaman detail proyek.</p>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
                {existingGallery.map((url, i) => (
                  <div key={`exist-${i}`} className="relative aspect-square rounded-lg border border-slate-200 overflow-hidden group bg-slate-100">
                    <Image src={url} alt={`Gallery ${i}`} fill className="object-cover" />
                    <button 
                      type="button"
                      onClick={() => setExistingGallery(prev => prev.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {newGalleryPreviews.map((url, i) => (
                  <div key={`new-${i}`} className="relative aspect-square rounded-lg border border-blue-200 overflow-hidden group bg-blue-50">
                    <Image src={url} alt={`New Gallery ${i}`} fill className="object-cover" />
                    <button 
                      type="button"
                      onClick={() => {
                        URL.revokeObjectURL(url);
                        setNewGalleryPreviews(prev => prev.filter((_, idx) => idx !== i));
                        setNewGalleryFiles(prev => prev.filter((_, idx) => idx !== i));
                      }}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <span className="absolute bottom-1 left-1 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded shadow">Baru</span>
                  </div>
                ))}
                
                <label className="cursor-pointer border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center hover:bg-slate-50 hover:border-blue-400 transition-colors aspect-square">
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      if (files.length === 0) return;
                      setNewGalleryFiles(prev => [...prev, ...files]);
                      setNewGalleryPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
                    }}
                  />
                  <Plus className="w-6 h-6 text-slate-400 mb-1" />
                  <span className="text-[10px] font-medium text-slate-500">Tambah</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg">
              <div>
                <p className="text-sm font-semibold text-slate-700">Tampilkan di Selected Work</p>
                <p className="text-xs text-slate-500">Proyek akan muncul di halaman utama</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="isFeatured" className="sr-only peer" defaultChecked={editingProject?.isFeatured} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Urutan Tampil (Opsional)</label>
              <input type="number" name="order" defaultValue={editingProject?.order || 0} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700" placeholder="Semakin kecil semakin awal tampil" />
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
                  SIMPAN PROYEK
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
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Delete"
        isDestructive={true}
      />
    </div>
  );
}
