const http = require('http');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

const log = console.log;

const app = http.createServer((req: any, res: any) => {
  const url = req.url;
  const method = req.method || 'GET';

  log('url : ', url);
  log('method : ', method);

  // 파일 생성
  if (method === 'POST' && url === '/add-product') {
    const body: Uint8Array[] = [];

    // 이벤트 생성
    class FileEventEmitter extends EventEmitter {}
    const fileEvent = new FileEventEmitter();

    req.on('data', (chunk: any) => {
      log('chunk : ', chunk);
      body.push(chunk);
    });

    req.on('end', () => {
      const data = Buffer.concat(body).toString('utf8');
      const [key, value] = data.split('=');
      const filePath = path.join(process.cwd(), 'src', 'data', `data.json`);

      // 파일 읽기 이벤트 처리
      fileEvent.on(
        'readFile',
        (
          filePath: string,
          inputKey: string,
          inputValue: string,
          writeCb: (writePath: string, writeValue: string) => void
        ) => {
          fs.readFile(filePath, 'utf8', (err: any, fileData: string) => {
            console.log('data : ', fileData);
            console.log('data type : ', typeof fileData);

            const newData = [];
            try {
              newData.push(...JSON.parse(fileData));
            } catch (err) {
              console.error('parsing err : ', err);
            }
            newData.push({
              id: Math.random(),
              [inputKey]: decodeURI(inputValue),
            });

            const strNewData = JSON.stringify(newData);
            // 파일 쓰기 이벤트 시작
            writeCb(filePath, strNewData);
          });
        }
      );

      // 파일 읽기 이벤트 시작
      fileEvent.emit(
        'readFile',
        filePath,
        key,
        value,
        (writePath: string, writeData: string) => {
          // 파일 쓰기 이벤트 처리
          fs.writeFile(writePath, writeData, (err: any) => {
            if (err) {
              console.error('Error writing file:', err);
              return;
            }
            console.log('File writing ended.');
          });
        }
      );
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
