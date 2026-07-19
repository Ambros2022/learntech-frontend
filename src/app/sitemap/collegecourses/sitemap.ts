import { Sitemap } from "src/lib/sitemap-helper";

export default async function sitemap(): Promise<Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL || "https://learntechww.com";
  const apiUrl = (process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URI || "https://newapi.learntechww.com").replace(/\/+$/, "");

  try {
    const res = await fetch(
      `${apiUrl}/api/website/home/sitemap/collegecourses`,
      { next: { revalidate: 604800 } } as RequestInit // revalidate weekly
    );

    if (!res.ok) return [];

    const json = await res.json();
    const collegeCourses = json?.data || [];

    return collegeCourses.map((course: any) => {
      const collegeId = course.college?.id || "unknown-college-id";
      const collegeSlug = course.college?.slug || "unknown-college-slug";
      return {
        url: `${baseUrl}/college/${collegeId}/${collegeSlug}/${course.slug}`,
        lastModified: course.updated_at || new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.7,
      };
    });
  } catch (error) {
    console.error("Error fetching collegecourses for sitemap:", error);
    return [];
  }
}
