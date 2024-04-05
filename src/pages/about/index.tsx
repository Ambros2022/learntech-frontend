// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import { ReactNode, useEffect } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'

const Home = () => {

  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}

      <nav className="navbar navbar-light bg-black">
        <div className="container-fluid">
          <a className="navbar-brand">About</a>
          <form className="d-flex" action="javascript:void(0)">
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
