import { Sitemap } from "src/lib/sitemap-helper";

export default async function sitemap(): Promise<Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL || "https://learntechww.com";
  const apiUrl = (process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URI || "https://newapi.learntechww.com").replace(/\/+$/, "");

  try {
    const res = await fetch(
      `${apiUrl}/api/website/home/sitemap/scholarships`,
      { next: { revalidate: 604800 } } as RequestInit // revalidate weekly
    );

    if (!res.ok) return [];

    const json = await res.json();
    const data = json?.data || [];

    return data.map((scholarship: any) => ({
      url: `${baseUrl}/scholarship/${scholarship.id}/${scholarship.slug}`,
      lastModified: scholarship.updated_at || new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error fetching scholarships for sitemap:", error);
    return [];
  }
}
