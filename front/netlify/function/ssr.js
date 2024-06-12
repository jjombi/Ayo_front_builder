const React = require('react');
const ReactDOMServer = require('react-dom/server');
const axios = require('axios');
exports.handler =  async (event, context) => {
  try {
    const { path } = event;
    let script = '';
    let img = 'https://ay0.site/assets/no_image.jpg';
    console.log('path',path,'parameter',);

      await axios({
        url : 'https://ayo-world-rank.site/quezeshowtitle',
        method : 'GET',
        params : {
            roomnum : path.replace('/quezeshow_before/',''),
            type    : 'likes'
        },
      }).then(res=>{        
        const quezeshow_title = res.data[0].title;
        const explain_text= res.data[0].explain_text;
        if(res.data[0].img !== ''){
          img = res.data[0].img;
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
              <meta property="og:url" content="https://ay0.site${path}" />
              <meta name="og:image" content="${img}" />

              <meta name="twitter:title" content="${quezeshow_title}" />
              <meta name="twitter:description" content="${explain_text}" />
              <meta name="twitter:image" content="${img}" />

              <link rel="icon" sizes="16x16" type="image/x-icon" href="/NEWLOGO.ico?">
              <link rel="apple-touch-icon" sizes="16x16" href="/NEWLOGO.ico?">
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

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/html',
        },
        body: script, 
      };

  } catch (error) {
    // Handle errors
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
