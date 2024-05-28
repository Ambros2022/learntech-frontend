// ** React Imports
import { ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'

// ** Demo Imports
import Error404Page from 'src/views/Error404Page'

const Error404 = () => {
  return (
    <Error404Page />
  )
}

Error404.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

export default Error404
