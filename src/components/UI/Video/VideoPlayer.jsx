import React from 'react';

export default function VideoPlayer({ trailerUrl, isTrailer, kinopoiskId }) {

    const getEmbedUrl = (url) => {
        if (!url) return null;

        if (url.includes("/embed/")) {
            return url.includes('?') ? `${url}&rel=0` : `${url}?rel=0`;
        }

        const watchIdMatch = url.match(/[?&]v=([^&]+)/);
        if (watchIdMatch && watchIdMatch[1]) {
            return `https://www.youtube.com/embed/${watchIdMatch[1]}?rel=0`;
        }

        const shortUrlMatch = url.match(/youtu\.be\/([^?&]+)/);
        if (shortUrlMatch && shortUrlMatch[1]) {
            return `https://www.youtube.com/embed/${shortUrlMatch[1]}?rel=0`;
        }

        return url;
    };

    const finalTrailerUrl = getEmbedUrl(trailerUrl);

    const kinoboxHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <base href="https://flcksbr.top/">
      <link rel="stylesheet" href="https://flcksbr.top/kinobox/kinobox.css">
      <style>
        body { margin: 0; padding: 0; background: #000; overflow: hidden; }
        .kinobox { width: 100%; height: 100vh; }
      </style>
    </head>
    <body>
      <div class="kinobox" data-kinopoisk="${kinopoiskId}" data-menu="list"></div>
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      <script src="https://flcksbr.top/kinobox/kinobox.js"></script>
    </body>
    </html>
  `;

    return (
        <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-[#2D2A4A] bg-black">

            <div className="relative w-full h-0" style={{ paddingTop: '56.25%' }}>

                {isTrailer ? (
                    // Trailer block
                    <div className="absolute inset-0">
                        {finalTrailerUrl ? (
                            <iframe
                                src={finalTrailerUrl}
                                style={{
                                    border: 'none',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Trailer"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                Трейлер не доступен
                            </div>
                        )}
                    </div>
                ) : (
                    // Player block
                    <div className="absolute inset-0">
                        {kinopoiskId ? (
                            <iframe
                                srcDoc={kinoboxHtml}
                                className="w-full h-full"
                                style={{ border: 'none' }}
                                sandbox="allow-scripts allow-same-origin allow-forms allow-presentation"
                                allowFullScreen
                                title="Kinobox Player"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                Фильм не доступен для просмотра (нет ID Кинопоиска)
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}