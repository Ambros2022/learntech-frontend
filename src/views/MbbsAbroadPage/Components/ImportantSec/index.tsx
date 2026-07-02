import Link from 'next/link';

type Tag = {
    id: number;
    country_id: number;
    name: string;
    slug: string;
    country: {
        id: number;
        name: string;
    };
};

const ImportantSec = ({ tags = [] }: { tags: Tag[] }) => {
    return (
        <section className='bg-white py-3'>
            <div className="container">
                <h2 className='fw-bold text-blue mb-3'>Important Tags</h2>
                <div className="d-flex gap-3 flex-wrap studyAbroadLink">
                    {tags.map((tag, index) => (
                        <Link key={index} href={`/${tag.slug}`} style={{borderRadius:'50px'}} className='btn p-3 text-black bg-skyBlue'>
                            {tag.name}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImportantSec;
