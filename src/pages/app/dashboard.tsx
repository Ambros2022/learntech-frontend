// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import axios1 from 'src/configs/axios'

import { ReactNode } from 'react'


// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

const Home = () => {
  console.log(axios1, "main");
  if (axios1.defaults.headers.common["x-access-token"]) {
    console.log("x-access-token header is set:", axios1.defaults.headers.common["x-access-token"]);
  } else {
    console.log("x-access-token header is not set.");
  }
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography sx={{ mb: 2 }}>Home</Typography>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  )
}



export default Home
