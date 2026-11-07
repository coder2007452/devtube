import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { searchYouTubeLive } from './src/server/youtubeScraper.js'

function youtubeLiveApiPlugin() {
  return {
    name: 'youtube-live-api',
    configureServer(server) {
      server.middlewares.use('/api/youtube-live', async (req, res, next) => {
        try {
          const url = new URL(req.url, `http://${req.headers.host || 'localhost:5173'}`);
          const q = url.searchParams.get('q') || '';
          const creatorName = url.searchParams.get('creatorName') || '';
          const isChannel = url.searchParams.get('isChannel') === 'true';
          const category = url.searchParams.get('category') || 'all';
          const limit = parseInt(url.searchParams.get('limit') || '50', 10);

          const result = await searchYouTubeLive({
            query: q,
            creatorName: creatorName,
            isChannelSearch: isChannel,
            category: category,
            limit: limit
          });

          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify(result));
        } catch (err) {
          console.error('[devtube-live-api] Error:', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message, videos: [], shorts: [] }));
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), youtubeLiveApiPlugin()],
})
