import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolvePort } from './resolvePort.mjs';
import settings from '../../config/custom-settings.mjs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const { port, protocol } = resolvePort(process.argv);

const publicDir = path.join(__dirname, 'public');

// ✅ serve static admin UI
app.use(express.static(publicDir));

// ✅ explicit root fallback (important)
app.get('/', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.get('/api/settings', (_req, res) => {
  res.json(settings);
});


app.listen(port, () => {
  console.log(`[Admin] ${protocol}://localhost:${port}`);
});


/*
import fs from 'fs';
import http from 'http';
import https from 'https';
import express from 'express';

import { PORTS } from '../../config/ports.mjs';
import { resolvePort } from '../utils/resolvePort.mjs';

const app = express();

// flags
const args = process.argv.slice(2);
const cliPort = args.find(a => a.startsWith('--port='))?.split('=')[1];
const useHttps = args.includes('--https');

// select base port
const defaultPort = useHttps
  ? PORTS.admin.https
  : PORTS.admin.http;

const port = resolvePort({
  cliPort,
  envPort: process.env.PORT,
  defaultPort,
});

if (useHttps) {
  const server = https.createServer(
    {
      key: fs.readFileSync('.certs/admin.key'),
      cert: fs.readFileSync('.certs/admin.crt'),
    },
    app
  );

  server.listen(port, () => {
    console.log(`[admin] HTTPS running on https://localhost:${port}`);
  });
} else {
  http.createServer(app).listen(port, () => {
    console.log(`[admin] HTTP running on http://localhost:${port}`);
  });
}
*/
