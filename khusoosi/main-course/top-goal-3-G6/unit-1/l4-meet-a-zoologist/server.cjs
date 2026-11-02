const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const args = process.argv.slice(2);
const portArg = args.findIndex((arg) => arg === '--port');
const hostArg = args.findIndex((arg) => arg === '--host');
const port = Number(portArg >= 0 ? args[portArg + 1] : process.env.PORT || 7100);
const host = hostArg >= 0 ? args[hostArg + 1] : '0.0.0.0';
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png', '.mp3': 'audio/mpeg', '.json': 'application/json' };
http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  let file = path.join(root, safePath === '/' ? 'index.html' : safePath);
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.stat(file, (error, stat) => {
    if (error || !stat.isFile()) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    fs.createReadStream(file).pipe(res);
  });
}).listen(port, host, () => console.log(`Preview: http://localhost:${port}`));
