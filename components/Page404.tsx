import Head from 'next/head'
import * as React from 'react'
import { PageProps } from '../types'
import { PageHead } from './PageHead'

import styles from './styles.module.css'

export const Page404: React.FC<PageProps> = ({ site, pageId, error }) => {
    const title = site?.name || 'Page Not Found'

    return (
        <>
            <PageHead site={site} />

            <Head>
                <meta property='og:site_name' content={title} />
                <meta property='og:title' content={title} />

                <title>{title}</title>
            </Head>

            <div className={styles.container}>
                <main className={styles.main}>
                    <h1>Page Not Found</h1>

                    {error ? (
                        <p>{error.message}</p>
                    ) : (
                        pageId && (
                            <p>
                                Make sure that page exists "{pageId}" and is
                                public.
                            </p>
                        )
                    )}

                    <img
                        src='/404.png'
                        alt='404 Not Found'
                        className={styles.errorImage}
                    />
                </main>
            </div>
        </>
    )
}
