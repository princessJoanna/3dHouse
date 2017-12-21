//静态服务器
var http = require('http'),
fs = require('fs'),
url = require('url'),
path = require('path'),
mime = require('./mime.js');
http.createServer((req, res) => {
var pathname = url.parse(req.url).pathname,
    extname = path.extname(pathname).substr(1),
    filePath, contentType = mime[extname||'html'] + ';charset=utf-8';
if(!extname){
    filePath = path.join('./', pathname, 'index.html');
}else{
    filePath = path.join('./', pathname);
}
// console.log(filePath);
fs.readFile(filePath, (err, file) => {
    if(err){
        res.writeHead(404);
        res.end('找不到文件');
        return;
    }
    res.writeHead(200, {'Content-Type': contentType});
    res.end(file);
})
}).listen(9292);