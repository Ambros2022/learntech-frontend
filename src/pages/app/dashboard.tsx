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
  // console.log(axios1, "main");
  if (axios1.defaults.headers.common["x-access-token"]) {
    console.log("x-access-token header is set:", axios1.defaults.headers.common["x-access-token"]);
  } else {
    // console.log("x-access-token header is not set.");
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardHeader title="Card 1" />
          <CardContent>
            <Typography variant="body1" color="textSecondary">
              College
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardHeader title="Card 2" />
          <CardContent>
            <Typography variant="body1" color="textSecondary">
              Content for Card 2
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardHeader title="Card 3" />
          <CardContent>
            <Typography variant="body1" color="textSecondary">
              Content for Card 3
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardHeader title="Card 4" />
          <CardContent>
            <Typography variant="body1" color="textSecondary">
              Content for Card 4
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Home
