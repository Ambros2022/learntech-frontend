import Link from 'next/link'
import Image from 'next/image'

const NewsItem = ({ imageSrc, name, id, slug }: any) => (
    <div className="col-12">
        <div className="card mb-3 bg-skyBlue hover-card">
            <div className="row g-0">
                <div className="col-md-4 d-flex">
                    <Image src={imageSrc} width={200} height={200} sizes="(max-width: 768px) 100vw, 200px" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} className="ms-md-2 img-fluid rounded-start align-self-center" alt={name || 'news-img'} loading="lazy" />
                </div>
                <div className="col-md-8">
                    <Link href={`/news/${id}/${slug}`}>
                        <div className="card-body">
                            <h6 className="card-text text-black">{name}</h6>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

const NewsList = ({ newsItems, heading }: any) => {
    if (!newsItems?.length) return null
    return (
    <>
        <h4 className='fw-bold text-center py-3 text-blue'>{heading}</h4>
        <div className='mb-5 bg-skyBlue pt-3 innerNewsCard px-4 overflow-y-auto rounded' style={{
                maxHeight: '1110px',
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                WebkitOverflowScrolling: 'touch',
            }}
        >
            <div className="row">
                {newsItems.map((item: any, index: number) => (
                    <NewsItem key={index} id={item.id} imageSrc={item.imageSrc} name={item.name} slug={item?.slug} />
                ))}
            </div>
        </div>
    </>
    );
};

export default NewsList;
