export async function getServerSideProps({ res }) {
    try {
      // Fetch the XML sitemap for news
      const response = await fetch(
       `${process.env.NEXT_PUBLIC_API_URI}api/website/xmlgenerator/get?type=schools`
      );
  
      if (!response.ok) {
        throw new Error(`Failed to fetch news sitemap: ${response.statusText}`);
      }
  
      const xml = await response.text();
  
      // Set the response headers for XML
      res.setHeader("Content-Type", "application/xml");
      res.write(xml);
      res.end();
    } catch (error) {
      console.error("Error fetching news sitemap:", error);
      res.statusCode = 500;
      res.end("<error>Unable to generate news sitemap</error>");
    }
  
    return { props: {} }; // No props needed
  }
  
  export default function SitemapNews() {
    // This page won't render anything
    return null;
  }
  