import { uuidToId, parsePageId } from 'notion-utils'

import { Site, ExtendedRecordMap } from '../types'
import { getCanonicalPageId } from './get-canonical-page-id'

// include UUIDs in page URLs during local development but not in production
// (they're nice for debugging and speed up local dev)

export const mapPageUrl =
    (site: Site, recordMap: ExtendedRecordMap, searchParams: URLSearchParams) =>
    (pageId = '') => {
        if (uuidToId(pageId) === site.rootNotionPageId) {
            return createUrl('/', searchParams)
        } else {
            return createUrl(
                `/${getCanonicalPageId(pageId, recordMap)}`,
                searchParams
            )
        }
    }

export const getCanonicalPageUrl =
    (site: Site, recordMap: ExtendedRecordMap) =>
    (pageId = '') => {
        const pageUuid = parsePageId(pageId, { uuid: true })

        if (uuidToId(pageId) === site.rootNotionPageId) {
            return `https://${site.domain}`
        } else {
            return `https://${site.domain}/${getCanonicalPageId(
                pageUuid,
                recordMap
            )}`
        }
    }

function createUrl(path: string, searchParams: URLSearchParams) {
    return [path, searchParams.toString()].filter(Boolean).join('?')
}
