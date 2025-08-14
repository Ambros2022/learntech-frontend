import React, { useMemo } from 'react';
import Head from 'next/head';
import { Roboto } from 'next/font/google';
import NewsList from '../newsList';
import BlogList from '../blogsList';
import ContactForm from 'src/@core/components/popup/ContactForm';

// Load Roboto locally (avoids CLS from late font swap)
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

// Fix images by adding width/height & aspect ratio
function fixImages(html) {
  if (!html) return '';

  return html.replace(/<img(.*?)>/g, (match, group) => {
    const widthMatch = group.match(/width=["']?(\d+)["']?/);
    const heightMatch = group.match(/height=["']?(\d+)["']?/);

    const width = widthMatch ? parseInt(widthMatch[1], 10) : 600;
    const height = heightMatch ? parseInt(heightMatch[1], 10) : 400;

    // Maintain aspect ratio and prevent CLS
    const style = `style="width:100%;height:auto;aspect-ratio:${width}/${height};object-fit:cover;"`;

    return `<img width="${width}" height="${height}" ${style} ${group}>`;
  });
}

const OverviewSec = ({ data, newsData, blogsData }) => {
  const processedHTML = useMemo(() => fixImages(data?.overview), [data?.overview]);

  return (
    <>
      {/* Preload the font that Lighthouse flagged for CLS */}
      <Head>
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.woff2" // Replace with exact URL from Lighthouse report
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>

      <section className={`innerBlogSec bg-white pt-3 ${roboto.className}`}>
        <div className="container">
          <div className="row">
            {/* Left Column */}
            <div className="col-md-8">
              <div
                className="text-black"
                style={{ minHeight: '500px' }}
                dangerouslySetInnerHTML={{ __html: processedHTML }}
              />
            </div>

            {/* Right Column */}
            <div className="col-md-4">
              <div className="mb-3" style={{ minHeight: '200px' }}>
                <ContactForm heading={'Get More Details'} />
              </div>
              <div style={{ minHeight: '300px' }}>
                <BlogList blogItems={blogsData} heading={'Latest Blogs'} />
              </div>
              <div style={{ minHeight: '300px' }}>
                <NewsList newsItems={newsData} heading={'Latest News'} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OverviewSec;





// import React from 'react'
// import NewsList from '../newsList';
// import BlogList from '../blogsList';
// import ContactForm from 'src/@core/components/popup/ContactForm';

// const OverviewSec = ({ data , newsData , blogsData }) => {

//     return (
//         <section className='innerBlogSec bg-white pt-3'>
//             <div className="container">
             
//                 <div className="row">
//                     <div className="col-md-8">
//                         <p className='text-black'>
//                               <div dangerouslySetInnerHTML={{ __html: data?.overview }} />
//                               </p>
                     

//                     </div>
//                     <div className="col-md-4">
//                         <div className='mb-3'>
//                             <ContactForm heading={'Get More Details'} />
//                         </div>
//                         <BlogList blogItems={blogsData} heading={'Latest Blogs'} />
//                         <NewsList newsItems={newsData} heading={'Latest News'} />
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default OverviewSec