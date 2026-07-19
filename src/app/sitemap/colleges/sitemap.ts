import { Sitemap } from "src/lib/sitemap-helper";

export default async function sitemap(): Promise<Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL || "https://learntechww.com";
  const apiUrl = (process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URI || "https://newapi.learntechww.com").replace(/\/+$/, "");

  try {
    const res = await fetch(
      `${apiUrl}/api/website/home/sitemap/colleges`,
      { next: { revalidate: 604800 } } as RequestInit // revalidate weekly
    );

    if (!res.ok) return [];

    const json = await res.json();
    const colleges = json?.data || [];

    return colleges.map((college: any) => ({
      url: `${baseUrl}/college/${college.id}/${college.slug}`,
      lastModified: college.updated_at || new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));
  } catch (error) {
    console.error("Error fetching colleges for sitemap:", error);
    return [];
  }
}
