type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export type Sitemap = Array<{
  url: string
  lastModified?: string | Date
  changeFrequency?: ChangeFrequency
  priority?: number
}>
