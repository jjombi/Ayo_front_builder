const React = require('react');
const ReactDOMServer = require('react-dom/server');
const axios = require('axios');
// const App = require('../../src/App/Main2'); // Import your root React component
exports.handler =  async (event, context) => {
  try {
    const { path } = event;
    let script = '';
    // const parameter = extractParameterFromPath(path);
    console.log('path',path,'parameter',);
    // const html = fs.readFileSync(path.resolve(__dirname, "../../build/index.html"), "utf-8");
    // Render your React component to HTML
    // const html = ReactDOMServer.renderToString(<App />);

    // Return the HTML content as the response
    // const promise = new Promise((resolve, reject) => {
      await axios({
        url : 'https://ayo-world-rank.site/quezeshowtitle',
        method : 'GET',
        params : {
            roomnum : path.replace('/quezeshow_before/',''),
            type    : 'likes'
        },
      }).then(res=>{        
        const quezeshow_title = res.data[0].title;
        const explain_text= res.data[0].explain_text
        let img;
        if(res.data[0].img !== ''){
          img = `https://ay0.site/assets/no_image.jpg`
        }else {
          img = 'data:image/jpeg;base64,'+res.data[0].img
        }
        script = `
        <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8"/>
              <title>${quezeshow_title}</title>
              <meta name="title" content="${quezeshow_title}"/>
              <meta name="referrer" content="no-referrer-when-downgrade" />
              <meta name="description" content="${quezeshow_title}, ${explain_text}"></meta>
              <meta property="og:type" content="website" />
              <meta property="og:title" content="${quezeshow_title}" />
              <meta property="og:site_name" content="${quezeshow_title}" />
              <meta property="og:description" content="${explain_text}" />
              <meta property="og:image" content="${explain_text}" />

              <meta name="twitter:title" content="${quezeshow_title}" />
              <meta name="twitter:description" content="${explain_text}" />
              
              <link rel="icon" sizes="16x16" type="image/x-icon" href="/favicon.ico?">
              <link rel="apple-touch-icon" sizes="16x16" href="/favicon.ico?">
              <meta name="referrer" content="no-referrer-when-downgrade" />
              <meta name="google-adsense-account" content="ca-pub-7471498859383871">
      
              <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7471498859383871"
              crossorigin="anonymous"></script>
          </head>
          <body>
              <div id="root">
              </div>
              <!-- Include any necessary scripts -->
              <script src="/bundle.js"></script>
          </body>
          </html>
        `
    })
    // });
    // const promise_result = promise.then(()=>{
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/html',
        },
        body: script, 
      };
    // })
    // return promise_result;
    // return {
    //     statusCode: 200,
    //     headers: {
    //       'Content-Type': 'text/html',
    //     },
    //     body: `
    //       <!DOCTYPE html>
    //       <html lang="en">
    //       <head>
            
    //       </head>
    //       <body>
    //           <div id="root">
    //           ${path} , ${path.replace('/','')}
    //           </div>
    //           <!-- Include any necessary scripts -->
    //           <script src="/bundle.js"></script>
    //       </body>
    //       </html>
    //     `,
    //   };
  } catch (error) {
    // Handle errors
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
