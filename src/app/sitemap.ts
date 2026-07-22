type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

type SitemapEntry = {
  path: string
  freq: ChangeFrequency
  priority: number
  lastMod?: string
}

type Sitemap = Array<{
  url: string
  lastModified?: string | Date
  changeFrequency?: ChangeFrequency
  priority?: number
}>

const SITE_LAST_UPDATED = '2026-07-18'

const staticPages: SitemapEntry[] = [
  { path: '',                        freq: 'weekly',  priority: 1.0 },
  { path: '/colleges',               freq: 'weekly',  priority: 0.9 },
  { path: '/universities',           freq: 'weekly',  priority: 0.9 },
  { path: '/courses',                freq: 'weekly',  priority: 0.8 },
  { path: '/exams',                  freq: 'weekly',  priority: 0.8 },
  { path: '/blogs',                  freq: 'daily',   priority: 0.8 },
  { path: '/news',                   freq: 'daily',   priority: 0.8 },
  { path: '/scholarships',           freq: 'monthly', priority: 0.8 },
  { path: '/schools',                freq: 'weekly',  priority: 0.7 },
  { path: '/boards',                 freq: 'monthly', priority: 0.7 },
  { path: '/students-speak',         freq: 'monthly', priority: 0.7 },
  { path: '/nri-quota',              freq: 'monthly', priority: 0.6 },
  { path: '/mbbs-abroad',            freq: 'monthly', priority: 0.6 },
  { path: '/study-in-australia',     freq: 'monthly', priority: 0.6 },
  { path: '/study-in-canada',        freq: 'monthly', priority: 0.6 },
  { path: '/study-in-uk',            freq: 'monthly', priority: 0.6 },
  { path: '/study-in-usa',           freq: 'monthly', priority: 0.6 },
  { path: '/study-in-germany',       freq: 'monthly', priority: 0.6 },
  { path: '/study-in-france',        freq: 'monthly', priority: 0.6 },
  { path: '/study-in-ireland',       freq: 'monthly', priority: 0.6 },
  { path: '/study-in-singapore',     freq: 'monthly', priority: 0.6 },
  { path: '/study-in-new-zealand',   freq: 'monthly', priority: 0.6 },
  { path: '/services',               freq: 'monthly', priority: 0.6 },
  { path: '/education-loan',         freq: 'monthly', priority: 0.6 },
  { path: '/advertise-with-us',      freq: 'monthly', priority: 0.5 },
  { path: '/about-us',               freq: 'monthly', priority: 0.5 },
  { path: '/contact-us',             freq: 'monthly', priority: 0.5 },
  { path: '/our-team',               freq: 'monthly', priority: 0.5 },
  { path: '/career',                 freq: 'monthly', priority: 0.5 },
  { path: '/sitemap',                freq: 'monthly', priority: 0.3 },
  { path: '/privacy-policy',         freq: 'yearly',  priority: 0.3 },
  { path: '/terms-and-conditions',   freq: 'yearly',  priority: 0.3 },
  { path: '/disclaimer',             freq: 'yearly',  priority: 0.3 },
]

export default function sitemap(): Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://learntechww.com'

  return staticPages.map(({ path, freq, priority, lastMod }) => ({
    url: `${baseUrl}${path}`,
    lastModified: lastMod ?? SITE_LAST_UPDATED,
    changeFrequency: freq,
    priority,
  }))
}
