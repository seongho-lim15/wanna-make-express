const http = require('http');
const fs = require('fs');
const path = require('path');

const rAndWItem = require('./src/utils/readAndWriteItem');

const log = console.log;

const app = http.createServer((req: any, res: any) => {
  const url = req.url;
  const method = req.method || 'GET';

  log('url : ', url);
  log('method : ', method);

  // 파일 생성
  if (method === 'POST' && url === '/add-product') {
    const body: Uint8Array[] = [];

    req.on('data', (chunk: any) => {
      log('chunk : ', chunk);
      body.push(chunk);
    });

    req.on('end', () => {
      const data = Buffer.concat(body).toString('utf8');
      const [key, value] = data.split('=');
      const filePath = path.join(process.cwd(), 'src', 'data', `data.json`);

      rAndWItem(filePath, key, value);
    });

    res.writeHead(302, {
      Location: '/',
    });
    return res.end();
  }

  // 파일 읽기
  if (method === 'GET' && url === '/get-product') {
    const body: Uint8Array[] = [];

    req.on('data', (chunk: any) => {
      log('chunk : ', chunk);
      body.push(chunk);
    });

    req.on('end', () => {
      const data = Buffer.concat(body).toString('utf8');
      log('end data : ', data);
      const [key, value] = data.split('=');
      fs.writeFileSync(`./${key}.txt`, value);
      console.log('file writing ended');
    });

    res.writeHead(302, {
      Location: '/',
    });
    return res.end();
  }

  // 메인 화면
  if (method === 'GET' && url === '/') {
    const filePath = path.join(process.cwd(), 'views', 'index.html');
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(data);
  }

  // 에러 처리
  const filePath = path.join(process.cwd(), 'views', '404Error.html');
  const data = fs.readFileSync(filePath);
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  return res.end(data);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
