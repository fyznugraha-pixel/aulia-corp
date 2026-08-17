import { Loader2 } from 'lucide-react';

export default function AdminLoading() {
  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4">
      <div className="bg-white p-4 rounded-full shadow-sm border border-slate-100 mb-2">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
      <p className="text-sm font-medium text-slate-500 animate-pulse tracking-wide">Memuat halaman...</p>
    </div>
  );
}
