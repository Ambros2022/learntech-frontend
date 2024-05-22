// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Fab from '@mui/material/Fab'
import Button from '@mui/material/Button'
import Link from 'next/link'
import AddEditFormnew from 'src/views/app/dashboard/scholar_level/AddEditForm'
import CardContent from '@mui/material/CardContent'
import NotAuthorized from 'src/pages/401'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
// ** React Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useState, useEffect, useContext } from 'react';

const Adduserlayout = () => {
    const ability = useContext(AbilityContext)
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
                    <h5>Add Scholar_level Details</h5>
                    <Link href={`./`} >
                        <Button variant='contained'>View All scholar_level</Button>
                    </Link>
                </Box>
                <CardContent>
                  
                    <AddEditFormnew isAddMode={true} />
                </CardContent>
            </Card>
            <Grid container spacing={6}>

            </Grid >

        </>
    )
}

export default Adduserlayout
