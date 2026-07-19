import { Sitemap } from "src/lib/sitemap-helper";

export default async function sitemap(): Promise<Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL || "https://learntechww.com";
  const apiUrl = (process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URI || "https://newapi.learntechww.com").replace(/\/+$/, "");

  try {
    const res = await fetch(
      `${apiUrl}/api/website/home/sitemap/exams`,
      { next: { revalidate: 604800 } } as RequestInit // revalidate weekly
    );

    if (!res.ok) return [];

    const json = await res.json();
    const exams = json?.data || [];

    return exams.map((exam: any) => ({
      url: `${baseUrl}/exam/${exam.id}/${exam.slug}`,
      lastModified: exam.updated_at || new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error fetching exams for sitemap:", error);
    return [];
  }
}
