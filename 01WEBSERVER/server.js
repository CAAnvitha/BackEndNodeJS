const http = require("http");

const hostname = "127.0.0.1";
const port = 5000;

http
  .createServer((req, res) => {
    // res.writeHead(200, {'Content-Type': 'text/plain'});

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World Anvitha ");

    // http://127.0.0.1:5000
  })
  .listen(port, hostname, () => {
    console.log(`Server is running at  http://${hostname}:${port}/`);
  });
