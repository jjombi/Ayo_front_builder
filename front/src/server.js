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