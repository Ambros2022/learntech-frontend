import React, { useMemo } from 'react';
import { Roboto } from 'next/font/google'; // 1. Import font properly
import NewsList from '../newsList';
import BlogList from '../blogsList';
import ContactForm from 'src/@core/components/popup/ContactForm';

// Load Google Font with proper swap display to avoid CLS
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap', // ensures fallback text is shown instantly
});

// Function to ensure images reserve space
function fixImages(html) {
  if (!html) return '';

  return html.replace(/<img(.*?)>/g, (match, group) => {
    const widthMatch = group.match(/width=["']?(\d+)["']?/);
    const heightMatch = group.match(/height=["']?(\d+)["']?/);

    const width = widthMatch ? parseInt(widthMatch[1], 10) : 600;
    const height = heightMatch ? parseInt(heightMatch[1], 10) : 400;

    // Reserve aspect ratio for responsive images
    const style = `style="width:100%;height:auto;aspect-ratio:${width}/${height};object-fit:cover;"`;

    return `<img width="${width}" height="${height}" ${style} ${group}>`;
  });
}

const OverviewSec = ({ data, newsData, blogsData }) => {
  const processedHTML = useMemo(() => fixImages(data?.overview), [data?.overview]);

  return (
    <section className={`innerBlogSec bg-white pt-3 ${roboto.className}`}>
      <div className="container">
        <div className="row">
          {/* Left Column - Overview */}
          <div className="col-md-8">
            <div
              className="text-black"
              style={{ minHeight: '500px' }} // Reserve space to avoid CLS
              dangerouslySetInnerHTML={{ __html: processedHTML }}
            />
          </div>

          {/* Right Column - Sidebar */}
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