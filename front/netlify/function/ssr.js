const React = require('react');
const ReactDOMServer = require('react-dom/server');
const axios = require('axios');
const fs = require('fs');
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
        // const base64img = 'data:image/jpeg;base64,'+res.data[0].img;
        // const binary = window.atob(base64img.split(',')[1]); 
        // const arraybuffer = new ArrayBuffer(binary.length);
        // let bytes = new Uint8Array(arraybuffer);
        // for(let i=0;i < binary.length; i++){
        //     bytes[i] = binary.charCodeAt(i);
        // }
        // const blob = new Blob([arraybuffer], { type: 'image/jpeg' });
        // const url = window.URL.createObjectURL(blob);
        // img = url; 
        // const base64img = res.data[0].img;
        // const base64Data = base64img.replace(/^data:image\/\w+;base64,/, '');
        // const buffer = Buffer.from(base64Data, 'base64');
        
        // Write the image data to a file (temporarily)
        // const tempImagePath = `https://ay0.site/image.jpg`; // Temporary file path
        // fs.writeFileSync(tempImagePath, buffer);

        // Set the image URL to the temporary file path
        // img = tempImagePath;
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
            <meta property="og:image" content="https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png"/>

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
