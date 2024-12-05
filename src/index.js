const http = require('http')
const fs = require('fs')

const log = console.log;

const app = http.createServer((req, res) => {
    const url = req.url
    const method = req.method || 'GET'

    log('url : ', url)
    log('method : ', method)

    // 파일 생성
    if(method === 'POST' && url === '/add-product') {
        const body = [];

        req.on('data', (chunk) => {
            log('chunk : ', chunk)
            body.push(chunk)
        })

        req.on('end', () => {
            const data = Buffer.concat(body).toString('utf8')
            const [key, value] = data.split('=');
            log('end value : ', value)
            fs.writeFile(`./${key}.txt`, value,(err)=>{
                console.log('err : ', err)
            })
            console.log('file writing ended')
        })

        res.writeHead(302, {
            'Location': '/'
        });
        res.end()
        return;
    }

    // 파일 읽기
    if(method === 'GET' && url === '/get-product') {
        const body = [];

        req.on('data', (chunk) => {
            log('chunk : ', chunk)
            body.push(chunk)
        })

        req.on('end', () => {
            const data = Buffer.concat(body).toString('utf8')
            log('end data : ', data)
            const [key, value] = data.split('=');
            fs.writeFileSync(`./${key}.txt`, value)
            console.log('file writing ended')
        })

        res.writeHead(302, {
            'Location': '/'
        });
        res.end();
        return;
    }

    // 메인 화면
    if(method === 'GET' && url === '/') {
        const data = fs.readFileSync(`./index.html`)
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8" })
        return res.end(data);
    }

    // 에러 처리
    const data = fs.readFileSync(`./404Error.html`)
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8" })
    return res.end(data);
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})
