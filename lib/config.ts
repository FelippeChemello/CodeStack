import { parsePageId } from 'notion-utils'
import { getSiteConfig, getEnv } from './get-config-value'
import { PageUrlOverridesMap, PageUrlOverridesInverseMap } from '../types'

export const rootNotionPageId: string = parsePageId(
    getSiteConfig('rootNotionPageId'),
    { uuid: false }
)

if (!rootNotionPageId) {
    throw new Error('Config error invalid "rootNotionPageId"')
}

// if you want to restrict pages to a single notion workspace (optional)
export const rootNotionSpaceId: string | null = parsePageId(
    getSiteConfig('rootNotionSpaceId', null),
    { uuid: true }
)

export const pageUrlOverrides = cleanPageUrlMap(
    getSiteConfig('pageUrlOverrides', {}) || {}
)

export const inversePageUrlOverrides = invertPageUrlOverrides(pageUrlOverrides)

export const name: string = getSiteConfig('name')
export const author: string = getSiteConfig('author')
export const domain: string = getSiteConfig('domain')
export const description: string = getSiteConfig('description', 'Notion Blog')

export const twitter: string | null = getSiteConfig('twitter', null)
export const github: string | null = getSiteConfig('github', null)
export const linkedin: string | null = getSiteConfig('linkedin', null)
export const youtube: string | null = getSiteConfig('youtube', null)
export const instagram: string | null = getSiteConfig('instagram', null)

export const socialImageTitle: string | null = getSiteConfig(
    'socialImageTitle',
    null
)
export const socialImageSubtitle: string | null = getSiteConfig(
    'socialImageSubtitle',
    null
)

export const isDev =
    process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

export const isServer = typeof window === 'undefined'

export const port = getEnv('PORT', '3000')
export const host = isDev ? `http://localhost:${port}` : `https://${domain}`

export const apiBaseUrl = `${host}/api`

function cleanPageUrlMap(pageUrlMap: PageUrlOverridesMap): PageUrlOverridesMap {
    return Object.keys(pageUrlMap).reduce((acc, uri) => {
        const pageId = pageUrlMap[uri]
        const uuid = parsePageId(pageId)

        if (!uuid) {
            throw new Error(`Invalid page id "${pageId}"`)
        }

        if (!uri) {
            throw new Error(`Missing alias for page "${pageId}"`)
        }

        if (!uri.startsWith('/')) {
            throw new Error(
                `Invalid alias for page "${pageId}": value "${uri}" should be a relative URI that starts with "/"`
            )
        }

        const path = uri.slice(1)

        return {
            ...acc,
            [path]: uuid,
        }
    }, {})
}

function invertPageUrlOverrides(
    pageUrlOverrides: PageUrlOverridesMap
): PageUrlOverridesInverseMap {
    return Object.keys(pageUrlOverrides).reduce((acc, uri) => {
        const pageId = pageUrlOverrides[uri]

        return {
            ...acc,
            [pageId]: uri,
        }
    }, {})
}
