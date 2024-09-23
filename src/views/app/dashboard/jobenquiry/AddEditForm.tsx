// ** React Imports
import { Ref, useState, forwardRef, ReactElement, ChangeEvent, useEffect, useCallback } from 'react'
// ** MUI Imports
import CustomInput from 'src/@core/components/pickersCoustomInput/index'

import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { SelectChangeEvent } from '@mui/material/Select'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/router';
// ** Third Party Imports
import toast from 'react-hot-toast'
import * as yup from 'yup'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'
import axios1 from 'src/configs/axios'
import { yupResolver } from '@hookform/resolvers/yup'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import type { FC } from 'react';
import { useAuth } from 'src/hooks/useAuth'

import { Alert, FormControlLabel, FormLabel, RadioGroup, useTheme } from '@mui/material'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import FileUpload from 'src/@core/components/dropzone/FileUpload';



interface Authordata {
    olddata?: any;
    isAddMode: boolean;
}

const AddEditForm: FC<Authordata> = ({ olddata, isAddMode, ...rest }) => {
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false)
    const [superadmin, setSuperadmin] = useState<boolean>(true)
    const [error, setError] = useState("")
    const [schools, setSchools] = useState([])
    const [joblocations, setJoblocations] = useState([])
    const [jobposition, setJobPosition] = useState([])
    const isMountedRef = useIsMountedRef();
    const params: any = {}
    params['page'] = 1;
    params['size'] = 10000;
    const theme = useTheme()
    const { direction } = theme

    const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'



    const schema: any = yup.object().shape({
        name: yup
            .string()
            .trim()
            .required(),
        email: yup
            .string()
            .trim()
            .required(),
        resume: yup
            .string()
            .trim()
            .required(),
        current_location: yup
            .string()
            .trim()
            .required(),
        job_location_id: yup.object().required("This field is required"),
        jobs_position_id: yup.object().required("This field is required"),

    })

    const defaultValues = {
        name: isAddMode ? '' : olddata.name,
        email: isAddMode ? '' : olddata.email,
        phone: isAddMode ? '' : olddata.phone,
        d_o_b: isAddMode ? '' : olddata.d_o_b,
        // d_o_b: isAddMode ? null : new Date(olddata.d_o_b),
        current_location: isAddMode ? '' : olddata.current_location,
        total_exp: isAddMode ? '' : olddata.total_exp,

        status: isAddMode ? '' : olddata.status,
        job_location_id: isAddMode ? '' : olddata.alljoblocations,
        jobs_position_id: isAddMode ? '' : olddata.jobspositions,

    }

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<any>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    //get all job locations
    const getlocation = useCallback(async () => {

        try {
            const roleparams: any = {};
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/admin/alljoblocation/get', { params: roleparams });

            setJoblocations(response.data.data);

        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);


    //get all position
    const getposition = useCallback(async () => {

        try {
            const roleparams: any = {};
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/admin/jobsposition/get', { params: roleparams });

            setJobPosition(response.data.data);

        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);

    useEffect(() => {

        getlocation();
        getposition();

    }, [getlocation]);

    // const onSubmit = async (data: any) => {

    //     if (!isAddMode && olddata.id) {
    //         let updateid = olddata.id;
    //         setLoading(true)
    //         let url = 'api/admin/jobsenquires/update';
    //         let formData: any = {};
    //         formData.id = updateid;
    //         formData.name = data.name;
    //         formData.email = data.email;
    //         formData.phone = data.phone;
    //         formData.d_o_b = data.d_o_b;
    //         formData.current_location = data.current_location;
    //         formData.total_exp = data.total_exp;
    //         formData.resume = data.resume;
    //         formData.status = data.status;
    //         formData.job_location_id = data.job_location_id.id;
    //         formData.jobs_position_id = data.jobs_position_id.id;

    //         try {
    //             let response = await axios1.post(url, formData)
    //             if (response.data.status == 1) {
    //                 toast.success(response.data.message)
    //                 setLoading(false)
    //                 setError('')
    //                 reset();
    //                 router.back();
    //             }
    //             else {
    //                 setLoading(false)
    //                 toast.error(response.data.message)
    //                 setError(response.data.message)
    //             }

    //         } catch (err: any) {
    //             console.error(err);
    //             setLoading(false)
    //             if (err.errors && err.errors.length > 0) {
    //                 const errorMessage = err.errors[0].msg;
    //                 setError(errorMessage || "Please try again");
    //                 toast.error(errorMessage || "Please try again");
    //             } else {
    //                 setError(err.message || "Please try again");
    //                 toast.error(err.message || "Please try again");
    //             }

    //         }
    //     } else {
    //         setLoading(true)
    //         let url = 'api/admin/jobsenquires/add';
    //         let formData: any = {};
    //         formData.job_location_id = data.job_location_id.id;
    //         formData.jobs_position_id = data.jobs_position_id.id;
    //         formData.name = data.name;
    //         formData.email = data.email;
    //         formData.phone = data.phone;
    //         formData.d_o_b = data.d_o_b;
    //         formData.current_location = data.current_location;
    //         formData.total_exp = data.total_exp;
    //         formData.resume = data.resume;
    //         formData.status = data.status;

    //         try {
    //             let response = await axios1.post(url, formData)
    //             // console.log(response, "response")

    //             if (response.data.status == 1) {
    //                 // console.log("response.data", response.data)
    //                 toast.success(response.data.message)
    //                 setLoading(false)
    //                 setError('')
    //                 reset();
    //                 router.push('./');


    //             }
    //             else {
    //                 setLoading(false)
    //                 toast.error(response.data.message)
    //                 setError(response.data.message)
    //             }
    //         } catch (err: any) {
    //             setLoading(false)
    //             if (err.errors && err.errors.length > 0) {
    //                 const errorMessage = err.errors[0].msg;
    //                 setError(errorMessage || "Please try again");
    //                 toast.error(errorMessage || "Please try again");
    //             } else {
    //                 setError(err.message || "Please try again");
    //                 toast.error(err.message || "Please try again");
    //             }

    //         }
    //     }
    // }


    const handleFilechange = () => {

        return ("")
    }
    return (
        <>
            <form encType="application/x-www-form-urlencoded">
                <Grid container spacing={5}>


                    <Grid item xs={12} sm={4}>
                        <Controller
                            name='job_location_id'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <CustomAutocomplete
                                    fullWidth

                                    options={joblocations}
                                    loading={!joblocations.length}
                                    value={field.value}
                                    onChange={(event, newValue) => {
                                        field.onChange(newValue);
                                    }}
                                    getOptionLabel={(option: any) => option.name || ''}
                                    renderInput={(params: any) => (
                                        <CustomTextField
                                            {...params}
                                            required
                                            error={Boolean(errors.job_location_id)}
                                            {...(errors.job_location_id && { helperText: 'This field is required' })}
                                            label='Select Job Location'
                                        />
                                    )}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Controller
                            name='jobs_position_id'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <CustomAutocomplete
                                    fullWidth

                                    options={jobposition}
                                    loading={!jobposition.length}
                                    value={field.value}
                                    onChange={(event, newValue) => {
                                        field.onChange(newValue);
                                    }}
                                    getOptionLabel={(option: any) => option.name || ''}
                                    renderInput={(params: any) => (
                                        <CustomTextField
                                            {...params}
                                            required
                                            error={Boolean(errors.jobs_position_id)}
                                            {...(errors.jobs_position_id && { helperText: 'This field is required' })}
                                            label='Select Job Position'
                                        />
                                    )}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Controller
                            name='name'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Name'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.name)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.name && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Controller
                            name='email'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Email'
                                    onChange={onChange}
                                    placeholder='example@mail.com'
                                    error={Boolean(errors.email)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.email && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Controller
                            name='phone'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Phone'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.phone)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.phone && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Controller
                            name='current_location'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Current Location'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.current_location)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.current_location && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Controller
                            name='total_exp'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Total Experience'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.total_exp)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.total_exp && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>


                    <Grid item xs={12} sm={4}>
                        <Controller
                            name='d_o_b'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Date of birth'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.d_o_b)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.d_o_b && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>


                    <Grid item xs={12} sm={4}>
                        <FileUpload
                            isAddMode={isAddMode}
                            olddata={!isAddMode && olddata.resume ? olddata.resume : ""}
                            onFileChange={handleFilechange}
                            maxFiles={1}
                            maxSize={2000000}
                            fileNames={""}
                            label="View Resume"

                        />
                    </Grid>


                    {/* <Grid item xs={12} sm={4}>
                        <FormLabel component='legend' style={{ marginBottom: 0 }}>Select status</FormLabel>
                        <Controller
                            name='status'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <RadioGroup row aria-label='controlled' name='controlled' value={value} onChange={onChange}>
                                    <FormControlLabel value='Draft' control={<Radio />} label='Draft' />
                                    <FormControlLabel value='Published' control={<Radio />} label='Published' />
                                </RadioGroup>
                            )}
                        />

                    </Grid> */}



                    <Grid item xs={12}>
                        {error && <Alert severity='error'>{error}</Alert>}
                    </Grid>

                    {/* <Grid item xs={12}>
                        <DialogActions
                            sx={{
                                justifyContent: 'center',
                                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                                pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                            }}
                        >

                            <Button variant='contained' type='submit' sx={{ mr: 1 }} >

                                Submit
                                {loading ? (
                                    <CircularProgress
                                        sx={{
                                            color: 'common.white',
                                            width: '20px !important',
                                            height: '20px !important',
                                            mr: theme => theme.spacing(2)
                                        }}
                                    />
                                ) : null}
                            </Button>

                        </DialogActions>
                    </Grid> */}
                </Grid>
            </form >
        </>
    )
}

export default AddEditForm
