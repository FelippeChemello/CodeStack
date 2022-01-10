import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import cs from 'classnames'
import { useRouter } from 'next/router'
import { useSearchParam } from 'react-use'
import BodyClassName from 'react-body-classname'
import useDarkMode from 'use-dark-mode'
import { PageBlock } from 'notion-types'

import { NotionRenderer, Code, Collection, CollectionRow } from 'react-notion-x'

import { getBlockTitle, parsePageId } from 'notion-utils'
import { mapPageUrl, getCanonicalPageUrl } from 'lib/map-page-url'
import { mapNotionImageUrl } from 'lib/map-image-url'
import { getPageDescription } from 'lib/get-page-description'
import { searchNotion } from 'lib/search-notion'
import { PageProps, Header as HeaderTypes } from '../types'
import { description, isDev, isServer, twitter } from 'lib/config'

import { IoIosArrowBack } from 'react-icons/io'
import { IoMoonSharp, IoSunnyOutline } from 'react-icons/io5'
import { Loading } from './Loading'
import { Page404 } from './Page404'
import { PageHead } from './PageHead'
import { Footer } from './Footer'
import { PageSocial } from './PageSocial'

import styles from './styles.module.css'

const Equation = dynamic(() =>
    import('react-notion-x').then((notion) => notion.Equation)
)

const Modal = dynamic(
    () => import('react-notion-x').then((notion) => notion.Modal),
    { ssr: false }
)

export const NotionPage: React.FC<PageProps> = ({
    site,
    recordMap,
    error,
    pageId,
}) => {
    const { isFallback, back, push: routerPush } = useRouter()
    const lite = useSearchParam('lite')

    const params: any = {}
    if (lite) params.lite = lite

    // lite mode is for oembed
    const isLiteMode = lite === 'true'
    const searchParams = new URLSearchParams(params)

    const darkMode = useDarkMode(true, { classNameDark: 'dark-mode' })

    if (isFallback) {
        return <Loading />
    }

    const keys = Object.keys(recordMap?.block || {})
    const block = recordMap?.block?.[keys[0]]?.value

    if (error || !site || !keys.length || !block) {
        return <Page404 site={site} pageId={pageId} error={error} />
    }

    const title = getBlockTitle(block, recordMap) || site.name

    if (isDev) {
        console.log('notion page', {
            isDev: isDev,
            title,
            pageId,
            rootNotionPageId: site.rootNotionPageId,
            recordMap,
        })
    }

    if (!isServer) {
        // add important objects to the window global for easy debugging
        const g = window as any
        g.pageId = pageId
        g.recordMap = recordMap
        g.block = block
    }

    const siteMapPageUrl = mapPageUrl(site, recordMap, searchParams)

    const canonicalPageUrl =
        !isDev && getCanonicalPageUrl(site, recordMap)(pageId)

    const isBlogPost =
        parsePageId(block.id) !== parsePageId(site.rootNotionPageId)

    const socialImage = mapNotionImageUrl(
        (block as PageBlock).format?.page_cover,
        block
    )

    const socialDescription =
        getPageDescription(block, recordMap) ?? description

    return (
        <>
            <PageHead site={site} />

            <Head>
                <meta property='og:title' content={title} />
                <meta property='og:site_name' content={site.name} />

                <meta name='twitter:title' content={title} />
                <meta property='twitter:domain' content={site.domain} />

                {twitter && (
                    <meta name='twitter:creator' content={`@${twitter}`} />
                )}

                {socialDescription && (
                    <>
                        <meta name='description' content={socialDescription} />
                        <meta
                            property='og:description'
                            content={socialDescription}
                        />
                        <meta
                            name='twitter:description'
                            content={socialDescription}
                        />
                    </>
                )}

                {socialImage ? (
                    <>
                        <meta
                            name='twitter:card'
                            content='summary_large_image'
                        />
                        <meta name='twitter:image' content={socialImage} />
                        <meta property='og:image' content={socialImage} />
                    </>
                ) : (
                    <meta name='twitter:card' content='summary' />
                )}

                {canonicalPageUrl && (
                    <>
                        <link rel='canonical' href={canonicalPageUrl} />
                        <meta property='og:url' content={canonicalPageUrl} />
                        <meta
                            property='twitter:url'
                            content={canonicalPageUrl}
                        />
                    </>
                )}

                <title>{title}</title>
            </Head>

            {isLiteMode && <BodyClassName className='notion-lite' />}

            <NotionRenderer
                bodyClassName={cs(
                    styles.notion,
                    pageId === site.rootNotionPageId && 'index-page'
                )}
                components={{
                    pageLink: ({
                        href,
                        as,
                        passHref,
                        prefetch,
                        replace,
                        scroll,
                        shallow,
                        locale,
                        ...props
                    }) => (
                        <Link
                            href={href}
                            as={as}
                            passHref={passHref}
                            prefetch={prefetch}
                            replace={replace}
                            scroll={scroll}
                            shallow={shallow}
                            locale={locale}
                        >
                            <a {...props} />
                        </Link>
                    ),
                    code: Code,
                    collection: Collection,
                    collectionRow: CollectionRow,
                    modal: Modal,
                    equation: Equation,
                }}
                recordMap={recordMap}
                rootPageId={site.rootNotionPageId}
                header={({
                    headerComponents: [breadcrumbsComponent, search, searchBox],
                    setIsSearchOpen,
                }: HeaderTypes) => {
                    return (
                        <header className='notion-header'>
                            <div className='nav-header'>
                                <div
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    {isBlogPost ? (
                                        <IoIosArrowBack
                                            className={styles.headerIcons}
                                            strokeWidth={16}
                                            onClick={back}
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                            }}
                                        />
                                    ) : (
                                        search
                                    )}
                                </div>

                                {isBlogPost && (
                                    <div
                                        style={{
                                            flex: 1,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => routerPush('/')}
                                    >
                                        <img
                                            src='logo.png'
                                            style={{
                                                width: '178px',
                                                height: '40px',
                                            }}
                                        />
                                    </div>
                                )}
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        gap: 16,
                                        flex: 1,
                                    }}
                                >
                                    {isBlogPost && search}
                                    {darkMode.value ? (
                                        <IoMoonSharp
                                            onClick={darkMode.toggle}
                                            className={styles.headerIcons}
                                        />
                                    ) : (
                                        <IoSunnyOutline
                                            onClick={darkMode.toggle}
                                            className={styles.headerIcons}
                                        />
                                    )}
                                </div>
                            </div>

                            {}
                        </header>
                    )
                }}
                fullPage={true}
                darkMode={darkMode.value}
                showCollectionViewDropdown={false}
                mapPageUrl={siteMapPageUrl}
                searchNotion={searchNotion}
                pageAside={<PageSocial />}
                footer={
                    <Footer
                        isDarkMode={darkMode.value}
                        toggleDarkMode={darkMode.toggle}
                    />
                }
            />
        </>
    )
}
