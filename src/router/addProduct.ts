import path from 'path';
const rAndWItem = require('../utils/readAndWriteItem');
import { IncomingMessage, ServerResponse } from 'node:http';

module.exports = (req: IncomingMessage, res: ServerResponse) =>{

  const body: Uint8Array[] = [];

  req.on('data', (chunk: any) => {
    body.push(chunk);
  });

  req.on('end', () => {
    const data = Buffer.concat(body).toString('utf8');
    const [key, value] = data.split('=');
    const filePath = path.join(process.cwd(), 'src', 'data', `db.json`);
    // 입력된 데이터의 키, 값, 저장할 파일 위치를 파라미터로 전달
    rAndWItem(filePath, key, value);
  });

  res.writeHead(302, {
    Location: '/',
  });
  return res.end();
}