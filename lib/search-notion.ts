import fetch from 'isomorphic-unfetch'
import pMemoize from 'p-memoize'

import { apiBaseUrl } from './config'
import * as types from '../types'

export const searchNotion = pMemoize(searchNotionImpl, { maxAge: 10000 })

async function searchNotionImpl(
    params: types.SearchParams
): Promise<types.SearchResults> {
    return fetch(`${apiBaseUrl}/search-notion`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    })
        .then((res) => {
            console.log(res)

            if (res.ok) {
                return res
            }

            console.log(res)

            // convert non-2xx HTTP responses into errors
            const error: any = new Error(res.statusText)
            error.response = res
            return Promise.reject(error)
        })
        .then((res) => res.json())
}
