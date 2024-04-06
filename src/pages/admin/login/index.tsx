// ** React Imports
import { ChangeEvent, ReactNode, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CircularProgress from '@mui/material/CircularProgress'
// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import { useForm, Controller } from 'react-hook-form'

import { useAuth } from 'src/hooks/useAuth'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import AuthIllustrationV1Wrapper from 'src/views/pages/auth/AuthIllustrationV1Wrapper'

// ** Third Party Imports
import toast from 'react-hot-toast'
import Head from 'next/head'

interface State {
  password: string
  showPassword: boolean
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '25rem' }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))




interface FormInputs {
  email: string
  password: string

}

const defaultValues = {
  email: '',
  password: '',

}

const LoginV1 = () => {
  // ** State
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  })



  // ** States
  const [loading, setLoading] = useState<boolean>(false)
  const [state, setState] = useState<State>({
    password: '',
    showPassword: false
  })


  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }


  // ** Hooks
  const auth = useAuth()
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormInputs>({ defaultValues })


  const onSubmit = async (data: any) => {
    console.log(data, "data")
    setLoading(true)
    const { email, password } = data
    auth.login({ email, password }, (data) => {
      if (data.error) {
        toast.error(data.error)
        setLoading(false)
        return
      }
      setLoading(false)
    })

  }



  return (
    <>
      {/* <Head>
        <title>Login in India | Study Abroad | Learntech Edu Solutions</title>
        <meta
          name='description'
          content='Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad. Call us today!' />
        <meta name='keywords' content='Learntechweb' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head> */}
      <Box className='content-center'>
        <AuthIllustrationV1Wrapper>
          <Card>
            <CardContent sx={{ p: theme => `${theme.spacing(10.5, 8, 8)} !important` }}>
              <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Link href="/">
                  <img src='/images/logo.png' style={{ objectFit: "contain" }} alt='logo' width='200' height='100' /></Link>
                <Typography variant='h3' sx={{ ml: 2.5, fontWeight: 700 }}>
                  {themeConfig.templateName}
                </Typography>
              </Box>


              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <Controller
                      name='email'
                      control={control}
                      // rules={{ required: true }}
                      rules={{
                        required: 'email is required',
                        validate: {
                          noWhiteSpace: value => !/^\s*$/.test(value) || 'email cannot be empty or contain only whitespace'
                        }
                      }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          value={value}
                          label='Email'
                          onChange={onChange}
                          placeholder=''
                          error={Boolean(errors.email)}
                          aria-describedby='validation-async-first-name'
                          {...(errors.email && { helperText: 'The email is required' })} />
                      )} />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name='password'
                      control={control}
                      rules={{
                        required: 'Password is required',
                        validate: {
                          noWhiteSpace: value => !/^\s*$/.test(value) || 'email cannot be empty or contain only whitespace'
                        }
                      }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          value={value}
                          label='Password'
                          onChange={onChange}
                          id='validation-async-password'
                          error={Boolean(errors.password)}
                          type={values.showPassword ? 'text' : 'password'}
                          {...(errors.password && { helperText: 'This Password is required' })}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onClick={handleClickShowPassword}
                                  onMouseDown={e => e.preventDefault()}
                                  aria-label='toggle password visibility'
                                >
                                  <Icon fontSize='1.25rem' icon={values.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                                </IconButton>
                              </InputAdornment>
                            )
                          }} />
                      )} />
                  </Grid>

                  <Grid item xs={12}>
                    {/* <Typography component={LinkStyled} href='/forgot-password'>
      Forgot Password?
    </Typography> */}
                  </Grid>
                  <Grid item xs={12}>
                    <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>

                      Login
                      {loading ? (
                        <CircularProgress
                          sx={{
                            color: 'common.white',
                            width: '20px !important',
                            height: '20px !important',
                            mr: theme => theme.spacing(2)
                          }} />
                      ) : null}
                    </Button>
                  </Grid>
                </Grid>
              </form>

            </CardContent>
          </Card>
        </AuthIllustrationV1Wrapper>
      </Box></>
  )
}

LoginV1.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginV1.guestGuard = true

export default LoginV1
