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
                </Head>
                <body>
                    <script src='https://www.paypal.com/sdk/js?client-id=AYB05EyKQya-xYDx2nFzAqoOyM1zCLqahE3udq5CDTO5HZDgc2GKXsakY48_cKuiXwghs8mqjJtYrmnc&currency=BRL'></script>

                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
