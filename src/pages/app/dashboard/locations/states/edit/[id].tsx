// ** React Imports
import { Ref, useState, forwardRef, ReactElement, ChangeEvent, useEffect, useCallback } from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Link from 'next/link'
import AddEditForm from 'src/views/app/dashboard/locations/states/AddEditForm'
import CardContent from '@mui/material/CardContent'
import { useRouter } from 'next/router'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios1 from 'src/configs/axios'
// import Resetpasswordform from 'src/views/users/ResetPassword'
import LinearProgress from '@mui/material/LinearProgress'
import NotAuthorized from 'src/pages/401'
import Grid from '@mui/material/Grid';
// ** React Imports
import { useContext } from 'react'
import { AbilityContext } from 'src/layouts/components/acl/Can'


const Edituserlayout = () => {
  const isMountedRef = useIsMountedRef();
  const router = useRouter();
  const { id } = router.query;
  const isAddMode = !id;
  const [olddata, setolddata] = useState<any>(null);
  const [formloading, setFormloading] = useState(true);
  const ability = useContext(AbilityContext)

  //get old data
  const getolddata = useCallback(async () => {
    try {
      // this route needs to be swapped out to /Patient/, but it's currently returning 500
      const response = await axios1.get('api/admin/state/get/' + id);
      // console.log(response);

      if (isMountedRef.current) {
        setolddata(response.data.data);
        setFormloading(false);
      }
    } catch (err) {
      console.error(err);
    }


  }, [isMountedRef]);



  useEffect(() => {

    getolddata();
  }, []);

  return (
    <>

        <Card>
          <Box
            sx={{
              gap: 2,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: theme => theme.spacing(2, 5, 4, 5)
            }}
          >
            <h2>Edit States</h2>
            {/* {formloading ? "" : <Resetpasswordform olddata={olddata} />} */}

            <Link href={`../`} >
              <Button variant='contained'>View All States</Button>
            </Link>
          </Box>
          <CardContent>

            {formloading ? <LinearProgress /> : <AddEditForm olddata={olddata} isAddMode={isAddMode} />}

          </CardContent>
        </Card>
    </>
  )
}

export default Edituserlayout