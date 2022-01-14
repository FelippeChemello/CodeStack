import { GetServerSideProps } from 'next'
import { SiteMap } from 'types'

import { getSiteMaps } from '../lib/get-site-maps'
import { host } from '../lib/config'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const siteMaps = await getSiteMaps()

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=3600, max-age=3600, stale-while-revalidate=3600'
    )
    res.setHeader('Content-Type', 'text/xml')
    res.write(createSitemap(siteMaps[0]))
    res.end()

    return {
        props: {},
    }
}

const createSitemap = (
    siteMap: SiteMap
) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${host}</loc>
      </url>

      <url>
        <loc>${host}/</loc>
      </url>

      ${Object.keys(siteMap.canonicalPageMap)
          .map((canonicalPagePath) =>
              `
            <url>
              <loc>${host}/${canonicalPagePath}</loc>
            </url>
          `.trim()
          )
          .join('')}
    </urlset>
    `

export default function Sitemap() {
    return <div>Sitemap</div>
}
