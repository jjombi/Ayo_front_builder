const React = require('react');
const ReactDOMServer = require('react-dom/server');
const axios = require('axios');

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
                    <h1 class="root_h1">ayo, 이상형 월드컵과 퀴즈쇼를 즐겨보세요. 로그인 없이 이상형 월드컵과 퀴즈쇼를 만들 수 있습니다.</h1>
                    <h1 class="root_h1">ayo,  퀴즈쇼 당신도 에 갈 수 있다</h1>
                    <header className="Main2_header">
                        <div className='header_rogo'><p>Ayo</p></div>
                        <a href="https://ay0.site" className="all_btn">이상형 월드컵</a>
                        <a href="https://ay0.site/ayoworldrankmakequeze" className="all_btn" >이상형 월드컵 만들기</a>
                        <a href="https://ay0.site/result" className="all_btn" >이상형 월드컵 결과보기</a>
                        <a href="https://ay0.site/ayoworldrankaqueze" className="all_btn" >이상형 월드컵 시작하기</a>
                        <a href="https://ay0.site/quezeshow_main" className="all_btn" title="누구나 참여가능한 퀴즈쇼">퀴즈쇼</a>
                        <a href="https://ay0.site/make_quezeshow" className="all_btn" title="누구나 참여가능한 퀴즈쇼를 만들어 보세요">퀴즈쇼 만들기</a>
                        <a href="https://ay0.site/community" className="all_btn" title="개발자에게 의견을 남겨 주세요">제안하기</a>
                        <a href="https://ay0.site/space" className="all_btn" title="내가 좋아하는 유튜버에 대한 퀴즈를 만즐어 보세요">퀴즈쇼 스페이스</a>
                        <a href="https://ay0.site/space" className="all_btn" title="내가 좋아하는 유튜버에 대한 퀴즈를 만즐어 보세요">퀴즈쇼 스페이스</a>


                    </header>
                </div>

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
