import { Breadcrumb } from 'src/app/components/Breadcrumb'

const BannerSec = ({ data, createdAt }: any) => {
  return (
    <>
      <section className="newsBannerSec blogBannerSec bg-blue ">

        <div
          className={`container d-flex h-100 w-100 justify-content-center flex-column align-content-center text-center position-relative`}
          style={{ minHeight: "300px" }}
        >
          <h1 className="fw-bold text-white mb-3" style={{ minHeight: "3rem",fontWeight:600 }}>
            {data?.name}
          </h1>
          <p
            className="text-white pt-3 pt-md-0 fw-semibold"
            style={{
              minHeight: "2rem",     // reserves space for 1 line
              lineHeight: "2rem",    // matches minHeight so text box doesn't grow/shrink
              margin: 0
            }}
          >
            Team Learntech <br className="d-block d-md-none" />
            <span className="px-2 d-none d-md-inline">|</span> {createdAt}
          </p>
        </div>

      </section>

      <Breadcrumb items={[{ label: 'Blogs', href: '/blogs' }, { label: data?.name }]} />
    </>
  )
}

export default BannerSec
