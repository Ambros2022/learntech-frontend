import BannerSec from './Components/BannerSec'
import BlogCards from './Components/BlogCards'

type Props = {
  initialBlogs: any[]
  initialTotalPages: number
  colleges: any[]
}

export default function MainBlogPage({ initialBlogs, initialTotalPages, colleges }: Props) {
  return (
    <>
      <BannerSec />
      <BlogCards initialCards={initialBlogs} initialTotalPages={initialTotalPages} colleges={colleges} />
    </>
  )
}
