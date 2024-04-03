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
                <meta name="viewport" content="width=device-width, initial-scale=1.0" content="ayo, 이상형 월드컵과 퀴즈쇼를 즐겨보세요.">
                <title>ayo, 이상형 월드컵과 퀴즈쇼를 즐겨보세요 </title>
                <link rel="icon" sizes="16x16" type="image/x-icon" href="/favicon.ico?">
                <link rel="apple-touch-icon" sizes="16x16" href="/favicon.ico?">
                <meta name="referrer" content="no-referrer-when-downgrade" />
                <meta name="google-adsense-account" content="ca-pub-7471498859383871">
                <meta name="title" content="ayo, 이상형 월드컵과 퀴즈쇼를 즐겨보세요.">
                <meta name="description" content="ayo, 이상형 월드컵과 퀴즈쇼를 즐겨보세요. 로그인 없이 이상형 월드컵과 퀴즈쇼를 만들 수 있습니다.">
                <meta name=”robots” content=”index,follow” />
                <link rel="canonical" href="https://ay0.site">
                <meta name="keywords" content="ayo, ay0, 이상형 월드컵, 이상형월드컵, 맞추기, 마추기, 퀴즈쇼, " />


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
