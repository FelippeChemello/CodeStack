import { PageProps } from '../types'

export default async function pageAcl({
    site,
    recordMap,
    pageId,
}: PageProps): Promise<PageProps> {
    if (!site) {
        return {
            error: {
                statusCode: 404,
                message: 'Post not found',
            },
        }
    }

    if (!recordMap) {
        return {
            error: {
                statusCode: 404,
                message: `Unable to resolve page for domain "${site.domain}". PostId "${pageId}" not found.`,
            },
        }
    }

    const keys = Object.keys(recordMap.block)
    const rootKey = keys[0]

    if (!rootKey) {
        return {
            error: {
                statusCode: 404,
                message: `Unable to resolve page for domain "${site.domain}". PostId "${pageId}" invalid data.`,
            },
        }
    }

    const rootValue = recordMap.block[rootKey]?.value
    const rootSpaceId = rootValue?.space_id

    if (
        rootSpaceId &&
        site.rootNotionSpaceId &&
        rootSpaceId !== site.rootNotionSpaceId
    ) {
        if (process.env.NODE_ENV) {
            return {
                error: {
                    statusCode: 404,
                    message: `PostId "${pageId}" doesn't belong to the workspace owned by "${site.domain}".`,
                },
            }
        }
    }
}
