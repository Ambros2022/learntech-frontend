import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'

const Home = () => {

  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}

      <nav className="navbar navbar-light bg-black">
        <div className="container-fluid">
          <a className="navbar-brand">Conatct</a>
          <form className="d-flex">
            <input className="form-control me-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-primary my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>

    </section>

  )
}

Home.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

Home.guestGuard = true

export default Home
