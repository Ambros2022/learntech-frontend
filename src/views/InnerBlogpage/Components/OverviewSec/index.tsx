import React, { useMemo } from 'react';
import NewsList from '../newsList';
import BlogList from '../blogsList';
import ContactForm from 'src/@core/components/popup/ContactForm';

// Function to fix <img> tags inside HTML by adding width/height + style
function fixImages(html) {
  if (!html) return '';

  return html.replace(/<img(.*?)>/g, (match, group) => {
    // Extract width and height if present in original tag
    let widthMatch = group.match(/width=["']?(\d+)["']?/);
    let heightMatch = group.match(/height=["']?(\d+)["']?/);

    let width = widthMatch ? parseInt(widthMatch[1], 10) : 600; // default width
    let height = heightMatch ? parseInt(heightMatch[1], 10) : 400; // default height

    // Inline style for responsive image with reserved aspect ratio
    let style = `style="width:100%;height:auto;aspect-ratio:${width}/${height};object-fit:cover;"`;

    // Return updated <img> with guaranteed width/height + style
    return `<img width="${width}" height="${height}" ${style} ${group}>`;
  });
}


const OverviewSec = ({ data, newsData, blogsData }) => {
  const processedHTML = useMemo(
    () => fixImages(data?.overview),
    [data?.overview]
  );

  return (
    <section className="innerBlogSec bg-white pt-3">
      <div className="container">
        <div className="row">
          {/* Left Column - Overview */}
          <div className="col-md-8">
            <div
              className="text-black"
              style={{ minHeight: '500px' }} // Reserve space
              dangerouslySetInnerHTML={{ __html: processedHTML }}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="col-md-4">
            <div className="mb-3" style={{ minHeight: '200px' }}>
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