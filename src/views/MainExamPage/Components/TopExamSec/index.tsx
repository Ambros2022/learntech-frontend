
import ReadMoreContent from 'src/components/ui/ReadMoreWrapper';

const TopExamSec = ({ data = {} }: { data?: { meta_title?: string, top_description?: string } }) => {
    return (
        <section className='py-5 bg-white'>
            <div className="container">
                <h2 className='text-blue fw-bold text-center mb-4'>
                    Top Entrance Exams in India and Exams for Abroad Study
                </h2>
                {data.top_description && (
                    <ReadMoreContent
                        html={data.top_description}
                        charLimit={1000}
                    />
                )}
            </div>
        </section>
    );
};

export default TopExamSec;