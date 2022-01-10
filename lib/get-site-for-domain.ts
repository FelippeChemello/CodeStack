import * as config from './config'
import { Site } from '../types'

export const getSiteForDomain = (domain: string): Site => {
    return {
        domain,
        name: config.name,
        rootNotionPageId: config.rootNotionPageId,
        rootNotionSpaceId: config.rootNotionSpaceId,
        description: config.description,
    } as Site
}
