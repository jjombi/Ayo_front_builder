// server/index.tsx
// import express from 'express';
const express = require('express');
const fs = require('fs');
const path = require('path');
const ReactDOMServer = require('react-dom/server')
// import fs from 'fs';
// import path from 'path';
// import ReactDOMServer from 'react-dom/server';
// import App from '../client/App';

const app = express();
// 클라이언트 사이드에서 빌드된 html을 읽어와 사용
const html = fs.readFileSync(path.resolve(__dirname, "../build/index.html"), "utf-8");

app.get("/", (req, res) => {
    // <App /> 을 렌더링
    const renderString = ReactDOMServer.renderToString(`<h1>ssr main</h1>`);
    // <div id="root"></div> 내부에 삽입
    //   res.send(`<div>adlsbflaflasn</div>`)
    console.log(html);
    res.send(`
    <!doctype html>
        <html lang="kr">
        <head>
        </head>
        <body>
        hearl
        </body>
    </html>
    `);
});
// 위의 / 이외의 경로로 요청할 경우(js, css 등)
// dist/client 폴더에 있는 파일들 제공
app.use("/", express.static("build"));

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

{/*       
    "babel-preset-react-hmre": "^1.1.1", 
    npm install --save-dev babel-cli 
    npm install --save-dev babel-preset-es2015 
    npm install --save-dev babel-preset-react 
    npm install --save-dev babel-register
    https://jjombi.github.io/jjombi.github.io
    "postbuild": "react-hydratable"
    "postbuild": "node ./src/server.js"
        "dev": "node ./build/server.js",
    "dev": "webpack-dev-server --progress --mode development",
    webpack --progress --mode production && 
     && webpack --config webpack.server.js && npm run start-server
         "build": "webpack --progress --mode production",
         "build:serverless": "npx babel --config-file ./babel.serverless.json --out-dir netlify-functions ./src --extensions \".js,.jsx,mjs,.ts,.tsx\" && npm tool:remove-env-d-js",
    "build:netlify": "npm run build && npm run build:serverless",
    "tool:remove-env-d-js": "rm lambda/react-app-env.d.js"

  [[redirects]]
from = "/*"
to = "/index.html"
status = 200

[build]
  functions = "netlify-functions"

[[redirects]]
  from = "/build/*"
  to = "/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/.netlify/functions/serverless"
  status = 200

[build]
  base = "/"
  command = "npm run build"
  publish = "/dist/"
  functions = "functions/"
  [build.environment]
    NODE_VERSION = "16"
[functions]
  external_node_modules = ["express"]
  node_bundler = "esbuild"
[[redirects]]
  force = true
  from = "/api/*"
  status = 200
  to = "/.netlify/functions/app/:splat"
[[redirects]]
  from = "/*"
  status = 200
  to = "/index.html"
*/}