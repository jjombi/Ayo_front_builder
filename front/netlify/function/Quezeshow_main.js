exports.handler =  async (event, context) => {
    try {
    
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/html',
            },
            body: `

            <!DOCTYPE html>
            <html lang="kr">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0" content="Super easy한 퀴즈쇼">
                <title>Super easy한 퀴즈쇼</title>
                <link rel="icon" sizes="16x16" type="image/x-icon" href="/favicon.ico?">
                <link rel="apple-touch-icon" sizes="16x16" href="/favicon.ico?">
                <meta name="referrer" content="no-referrer-when-downgrade" />
                <meta name="google-adsense-account" content="ca-pub-7471498859383871">
                <meta name="title" content="ayo, 이상형 월드컵과 퀴즈쇼를 즐겨보세요.">
                <meta name="description" content="나락퀴즈쇼 아이돌퀴즈쇼 애니퀴즈쇼 상식퀴즈쇼 정치퀴즈쇼 등 웃기고 재미있는 퀴즈쇼를 만나보세요">
                <meta name=”robots” content=”index,follow” />
                <link rel="canonical" href="https://ay0.site">
                <meta name="keywords" content="ayo, ay0, 퀴즈쇼, " />


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
