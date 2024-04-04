// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import { ReactNode } from 'react'


// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

const Home = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography sx={{ mb: 2 }}>Dashboard</Typography>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  )
}



export default Home
