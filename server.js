const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer(handleRequest);

function getContentType(filePath) {
    const ext = path.extname(filePath);
    switch (ext) {
        case ".html":
            return "text/html";
        case ".css":
            return "text/css";
        case ".js":
            return "text/javascript";
        case ".json":
            return "application/json";
        case ".png":
            return "image/png";
        case ".jpg":
        case ".jpeg":
            return "image/jpeg";
        default:
            return "application/octet-stream";
    }
}

function readAndServe(filePath, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end("Server error");
        } else {
            const contentType = getContentType(filePath);
            res.writeHead(200, { "Content-Type": contentType });
            res.end(data);
        }
    });
}

function handleRequest(req, res) { 

  // 🏠 ROUTE PRINCIPALE → index.html
    if (req.url === "/" || req.url === "/index.html") {
        fs.readFile("index.html", (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end("Server error");
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        }
        });
    }

  // 📄 DETAIL PAGE → detail.html
    else if (req.url.startsWith("/detail.html")) {
        fs.readFile("detail.html", (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end("Server error");
            } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
            }
        });
    }

    // 📦 SERVE STATIC FILES → CSS, JS, IMAGES
    else if (req.url.startsWith("/assets/") || req.url.endsWith(".css") || req.url.endsWith(".js")) {
        const filePath = path.join(__dirname, req.url);
        readAndServe(filePath, res);
    }

    // 📦 API ROUTE → /api/countries
    else if (req.url === "/api/countries") {
        https.get("https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,subregion,languages,currencies", (apiRes) => {
        let data = "";
        apiRes.on("data", (chunk) => {
            data += chunk;
        });
        apiRes.on("end", () => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(data);
        });
        }).on("error", (err) => {
        res.writeHead(500);
        res.end("Error fetching country data");
        });
    }

  // ❌ NOT FOUND
    else {
        res.writeHead(404);
        res.end("Not Found");
        }
}

server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
