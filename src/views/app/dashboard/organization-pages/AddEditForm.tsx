
'use client'
import { ChangeEvent, FC, forwardRef, SyntheticEvent, useCallback, useEffect, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TabContext from '@mui/lab/TabContext'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import { SelectChangeEvent } from '@mui/material/Select'
import InputAdornment from '@mui/material/InputAdornment'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
// ** Third Party Imports
import DatePicker from 'react-datepicker'
import CircularProgress from '@mui/material/CircularProgress'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import CustomSelectField from 'src/@core/components/mui/select-feild'

// ** Types
// import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios1 from 'src/configs/axios'
import { Checkbox, DialogActions, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import FileUpload from 'src/@core/components/dropzone/FileUpload';
import { FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast'
import router from 'next/router'
import { Config } from 'src/configs/mainconfig'
import ImageUploading, { ImageListType } from "react-images-uploading";
import useIsMountedRef from 'src/hooks/useIsMountedRef'
import QuillEditor from 'src/@core/components/html-editor/index';
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon
import StepsFormContainer from '../stepsFormContainer'





interface Authordata {
    olddata?: any;
    isAddMode: boolean;
}

const AddEditForm: FC<Authordata> = ({ olddata, isAddMode, ...rest }) => {
    // ** States
    // const { setValue } = useForm();
    const [formvalue, setFormvalue] = useState<string>('basic-info')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState("")
    const [countries, setCountries] = useState([])
    const [streamId, setStreamId] = useState<any>(isAddMode ? "" : olddata?.stream?.id || '');
    const [fileNamesphoto, setFileNamesphoto] = useState<any>([]);
    const [selectedphoto, setSelectedphoto] = useState('');
    const isMountedRef = useIsMountedRef();




    const handleFileChangephoto = (files: any[]) => {
        setSelectedphoto(files[0]);
        setFileNamesphoto(
            files.map((file) => ({
                name: file.name,
                preview: URL.createObjectURL(file),
            }))
        );

    };


    const schema: any = yup.object().shape({
        title: yup
            .string()
            .trim()
            .required(),
        categories: yup
            .string()
            .trim()
            .required(),
        content: yup
            .string()
            .trim()
            .required(),
        // meta_title: yup
        //     .string()
        //     .trim()
        //     .required(),
        // meta_description: yup
        //     .string()
        //     .trim()
        //     .required(),
        // meta_keyword: yup
        //     .string()
        //     .trim()
        //     .required(),
    })


    const defaultValues = {
        title: isAddMode ? '' : olddata.title,
        categories: isAddMode ? '' : olddata.categories,
        // slug: isAddMode ? '' : olddata.slug,
        content: isAddMode ? '' : olddata.content,
        // meta_title: isAddMode ? '' : olddata.meta_title,
        // meta_description: isAddMode ? '' : olddata.meta_description,
        // meta_keyword: isAddMode ? '' : olddata.meta_keyword,
        status: isAddMode ? 'Published' : olddata.status,

    }



    const {
        control,
        handleSubmit,
        resetField: admfiledReset,
        reset,
        setValue,
        formState: { errors }
    } = useForm<any>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    const stepsSchema: any = yup.object().shape({
        title: yup
            .string()
            .trim()
        //     .required(),
        // categories: yup
        //     .string()
        //     .trim()
        //     .required(),
        // content: yup
        //     .string()
        //     .trim()
        //     .required(),
        // meta_title: yup
        //     .string()
        //     .trim()
        //     .required(),
        // meta_description: yup
        //     .string()
        //     .trim()
        //     .required(),
        // meta_keyword: yup
        //     .string()
        //     .trim()
        //     .required(),
    })

    const onSubmit = async (data: any) => {

        if (!isAddMode && olddata.id) {
            let updateid = olddata.id;
            setLoading(true)
            let url = 'api/admin/organizationpage/update';
            const formData = new FormData();
            formData.append('id', updateid);
            formData.append('categories', data.categories);
            formData.append('content', data.content);
            formData.append('title', data.title);
            // formData.append('status', data.status);
            // formData.append('meta_title', data.meta_title);
            // formData.append('meta_description', data.meta_description);
            // formData.append('meta_keyword', data.meta_keyword);
            // formData.append('backgroundimage', selectedphoto);

            try {
                let response = await axios1.post(url, formData)
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                    setLoading(false)
                    setError('')
                    reset();
                    router.back();
                }
                else {
                    setLoading(false)
                    toast.error(response.data.message)
                    setError(response.data.message)
                }

            } catch (err: any) {

                setLoading(false)
                if (err.errors && err.errors.length > 0) {
                    const errorMessage = err.errors[0].msg;
                    setError(errorMessage || "Please try again");
                    toast.error(errorMessage || "Please try again");
                } else {
                    setError(err.message || "Please try again");
                    toast.error(err.message || "Please try again");
                }

            }
        } else {
            setLoading(true)
            let url = 'api/admin/organizationpage/add';

            const formData = new FormData();
            formData.append('categories', data.categories);
            formData.append('title', data.title);
            // formData.append('slug', data.slug);
            formData.append('content', data.content);
            // formData.append('status', data.status);
            // formData.append('meta_title', data.meta_title);
            // formData.append('meta_description', data.meta_description);
            // formData.append('meta_keyword', data.meta_keyword);
            // if (selectedphoto == '') {

            //     toast.error('Please Upload Icon', {
            //         duration: 2000
            //     })
            //     setLoading(false);
            //     return false;

            // }
            // formData.append('backgroundimage', selectedphoto);

            try {
                let response = await axios1.post(url, formData)
                console.log(response, "response")

                if (response.data.status == 1) {

                    toast.success(response.data.message)
                    setLoading(false)
                    setError('')
                    reset();
                    router.push('./');


                }
                else {
                    setLoading(false)
                    toast.error(response.data.message)
                    setError(response.data.message)
                }
            } catch (err: any) {
                console.error(err);
                setLoading(false)
                if (err.errors && err.errors.length > 0) {
                    const errorMessage = err.errors[0].msg;
                    setError(errorMessage || "Please try again");
                    toast.error(errorMessage || "Please try again");
                } else {
                    setError(err.message || "Please try again");
                    toast.error(err.message || "Please try again");
                }

            }
        }
    }

    const stepsDefaultValues = {
        title: isAddMode ? '' : olddata.title,
        description: isAddMode ? '' : olddata.description,
        // slug: isAddMode ? '' : olddata.slug,
        icon: isAddMode ? '' : olddata.icon,
        order_by: isAddMode ? '' : olddata.order_by,
        // meta_title: isAddMode ? '' : olddata.meta_title,
        // meta_description: isAddMode ? '' : olddata.meta_description,
        // meta_keyword: isAddMode ? '' : olddata.meta_keyword,
        // order_by: isAddMode ? 'Published' : olddata.order_by,

    }

    const onStepsSubmit = async (data: any) => {

        if (!isAddMode && olddata.id && olddata.description) {
            let updateid = olddata.id;
            setLoading(true)
            let url = 'api/admin/organizationpagesteps/update';
            const formData = new FormData();
            formData.append('id', updateid);
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('icon', data.icon);
            formData.append('order_by', data.order_by);
            // formData.append('status', data.status);
            // formData.append('meta_title', data.meta_title);
            // formData.append('meta_description', data.meta_description);
            // formData.append('meta_keyword', data.meta_keyword);
            // formData.append('backgroundimage', selectedphoto);

            try {
                let response = await axios1.post(url, formData)
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                    setLoading(false)
                    setError('')
                    stepsReset();
                    router.back();
                }
                else {
                    setLoading(false)
                    toast.error(response.data.message)
                    setError(response.data.message)
                }

            } catch (err: any) {

                setLoading(false)
                if (err.errors && err.errors.length > 0) {
                    const errorMessage = err.errors[0].msg;
                    setError(errorMessage || "Please try again");
                    toast.error(errorMessage || "Please try again");
                } else {
                    setError(err.message || "Please try again");
                    toast.error(err.message || "Please try again");
                }

            }
        } else {
            setLoading(true)
            let url = 'api/admin/organizationpagesteps/add';

            const formData = new FormData();
            // formData.append('categories', data.categories);
            formData.append('title', data.title);
            formData.append('order_by', data.order_by);
            formData.append('description', data.description);
            formData.append('icon', data.icon);
            // formData.append('meta_title', data.meta_title);
            // formData.append('meta_description', data.meta_description);
            // formData.append('meta_keyword', data.meta_keyword);
            // if (selectedphoto == '') {

            //     toast.error('Please Upload Icon', {
            //         duration: 2000
            //     })
            //     setLoading(false);
            //     return false;

            // }
            // formData.append('backgroundimage', selectedphoto);

            try {
                let response = await axios1.post(url, formData)
                console.log(response, "response")

                if (response.data.status == 1) {

                    toast.success(response.data.message)
                    setLoading(false)
                    setError('')
                    stepsReset();
                    router.push('./');


                }
                else {
                    setLoading(false)
                    toast.error(response.data.message)
                    setError(response.data.message)
                }
            } catch (err: any) {
                console.error(err);
                setLoading(false)
                if (err.errors && err.errors.length > 0) {
                    const errorMessage = err.errors[0].msg;
                    setError(errorMessage || "Please try again");
                    toast.error(errorMessage || "Please try again");
                } else {
                    setError(err.message || "Please try again");
                    toast.error(err.message || "Please try again");
                }

            }
        }
    }

    const {
        control: stepsControl,
        handleSubmit: handleStepsSubmit,
        resetField: stepsResetField,
        reset: stepsReset,
        setValue: stepsSetValue,
        formState: { errors: stepsErrors }
    } = useForm<any>({
        defaultValues: stepsDefaultValues,
        mode: 'onChange',
        resolver: yupResolver(stepsSchema)
    })



    const handleTabsChange = (event: SyntheticEvent, newValue: string) => {
        setFormvalue(newValue)
    }

    return (
        <Card>
            <TabContext value={formvalue}>
                <TabList
                    variant='scrollable'
                    scrollButtons={false}
                    onChange={handleTabsChange}
                    sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}`, '& .MuiTab-root': { py: 3.5 } }}
                >
                    <Tab value='basic-info' label='Basic Info' />
                    <Tab value='steps-details' label='Steps' />
                    {/* <Tab value='social-links' label='Gallery Images' /> */}
                </TabList>

                <CardContent>
                    <TabPanel sx={{ p: 0 }} value='basic-info'>
                        <form onSubmit={handleSubmit(onSubmit)} encType="application/x-www-form-urlencoded">
                            <Grid container spacing={5}>

                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name='categories'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomSelectField
                                                label="Select Categories"
                                                value={value}
                                                onChange={onChange}
                                                labelId="categories-label"
                                                error={Boolean(errors.categories)}
                                            >
                                                <MenuItem value="Streams">Streams</MenuItem>
                                                <MenuItem value="Courses">Courses</MenuItem>
                                                <MenuItem value="Exams">Exams</MenuItem>
                                                <MenuItem value="Study_Abroad">Study Abroad</MenuItem>
                                            </CustomSelectField>
                                        )}
                                    />
                                    {errors.type && (
                                        <FormHelperText>
                                            {errors.type.message as React.ReactNode}
                                        </FormHelperText>
                                    )}
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name='title'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                value={value}
                                                label='title'
                                                onChange={onChange}
                                                placeholder=''
                                                error={Boolean(errors.title)}
                                                aria-describedby='validation-basic-title'
                                                {...(errors.title && { helperText: 'This field is required' })}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <Typography style={{ marginBottom: '10px' }}>Content</Typography>

                                    <Controller
                                        name='content'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("content", value)} />
                                                {/* <QuillEditor placeholder='Start Writing...' initialValue={value}
                                //  onChange={(value)=>  setValue("bottom_description", value)} />
                                onChange={(value)=>console.log(value)} /> */}
                                            </>
                                        )}
                                    />
                                </Grid>


                                {/* <Grid item xs={12} sm={3}>
                                    <FileUpload
                                        isAddMode={isAddMode}
                                        olddata={!isAddMode && olddata.backgroundimage ? olddata.backgroundimage : ""}
                                        onFileChange={handleFileChangephoto}
                                        maxFiles={1}
                                        maxSize={2000000}
                                        fileNames={fileNamesphoto}
                                        label=" Upload Image"
                                        acceptedFormats={['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.pdf']}
                                        rejectionMessage='Try another file for upload.'
                                    />
                                </Grid> */}

                                {/* <Grid item xs={12} sm={6}>
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


                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>

                                    <Button type='submit' variant='contained'>
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
                                </Grid>
                            </Grid>
                        </form >
                    </TabPanel>

                    <TabPanel sx={{ p: 0 }} value='steps-details'>
                        {isAddMode ? <> <h6>Please add Organization Page Details First.</h6> </> : <>
                            <StepsFormContainer
                                isAddMode={isAddMode}
                                olddata={olddata}
                            />
                        </>}

                    </TabPanel>


                </CardContent>
                {/* <Divider sx={{ m: '0 !important' }} /> */}
                {/* <CardActions>
                    <Button type='submit' sx={{ mr: 2 }} variant='contained'>
                        Submit
                    </Button>
                    <Button type='reset' variant='tonal' color='secondary'>
                        Reset
                    </Button>
                </CardActions> */}
                {/* </form> */}
            </TabContext>
        </Card>
    )
}

export default AddEditForm
