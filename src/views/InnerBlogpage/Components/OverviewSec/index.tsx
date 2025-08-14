import React, { useMemo } from 'react';
import NewsList from '../newsList';
import BlogList from '../blogsList';
import ContactForm from 'src/@core/components/popup/ContactForm';

// Function to fix <img> tags inside HTML by adding width/height if missing
function fixImages(html) {
  if (!html) return '';
  return html.replace(/<img(.*?)>/g, (match, group) => {
    if (/width=/.test(group) && /height=/.test(group)) {
      return `<img${group}>`;
    }
    return `<img width="600" height="400"${group}>`; // adjust default sizes
  });
}

const OverviewSec = ({ data, newsData, blogsData }) => {
  const processedHTML = useMemo(() => fixImages(data?.overview), [data?.overview]);

  return (
    <section className="innerBlogSec bg-white pt-3">
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
            <div className="mb-3">
              <ContactForm heading={'Get More Details'} />
            </div>
            <BlogList blogItems={blogsData} heading={'Latest Blogs'} />
            <NewsList newsItems={newsData} heading={'Latest News'} />
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