import BannerImage from 'src/components/ui/BannerImage'
import { Breadcrumb } from 'src/app/components/Breadcrumb'

export default function BannerSec() {
  return (
    <>
      <section className='SitemapSec position-relative'>
        <BannerImage alt='Sitemap Banner' />
        <div className='d-flex h-100 w-100 justify-content-center position-absolute' style={{ top: '0' }}>
          <div className='container h-100 row justify-content-center text-center align-content-center'>
            <h1 className='col-12 text-white text-bold text-center align-self-center'>Sitemap</h1>
            <p className='col-12 text-white pt-2'>Navigate Your Way to a Realm of Information</p>
          </div>
        </div>
      </section>
      <Breadcrumb items={[{ label: 'Sitemap' }]} />
    </>
  )
}