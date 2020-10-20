import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <script
                        data-ad-client='ca-pub-6917058823962730'
                        async
                        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
                    ></script>
                    <meta name='propeller' content='b2b4f8e0765fe19986f63477fd4c9e04'></meta>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
