const http = require('http')
const fs = require('fs')

const log = console.log;

const app = http.createServer((req, res) => {
    const url = req.url
    const method = req.method || 'GET'

    log('url : ', url)
    log('method : ', method)

    if(method === 'POST' && url === '/add-product') {
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
        res.end()
    }

    if(method === 'GET' && url === '/') {
        res.write('<html lang="en"><body>' +
            '<h1>hello</h1>' +
            '<form action="/add-product" method="POST">' +
            '<input name="input"></input>' +
            '<button type="submit">click me!</button>' +
            '</form>' +
            '</body></html>');
        res.end();
    }

})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})
