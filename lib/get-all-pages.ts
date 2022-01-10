import pMemoize from 'p-memoize'
import { getAllPagesInSpace } from 'notion-utils'

import { SiteMap } from '../types'
import { notion } from './notion'
import { getCanonicalPageId } from './get-canonical-page-id'

export const getAllPages = pMemoize(getAllPagesImpl, { maxAge: 60000 * 5 })

export async function getAllPagesImpl(
    rootNotionPageId: string,
    rootNotionSpaceId: string
): Promise<Partial<SiteMap>> {
    const pageMap = await getAllPagesInSpace(
        rootNotionPageId,
        rootNotionSpaceId,
        notion.getPage.bind(notion)
    )

    const canonicalPageMap = Object.keys(pageMap).reduce(
        (map, pageId: string) => {
            const recordMap = pageMap[pageId]
            if (!recordMap) {
                throw new Error(`Error loading page "${pageId}"`)
            }

            const canonicalPageId = getCanonicalPageId(pageId, recordMap)

            if (map[canonicalPageId]) {
                console.error(
                    'error duplicate canonical page id',
                    canonicalPageId,
                    pageId,
                    map[canonicalPageId]
                )

                return map
            } else {
                return {
                    ...map,
                    [canonicalPageId]: pageId,
                }
            }
        },
        {}
    )

    return {
        pageMap,
        canonicalPageMap,
    }
}
