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
                <meta name="viewport" content="width=device-width, initial-scale=1.0" content="재미있는 문제와 퀴즈를 맞춰보세요">
                <title>재미있는 문제와 퀴즈를 맞춰보세요</title>
                <link rel="icon" sizes="16x16" type="image/x-icon" href="/favicon.ico?">
                <link rel="apple-touch-icon" sizes="16x16" href="/favicon.ico?">
                <meta name="referrer" content="no-referrer-when-downgrade" />
                <meta name="google-adsense-account" content="ca-pub-7471498859383871">
                <meta name="title" content="재미있는 문제와 퀴즈를 맞춰보세요">
                <meta name="description" content="대표 퀴즈사이트 나락퀴즈 아이돌퀴즈 애니퀴즈 상식퀴즈 정치퀴즈 인물퀴즈 나라퀴즈 재미있는 문제와 퀴즈를 맞춰보세요 로그인 없이 문제를 만들고 풀어볼수 있습니다">
                <meta name=”robots” content=”index,follow” />
                <link rel="canonical" href="https://ay0.site">
                <meta name="keywords" content="ayo, ay0, 맞추기, 마추기, 퀴즈쇼, " />
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
