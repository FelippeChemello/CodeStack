import { getSiteForDomain } from './get-site-for-domain'
import * as config from './config'
import { Site } from '../types'

export async function getSites(): Promise<Site[]> {
    return [getSiteForDomain(config.domain)]
}
