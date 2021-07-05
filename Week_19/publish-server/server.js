let http = require('http');
let fs = require('fs');

const server = http.createServer((request, response) => {
  console.log(request.headers);

  let outFile = fs.createWriteStream('../server/public/index.html')

  request.on('data', chunk => {
    outFile.write(chunk)
  })
  request.on('end', () => {
    outFile.end()
    response.end("Success!")
  }) 
});
// 监听端口号
server.listen(8082);

