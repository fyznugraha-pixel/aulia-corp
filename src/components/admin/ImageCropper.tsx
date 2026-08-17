'use client';

import { useState, useCallback, useRef } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/lib/cropImage';
import { ZoomIn, ZoomOut, Crop } from 'lucide-react';

interface ImageCropperProps {
  onCropComplete: (file: File | null) => void;
  label?: string;
  aspect?: number;
  defaultPreview?: string | null;
  removable?: boolean;
  onRemove?: () => void;
}

export function ImageCropper({ onCropComplete, label = "Upload Foto", aspect, defaultPreview, removable = false, onRemove }: ImageCropperProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultPreview || null);
  
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result?.toString() || null);
        // Reset zoom and crop state
        setZoom(1);
        setCrop({ x: 0, y: 0 });
      });
      reader.readAsDataURL(file);
    }
  };

  const onCropCompleteHandler = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      if (!imageSrc || !croppedAreaPixels) return;
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, 0);
      
      if (croppedImage) {
        setPreviewUrl(URL.createObjectURL(croppedImage));
        onCropComplete(croppedImage);
        setImageSrc(null); // Close modal
      }
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, onCropComplete]);

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      
      <div className="flex items-center gap-4">
        {previewUrl && previewUrl !== '[PLACEHOLDER]' && (
          <div className="w-20 h-20 relative rounded-lg border border-slate-200 overflow-hidden bg-slate-100 flex-shrink-0">
             <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className="flex-1">
          <input 
            type="file" 
            accept="image/*" 
            ref={inputRef}
            onChange={onFileChange}
            className="hidden" 
          />
          <button 
            type="button"
            onClick={() => inputRef.current?.click()}
            className="px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
            Pilih & Sesuaikan Foto
          </button>
          {previewUrl && previewUrl !== '[PLACEHOLDER]' && (
            <div className="mt-3 flex items-center gap-4">
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                Gambar saat ini
              </p>
              {removable && (
                <button 
                  type="button"
                  onClick={() => {
                    setPreviewUrl(null);
                    onCropComplete(null);
                    if (onRemove) onRemove();
                  }}
                  className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition-colors bg-red-50 px-2 py-1 rounded-md"
                >
                  <span className="material-symbols-outlined text-[14px]">delete</span>
                  Hapus
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {imageSrc && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Crop className="w-5 h-5 text-blue-600" />
                Potong Gambar
              </h3>
              <button type="button" onClick={() => setImageSrc(null)} className="text-slate-500 hover:text-slate-800">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="relative w-full h-[60vh] bg-slate-900">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onCropComplete={onCropCompleteHandler}
                onZoomChange={setZoom}
              />
            </div>
            
            <div className="p-4 bg-white flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <ZoomOut className="w-5 h-5 text-slate-400" />
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <ZoomIn className="w-5 h-5 text-slate-400" />
              </div>
              
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setImageSrc(null)} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
                <button type="button" onClick={showCroppedImage} className="px-5 py-2.5 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">done</span>
                  Terapkan Crop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
