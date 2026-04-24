const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');

const host = '0.0.0.0';
const basePort = Number.parseInt(process.env.PORT || '8080', 10);
const maxAttempts = 20;
const rootDir = __dirname;

const contentTypes = {
  '.css': 'text/css; charset=UTF-8',
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

function getContentType(filePath) {
  return contentTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
}

function resolveRequestPath(urlPath) {
  const decodedPath = decodeURIComponent((urlPath || '/').split('?')[0]);
  const normalizedPath = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, '');
  const requestedPath = normalizedPath === '/' ? '/index.html' : normalizedPath;
  return path.join(rootDir, requestedPath);
}

async function handleRequest(req, res) {
  try {
    const filePath = resolveRequestPath(req.url);
    const stats = await fs.stat(filePath);
    const finalPath = stats.isDirectory() ? path.join(filePath, 'index.html') : filePath;
    const contents = await fs.readFile(finalPath);

    res.writeHead(200, {
      'Content-Type': getContentType(finalPath),
      'Cache-Control': 'no-store'
    });
    res.end(contents);
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR') {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('Not Found');
      return;
    }

    res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('Internal Server Error');
  }
}

function listenOnPort(port, attemptsLeft) {
  const server = http.createServer((req, res) => {
    handleRequest(req, res);
  });

  server.once('error', (error) => {
    if (error.code === 'EADDRINUSE' && attemptsLeft > 0) {
      listenOnPort(port + 1, attemptsLeft - 1);
      return;
    }

    console.error('Failed to start local server:', error.message);
    process.exit(1);
  });

  server.listen(port, host, () => {
    console.log(`GPS Nav System available at http://127.0.0.1:${port}`);
  });
}

listenOnPort(basePort, maxAttempts);
