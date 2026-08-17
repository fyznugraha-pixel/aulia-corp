import { EventVideo } from '@prisma/client';

export function VideoReel({ videos }: { videos: EventVideo[] }) {
  // Helper to extract YouTube video ID
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const featuredVideo = videos.find(v => v.isFeatured) || videos[0];
  const mainVideoId = featuredVideo ? getYoutubeId(featuredVideo.youtubeUrl) : null;
  
  const subVideos = videos.filter(v => v.id !== featuredVideo?.id);
  const validSubVideos = subVideos.map(v => ({ ...v, id: getYoutubeId(v.youtubeUrl) })).filter(v => v.id);

  return (
    <section className="w-full bg-background py-section-gap">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col gap-4 mb-12">
          <div className="w-12 h-px bg-tertiary"></div>
          <h2 className="font-display-xl text-headline-lg md:text-display-xl text-on-background font-black tracking-tighter uppercase">
            Auliacorp Event Teaser
          </h2>
        </div>

        <div className="relative w-full aspect-video overflow-hidden rounded group cursor-pointer mb-12 bg-black">
          {mainVideoId ? (
            <iframe 
              src={`https://www.youtube.com/embed/${mainVideoId}`} 
              title="Auliacorp Event Teaser" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <>
              <div className="w-full h-full bg-surface-container-lowest/10 border border-surface-container-lowest/40 flex items-center justify-center">
                <span className="text-on-surface-variant opacity-30 font-label-md tracking-widest uppercase">No Video</span>
              </div>
              <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
                <div className="w-24 h-24 flex items-center justify-center rounded-full border-2 border-tertiary bg-background/60 backdrop-blur-sm">
                  <span className="material-symbols-outlined text-tertiary text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </div>
              </div>
            </>
          )}
        </div>

        {validSubVideos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {validSubVideos.map((video, index) => (
              <div key={index} className="flex flex-col gap-4 group cursor-pointer">
                <div className="aspect-video overflow-hidden rounded relative bg-black">
                  <iframe 
                    src={`https://www.youtube.com/embed/${video.id}`} 
                    title={`After Movie ${index + 1}`} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-6 h-px bg-tertiary mb-1"></div>
                  <h3 className="font-bold text-body-lg text-on-background tracking-tight">{video.title}</h3>
                  <p className="text-label-sm text-on-surface-variant uppercase tracking-widest">Event Recap</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
