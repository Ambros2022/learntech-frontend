'use client';
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
import { Alert, Typography } from '@mui/material'
import FileUpload from 'src/@core/components/dropzone/FileUpload';
import dynamic from 'next/dynamic'
import QuillEditor from 'src/@core/components/html-editor/index';


interface Authordata {
    olddata?: any;
    isAddMode: boolean;
}

// const DynamicJoditEditor = dynamic(() => import('jodit-react'), { ssr: false });ReactQuill

const AddEditForm: FC<Authordata> = ({ olddata, isAddMode, ...rest }) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState("")
    const [fileNamesphoto, setFileNamesphoto] = useState<any>([]);
    const [selectedphoto, setSelectedphoto] = useState('');

    const handleFileChangephoto = (files: any[]) => {
        setSelectedphoto(files[0]);
        setFileNamesphoto(
            files.map((file) => ({
                name: file.name,
                preview: URL.createObjectURL(file),
            }))
        );

    };

    const [fieldvalue, setEditorValue] = useState('');

    const handleEditorChange = (newValue) => {
        // Set the new value to editorValue state
        setEditorValue(newValue);
    };



    const schema: any = yup.object().shape({
        url: yup
            .string()
            .trim()
            .required(),
    })


    const defaultValues = {
        url: isAddMode ? '' : olddata.url,
        top_description: isAddMode ? '' : olddata.top_description,
        bottom_description: isAddMode ? '' : olddata.bottom_description,
        meta_title: isAddMode ? '' : olddata.meta_title,
        meta_description: isAddMode ? '' : olddata.meta_description,
        meta_keyword: isAddMode ? '' : olddata.meta_keyword,
    }

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
    } = useForm<any>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data: any) => {
        console.log(data, "data");
        // return

        if (!isAddMode && olddata.id) {
            let updateid = olddata.id;
            setLoading(true)
            let url = 'api/admin/page/update';
            const formData = new FormData();
            formData.append('id', updateid);
            formData.append('url', data.url);
            formData.append('top_description', data.top_description);
            formData.append('bottom_description', data.bottom_description);
            formData.append('meta_title', data.meta_title);
            formData.append('meta_description', data.meta_description);
            formData.append('meta_keyword', data.meta_keyword);

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
            let url = 'api/admin/page/add';

            const formData = new FormData();
            formData.append('url', data.url);
            formData.append('top_description', data.top_description);
            formData.append('bottom_description', data.bottom_description);
            formData.append('meta_title', data.meta_title);
            formData.append('meta_description', data.meta_description);
            formData.append('meta_keyword', data.meta_keyword);




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



    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} encType="application/x-www-form-urlencoded">
                <Grid container spacing={5}>

                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='url'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Url'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.url)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.url && { helperText: 'This field is required' })}
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
                                    value={value}
                                    multiline
                                    rows={3}
                                    label='Meta Title'
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
                                    label='Meta Description'
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
                            name='meta_keyword'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    multiline
                                    rows={3}
                                    label='Meta keyword'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.meta_keyword)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.meta_keyword && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                    <Typography style={{ marginBottom: '10px' }}>top Description</Typography>

                        <Controller
                            name='top_description'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <>
                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                    onChange={(value) => setValue("top_description", value)} />
                                {/* <QuillEditor placeholder='Start Writing...' initialValue={value}
                                //  onChange={(value)=>  setValue("bottom_description", value)} />
                                onChange={(value)=>console.log(value)} /> */}
                            </>
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <Typography style={{ marginBottom: '10px' }}>Bottom Description</Typography>
                        <Controller
                            name='bottom_description'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <>
                                    <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                        onChange={(value) => setValue("bottom_description", value)} />
                                    {/* <QuillEditor placeholder='Start Writing...' initialValue={value}
                                    //  onChange={(value)=>  setValue("bottom_description", value)} />
                                    onChange={(value)=>console.log(value)} /> */}
                                </>
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
