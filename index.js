const http = require('node:http')
const fs = require('node:fs')
const { URL } = require('node:url')

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'})
    
    const fullUrl = `http://${req.headers.host}${req.url}`;
    const url = new URL(fullUrl)
    
    let filepath = '.' + url.pathname
    if (filepath === './') filepath = './index'
    filepath += '.html' 

    console.log(filepath)
    console.log('filepath, typeof', typeof filepath)
    
    fs.readFile(filepath, (err, data) => {
        // 404 
        if (err) {
            return fs.readFile('./404.html', (err, data) => {
                if(err) {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    return res.end("404 Not Found");

                }
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write(data)
                return res.end()
            })
        }

        // FILE LOADED
        res.write(data)
        res.end()
    })
})

server.listen(8080, () => {
    console.log('server ON')
})