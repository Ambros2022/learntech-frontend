import InnerHeader from 'src/views/SimplePage/InnerHeader'
import { Breadcrumb } from 'src/app/components/Breadcrumb'
import { LazyNewsSearchBar } from 'src/app/components/ClientWrappers'

const BannerSection = () => {
  return (
    <>
      <InnerHeader title="Latest Educational News">
        <div className="mx-auto" style={{ maxWidth: '500px' }}>
          <LazyNewsSearchBar />
        </div>
      </InnerHeader>
      <Breadcrumb items={[{ label: 'News' }]} />
    </>
  )
}

export default BannerSection