// _document.js의 default 형태
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					{/* <link rel="icon" sizes="16x16" type="image/x-icon" href="/favicon.ico?"><link rel="apple-touch-icon" sizes="16x16" href="/favicon.ico?"><meta name="referrer" content="no-referrer-when-downgrade"/> */}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;