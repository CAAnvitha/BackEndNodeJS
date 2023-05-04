const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const { unescape } = require("querystring");
const hostname = "127.0.0.1";
const port = 5000;

const mimeTypes = {
  html: "text/html",
  css: "text/css",
  js: "text/javascript",
  png: "image/png",
  jpeg: "image/jpeg",
  jpg: "image/jpg",
};

http
  .createServer((req, res) => {
    var myuri = url.parse(req.url).pathname;
    var filename = path.join(process.cwd(), unescape(myuri));
    console.log("Annie file you are looking for is : " + filename);
    var loadFile;
    try {
      loadFile = fs.lstatSync(filename);
    } catch (error) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.write("404 Not Found\n");
        res.end();
        return;
    }

    if (loadFile.isFile()) {
      var mimeType = mimeTypes[path.extname(filename).split(".").reverse()[0]];
      res.writeHead(200, { "Content-Type": mimeType });
      var filestream = fs.createReadStream(filename);
      filestream.pipe(res);
    } else if (loadFile.isDirectory()) {
      res.writeHead(302, {
        Location: "index.html",
      });
      res.end();
    } else {
      //page header
      res.writeHead(500, { "Content-Type": "text/plain" });
      //page content
      res.write("500 Internal Error\n");
      res.end();
    }
  })
  .listen(port, hostname, () => {
    console.log(`Annie Server is running is running at port :${port}`);
  });
