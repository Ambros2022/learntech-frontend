import { Sitemap } from "src/lib/sitemap-helper";

export default async function sitemap(): Promise<Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL || "https://learntechww.com";
  const apiUrl = (process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URI || "https://newapi.learntechww.com").replace(/\/+$/, "");

  try {
    const res = await fetch(
      `${apiUrl}/api/website/home/sitemap/generalcourse`,
      { next: { revalidate: 604800 } } as RequestInit // revalidate weekly
    );

    if (!res.ok) return [];

    const json = await res.json();
    const generalCourses = json?.data || [];

    return generalCourses.map((course: any) => {
      const streamId = course.streams?.id || "unknown-stream-id";
      const streamSlug = course.streams?.slug || "unknown-stream-slug";
      return {
        url: `${baseUrl}/course/${streamId}/${streamSlug}/${course.slug}`,
        lastModified: course.updated_at || new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.7,
      };
    });
  } catch (error) {
    console.error("Error fetching generalcourse for sitemap:", error);
    return [];
  }
}
