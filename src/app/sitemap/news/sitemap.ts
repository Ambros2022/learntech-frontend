import { Sitemap } from "src/lib/sitemap-helper";

export default async function sitemap(): Promise<Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL || "https://learntechww.com";
  const apiUrl = (process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URI || "https://newapi.learntechww.com").replace(/\/+$/, "");

  try {
    const res = await fetch(
      `${apiUrl}/api/website/home/sitemap/news`,
      { next: { revalidate: 604800 } } as RequestInit // revalidate weekly
    );

    if (!res.ok) return [];

    const json = await res.json();
    const newsData = json?.data || [];

    return newsData.map((news: any) => ({
      url: `${baseUrl}/news/${news.id}/${news.slug}`,
      lastModified: news.updated_at || new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error fetching news for sitemap:", error);
    return [];
  }
}
