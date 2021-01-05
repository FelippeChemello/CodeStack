import { useEffect } from 'react'
import Head from 'next/head'

export default function Donate() {
    const paypalRef = React.useRef()
    const [paid, setPaid] = React.useState(false)
    const [error, setError] = React.useState(null)

    useEffect(() => {
        paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        intent: 'CAPTURE',
                        purchase_units: [
                            {
                                description: 'Donate',
                                amount: {
                                    currency_code: 'BRL',
                                    value: 10.0,
                                },
                            },
                        ],
                    })
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture()
                    setPaid(true)
                    console.log(order)
                },
                onError: err => {
                    setError(err)
                    console.error(err)
                },
            })
            .render(paypalRef.current)
    }, [])

    return (
        <>
            <Head>
                <title>Felippe Jaqson Chemello</title>
                <link rel='icon' href='/icons/code.png' />
            </Head>

            <div>
                <h1>PayPal Donate</h1>

                {paid && <h2>Doação realizada com sucesso</h2>}

                {error && <h2>Ocorreu um erro ao processar a doação. Por favor tente novamente mais tarde.</h2>}

                <div ref={paypalRef}></div>
            </div>
        </>
    )
}
