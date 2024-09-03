import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios1 from 'src/configs/axios';

const MainCarousel = dynamic(() => import('src/@core/components/main-carousel'), { ssr: false });

interface NewsItem {
  id: number;
  slug: string;
  name: string;
}

const NewsLinkSection: React.FC = React.memo(() => {
  const [linkSectionItems, setLinkSectionItems] = useState<JSX.Element[]>([]);

  const fetchNews = useCallback(async () => {
    try {
      const roleparams = { page: 1, size: 10 };
      const response = await axios1.get('api/website/news/get?category_id =4', {
        params: {
          page: 1,
          size: 10000,
        }
      });
      const newsData: NewsItem[] = response.data.data;

      const newsItems = newsData.map((item) => (
        <Link key={item.id} href={`/news/${item.id}/${item.slug}`} target="_blank" rel="noopener noreferrer">
          <div className="card mx-2 cardHeight">
            <h6 className="py-2 mx-auto newsLink2Clr bg-white text-blue rounded text-center" style={{ maxWidth: '200px', zIndex:'40'}}>
              {item.name}
            </h6>
          </div>
        </Link>
      ));
      setLinkSectionItems(newsItems);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <section className="newsLinkSec2 bg-blue py-3 position-relative" style={{ zIndex: '2' }}>
      <div className="container text-center py-3 newsLink2Container rounded">
        <MainCarousel items={linkSectionItems} />
      </div>
    </section>
  );
});

export default NewsLinkSection;
