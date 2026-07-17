import { LazyBlogSearchBar } from 'src/app/components/ClientWrappers'
import { Breadcrumb } from 'src/app/components/Breadcrumb'

export default function BannerSec() {
  return (
    <>
      <section className='newsBannerSec bg-blue'>
        <div className='position-relative'>
          <div className='position-absolute w-100 h-100' style={{ top: '74px' }}>
            <div className="container h-100">
              <div className="d-flex justify-content-center h-100">
                <div className="align-content-center h-100">
                  <h1 className='fw-bold text-white mb-4 text-center'>Educational Blogs</h1>
                  <div className="row">
                    <div className="col-md-12 mb-3 mx-auto">
                      <LazyBlogSearchBar />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Breadcrumb items={[{ label: 'Blogs' }]} />
    </>
  )
}
