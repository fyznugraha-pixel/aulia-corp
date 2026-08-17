import { getVideos } from '@/lib/services/videos.service';
import { VideoManager } from './VideoManager';

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
      <VideoManager initialVideos={videos} />
    </div>
  );
}
