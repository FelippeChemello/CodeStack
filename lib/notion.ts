import { NotionAPI } from 'notion-client'
import { ExtendedRecordMap, SearchParams, SearchResults } from 'notion-types'
import { mapNotionImageUrl } from './map-image-url'
import pMap from 'p-map'

export const notion = new NotionAPI({
    apiBaseUrl: process.env.NOTION_API_BASE_URL,
})

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
    const recordMap = await notion.getPage(pageId)

    return recordMap
}

export async function search(params: SearchParams): Promise<SearchResults> {
    return notion.search(params)
}
