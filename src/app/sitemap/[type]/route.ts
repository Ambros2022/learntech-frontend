import { NextRequest, NextResponse } from 'next/server'
import { getSitemapXml } from 'src/lib/api/common'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params
  // strip .xml suffix if present
  const sitemapType = type.replace(/\.xml$/, '')
  const xml = await getSitemapXml(sitemapType)

  if (!xml) {
    return new NextResponse('Sitemap unavailable', { status: 503 })
  }

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  })
}
