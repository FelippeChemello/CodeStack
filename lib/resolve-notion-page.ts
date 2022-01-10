import { parsePageId } from 'notion-utils'

import pageAcl from './acl'
import { Site, ExtendedRecordMap } from '../types'
import { pageUrlOverrides } from './config'
import { getPage } from './notion'
import { getSiteMaps } from './get-site-maps'
import { getSiteForDomain } from './get-site-for-domain'

export async function resolveNotionPage(domain: string, rawPageId?: string) {
    let site: Site
    let pageId: string
    let recordMap: ExtendedRecordMap

    if (rawPageId && rawPageId !== 'index') {
        pageId = parsePageId(rawPageId)

        if (!pageId) {
            // check if the site configuration provides an override of a fallback for
            // the page's URI
            const override = pageUrlOverrides[rawPageId]

            if (override) {
                pageId = parsePageId(override)
            }
        }

        if (pageId) {
            site = getSiteForDomain(domain)
            recordMap = await getPage(pageId)
        } else {
            // handle mapping of user-friendly canonical page paths to Notion page IDs
            // e.g., /developer-x-entrepreneur versus /71201624b204481f862630ea25ce62fe
            const siteMaps = await getSiteMaps()
            const siteMap = siteMaps[0]
            pageId = siteMap?.canonicalPageMap[rawPageId]

            if (pageId) {
                site = getSiteForDomain(domain)
                recordMap = await getPage(pageId)
            } else {
                return {
                    error: {
                        message: `Not found "${rawPageId}"`,
                        statusCode: 404,
                    },
                }
            }
        }
    } else {
        site = getSiteForDomain(domain)
        pageId = site.rootNotionPageId

        console.log(site)
        recordMap = await getPage(pageId)
    }

    const props = { site, recordMap, pageId }

    return { ...props, ...(await pageAcl(props)) }
}
