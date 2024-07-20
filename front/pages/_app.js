import Head from 'next/head';
import '../css/css.css';
// import {logo} from '@image/logo.ico';
const MyApp = ({Component, pageProps}) => {
	return (
	<>
		<Head>
			<title>예능 게임 퀴즈쇼</title>
			{/* <link rel="icon" href="http://localhost:8080/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FNEWLOGO.a5041886.png&w=384&q=75"/>  */}
			<meta name="title" content="예능 퀴즈쇼를 즐겨보세요."/>
			<meta name="description" content="신서유기/지락실/아는형님과 같은 예능에서 볼수 있었던 인물퀴즈/이어말하기/신조어퀴즈/음악퀴즈 등등 여러 게임을 만들어 보고 즐겨보자 (예능 게임 퀴즈쇼)"/>
			<meta name="robots" content="index,follow"/>
			<link rel="canonical" href="https://ay0.site"/>
			<meta name="keywords" content="ayo, ay0, 퀴즈쇼, 나락퀴즈쇼, 음악퀴즈, 아이돌퀴즈쇼, 이어말하기, 인물퀴즈, 이어말하기, 신조어퀴즈, 이모지퀴즈, 상식퀴즈" />
		</Head>
		<Component {...pageProps}/>
	</>
	)
}
export const metadata = {
	icons: {
		icon:'/_next/static/media/logo.ico',
		apple: ['@image/logo.ico'],
		shortcut: ['@image/logo.ico'],
	},
}

export const config = { amp: true };

export default MyApp;