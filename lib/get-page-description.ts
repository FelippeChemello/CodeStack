import { Block, ExtendedRecordMap } from '../types'
import { getPageProperty } from 'notion-utils'

export function getPageDescription(
    block: Block,
    recordMap: ExtendedRecordMap
): string | null {
    return getPageProperty('Description', block, recordMap)
}
