
import { Ref, useState, forwardRef, ReactElement, ChangeEvent, useEffect, useCallback } from 'react'
// ** MUI Imports
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
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'
import axios1 from 'src/configs/axios'
import { yupResolver } from '@hookform/resolvers/yup'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

import type { FC } from 'react';
import { Alert, FormControlLabel, FormLabel, MenuItem, RadioGroup, Typography } from '@mui/material'
import FileUpload from 'src/@core/components/dropzone/FileUpload';
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import useIsMountedRef from 'src/hooks/useIsMountedRef'
import QuillEditor from 'src/@core/components/html-editor/index';


interface Authordata {
    olddata?: any;
    isAddMode: boolean;
}

const AddEditForm: FC<Authordata> = ({ olddata, isAddMode, ...rest }) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState("")
    const [fileNamesphoto, setFileNamesphoto] = useState<any>([]);
    const [selectedphoto, setSelectedphoto] = useState('');

    const [fileNamespdf, setFileNamespdf] = useState<any>([]);
    const [selectedpdf, setSelectedpdf] = useState('');
    const [category, setCategory] = useState([]);
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

    const handleFileChangepdf = (files: any[]) => {
        setSelectedpdf(files[0]);
        setFileNamespdf(
            files.map((file) => ({
                name: file.name,
                preview: URL.createObjectURL(file),
            }))
        );

    };


    const schema: any = yup.object().shape({
        slug: yup
            .string()
            .trim()
            .required(),
        name: yup
            .string()
            .trim()
            .required(),
        meta_title: yup
            .string()
            .trim()
            .required(),
        meta_description: yup
            .string()
            .trim()
            .required(),
        meta_keywords: yup
            .string()
            .trim()
            .required(),

        category_id: yup.object().required("This field is required"),
        pdf_name: yup.string()
            .trim()
            .required(),

    })

    const defaultValues = {
        slug: isAddMode ? '' : olddata.slug,
        category_id: isAddMode ? '' : olddata.newscategories,
        meta_title: isAddMode ? '' : olddata.meta_title,
        name: isAddMode ? '' : olddata.name,
        pdf_name: isAddMode ? '' : olddata.pdf_name,
        meta_description: isAddMode ? '' : olddata.meta_description,
        meta_keywords: isAddMode ? '' : olddata.meta_keywords,
        overview: isAddMode ? '' : olddata.overview,
        status: isAddMode ? 'Published' : olddata.status,
    }

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm<any>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data: any) => {

        if (!isAddMode && olddata.id) {
            let updateid = olddata.id;
            setLoading(true)
            let url = 'api/admin/newsevents/update';
            const formData = new FormData();
            formData.append('id', updateid);
            formData.append('slug', data.slug);
            formData.append('name', data.name);
            formData.append('pdf_name', data.pdf_name);
            formData.append('category_id', data.category_id.id);
            formData.append('status', data.status);
            formData.append('meta_title', data.meta_title);
            formData.append('meta_description', data.meta_description);
            formData.append('meta_keywords', data.meta_keywords);
            formData.append('overview', data.overview);
            formData.append('pdf_file', selectedpdf);
            formData.append('banner_image', selectedphoto);
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
            let url = 'api/admin/newsevents/add';

            const formData = new FormData();
            formData.append('slug', data.slug);
            formData.append('name', data.name);
            formData.append('pdf_name', data.pdf_name);
            formData.append('category_id', data.category_id.id);
            formData.append('status', data.status);
            formData.append('meta_title', data.meta_title);
            formData.append('meta_description', data.meta_description);
            formData.append('meta_keywords', data.meta_keywords);
            formData.append('overview', data.overview);
            if (selectedphoto == '') {

                toast.error('Please Upload Photo', {
                    duration: 2000
                })
                setLoading(false);
                return false;

            }

            formData.append('banner_image', selectedphoto);
            // if (selectedpdf == '') {

            //     toast.error('Please Upload Pdf', {
            //         duration: 2000
            //     })
            //     setLoading(false);
            //     return false;

            // }
            formData.append('pdf_file', selectedpdf);

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

    //get all Catogry
    const getcategory = useCallback(async () => {

        try {
            const roleparams: any = {};
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/admin/newscategories/get', { params: roleparams });

            setCategory(response.data.data);

        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);

    useEffect(() => {

        getcategory();

    }, [getcategory]);



    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} encType="application/x-www-form-urlencoded">
                <Grid container spacing={5}>

                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='category_id'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <CustomAutocomplete
                                    fullWidth

                                    options={category}
                                    loading={!category.length}
                                    value={field.value}
                                    onChange={(event, newValue) => {
                                        field.onChange(newValue);
                                    }}
                                    getOptionLabel={(option: any) => option.name || ''}
                                    renderInput={(params: any) => (
                                        <CustomTextField
                                            {...params}
                                            required
                                            error={Boolean(errors.category_id)}
                                            {...(errors.category_id && { helperText: 'This field is required' })}
                                            label='Select Category'
                                        />
                                    )}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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

                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='slug'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Slug'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.slug)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.slug && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>



                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='meta_title'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={value}
                                    label='Title'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.meta_title)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.meta_title && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='meta_description'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={value}
                                    label='Description'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.meta_description)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.meta_description && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='meta_keywords'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={value}
                                    label='keywords'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.meta_keywords)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.meta_keywords && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography style={{ marginBottom: '10px' }}>overview</Typography>

                        <Controller
                            name='overview'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <>
                                    <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                        onChange={(value) => setValue("overview", value)} />
                                    {/* <QuillEditor placeholder='Start Writing...' initialValue={value}
                                //  onChange={(value)=>  setValue("bottom_description", value)} />
                                onChange={(value)=>console.log(value)} /> */}
                                </>
                            )}
                        />
                    </Grid>




                    <Grid item xs={12} sm={4}>
                        <FileUpload
                            isAddMode={isAddMode}
                            olddata={!isAddMode && olddata.banner_image ? olddata.banner_image : ""}
                            onFileChange={handleFileChangephoto}
                            maxFiles={1}
                            maxSize={2000000}
                            fileNames={fileNamesphoto}
                            label=" Upload  Image"
                            acceptedFormats={['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.pdf']}
                            rejectionMessage='Try another file for upload.'
                        />
                    </Grid>


                    <Grid item xs={12} sm={4}>
                        <FileUpload
                            isAddMode={isAddMode}
                            olddata={!isAddMode && olddata.pdf_file ? olddata.pdf_file : ""}
                            onFileChange={handleFileChangepdf}
                            maxFiles={1}
                            maxSize={2000000}
                            fileNames={fileNamespdf}
                            label=" Upload Pdf"
                            acceptedFormats={['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.pdf']}
                            rejectionMessage='Try another file for upload.'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='pdf_name'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Pdf Name'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.pdf_name)}
                                    aria-describedby='validation-basic-pdf-name'
                                    {...(errors.pdf_name && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
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

                    </Grid>

                    <Grid item xs={12}>
                        {error ? <Alert severity='error'>{error}</Alert> : null}
                    </Grid>

                    <Grid item xs={12}>
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
                    </Grid>
                </Grid>
            </form >
        </>
    )
}

export default AddEditForm
