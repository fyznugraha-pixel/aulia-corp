import { getVideos } from '@/lib/services/videos.service';
import { VideoManager } from './VideoManager';

export const dynamic = 'force-dynamic';

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <div className="p-8 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Event Videos</h1>
        <p className="text-slate-500">Kelola video After Movie dan Teaser Event yang akan tampil di halaman utama.</p>
      </div>

      <VideoManager initialVideos={videos} />
    </div>
  );
}
