/*
*   此文件为node.js服务端文件
*   需要node环境运行
*   cd到目录下
*   node server.js
*/

const http = require('http');
const fs = require('fs');
const url = require('url');

const data = {
    name: 'wang'
}

http.createServer(function(req, res) {
    if (req.url.indexOf('jsonp') !== -1) {
        let queryStr = url.parse(req.url).query;
        let callbackName = queryStr.substring(queryStr.indexOf('=')+1, queryStr.indexOf('&') == -1 ? undefined : queryStr.indexOf('&'));

        res.writeHead(200, {'Content-Type': 'text/javascript'});
        let callback = callbackName + '(' + JSON.stringify(data) + ')';
        res.end(callback);
    } else {
        res.end('hello world');
    }
}).listen(8080, '127.0.0.1');

console.log('server on 8080');