const React = require('react');
const ReactDOMServer = require('react-dom/server');
const fs = require('fs');
const path = require('path');
// const App = require('../../src/App/Main2'); // Import your root React component
const App = require('../../src/App/Quezeshow/Quezeshow_main');
exports.handler = async (event, context) => {
  try {
    const { path } = event;
    // const parameter = extractParameterFromPath(path);
    console.log('path',path,'parameter',);
    // const html = fs.readFileSync(path.resolve(__dirname, "../../build/index.html"), "utf-8");
    // Render your React component to HTML
    const html = ReactDOMServer.renderToString(<App />);

    // Return the HTML content as the response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>SSR React App</title>
        </head>
        <body>
          <div id="root">${html}</div>
          <!-- Include any necessary scripts -->
          <script src="/bundle.js"></script>
        </body>
        </html>
      `,
    };
  } catch (error) {
    // Handle errors
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
