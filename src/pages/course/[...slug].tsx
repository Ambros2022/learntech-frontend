import { ReactNode } from 'react'
// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import InnerCoursePage from 'src/views/InnerCoursePage'
import SubInnerCoursePage from 'src/views/SubInnerCoursePage'
import { useRouter } from 'next/router'

const course = () => {
    const router = useRouter()

    const getSlugLength = (slug) => {
        if (slug === undefined) {
            return 0; // or handle undefined case as per your requirement
        }
        if (typeof slug === 'string') {
            return slug.length;
        }
        if (Array.isArray(slug)) {
            return slug.length;
        }
        return 0; // for any unexpected type
    };

    // Calculate the length of the slug
    const slugLength = getSlugLength(router.query.slug);

    // Log the length of the slug
    console.log(slugLength);

    return (
        <>
            {slugLength <= 2 && Array.isArray(router.query.slug) ?
                <InnerCoursePage id={router.query.slug[0]} /> :
                <SubInnerCoursePage />
            }
        </>
    )
}

course.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

course.guestGuard = true

export default course
