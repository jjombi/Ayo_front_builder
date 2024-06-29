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
                <meta name="viewport" content="width=device-width, initial-scale=1.0" content="예능 게임 퀴즈쇼">
                <title>예능 게임 퀴즈쇼</title>
                <link rel="icon" sizes="16x16" type="image/x-icon" href="/favicon.ico?">
                <link rel="apple-touch-icon" sizes="16x16" href="/favicon.ico?">
                <meta name="referrer" content="no-referrer-when-downgrade" />
                <meta name="google-adsense-account" content="ca-pub-7471498859383871">
                <meta name="title" content="예능 퀴즈쇼를 즐겨보세요.">
                <meta name="description" content="신서유기/지락실/아는형님과 같은 예능에서 볼수 있었던 인물퀴즈/이어말하기/신조어퀴즈/음악퀴즈 등등 여러 게임을 만들어 보고 즐겨보자 !!/">
                <meta name=”robots” content=”index,follow” />
                <link rel="canonical" href="https://ay0.site">
                <meta name="keywords" content="ayo, ay0, 퀴즈쇼, 나락퀴즈쇼, 음악퀴즈, 아이돌퀴즈쇼, 이어말하기, 인물퀴즈, 이어말하기, 신조어퀴즈, 이모지퀴즈, 상식퀴즈" />


                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7471498859383871"
                crossorigin="anonymous"></script>
            </head>
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
