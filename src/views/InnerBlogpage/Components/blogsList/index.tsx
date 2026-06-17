import Link from 'next/link'
import Image from 'next/image'

const BlogItem = ({ imageSrc, id, name, slug }: any) => (
    <div className="col-12">
        <div className="card mb-3 bg-skyBlue hover-card">
            <div className="row g-0">
                <div className="d-flex col-md-4">
                    <Image
                        src={imageSrc}
                        alt={name || 'blog-img'}
                        width={200}
                        height={200}
                        sizes="(max-width: 768px) 100vw, 200px"
                        loading="lazy"
                        style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                        className="ms-md-2 rounded align-self-center img-fluid rounded-start"
                    />
                </div>
                <div className="col-md-8 align-self-center">
                    <Link href={`/blog/${id}/${slug}`}>
                        <div className="card-body d-flex">
                            <h6 className="card-text align-self-center text-black mb-0">{name}</h6>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

const BlogList = ({ blogItems, heading }: any) => {
    if (!blogItems?.length) return null
    return (
    <>
        <h4 className="fw-bold text-center py-3 text-blue">{heading}</h4>
        <div
            className="mb-5 bg-skyBlue pt-3 innerNewsCard px-4 rounded"
            style={{
                maxHeight: '1110px',
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                WebkitOverflowScrolling: 'touch',
            }}
        >
            <div className="row">
                {blogItems.map((item: any, index: number) => (
                    <BlogItem
                        key={index}
                        id={item.id}
                        imageSrc={item.imageSrc}
                        name={item.name}
                        slug={item.slug}
                    />
                ))}
            </div>
        </div>
    </>
    );
};

export default BlogList;
