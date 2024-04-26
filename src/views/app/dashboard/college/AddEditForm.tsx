
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
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'


import type { FC } from 'react';
import { Alert, FormControlLabel, FormLabel, MenuItem, RadioGroup } from '@mui/material'
import FileUpload from 'src/@core/components/dropzone/FileUpload';
import useIsMountedRef from 'src/hooks/useIsMountedRef'



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
    const [fileNameslogo, setFileNameslogo] = useState<any>([]);
    const [selectedlogo, setSelectedlogo] = useState('');
    
    
    const [countryId, setCountryId] = useState<any>(isAddMode ? "" : olddata?.country?.id || '');
    const [stateId, setStateId] = useState<any>(isAddMode ? "" : olddata?.state?.id || '');
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [countries, setCountries] = useState([])

    const [fileNamesbanner, setFileNamesbanner] = useState<any>([]);
    const [selectedbanner, setSelectedbanner] = useState('');
   

    const isMountedRef = useIsMountedRef();


    const handleFileChangebanner = (files: any[]) => {
        setSelectedbanner(files[0]);
        setFileNamesbanner(
            files.map((file) => ({
                name: file.name,
                preview: URL.createObjectURL(file),
            }))
        );

    };

    const handleFileChangelogo = (files: any[]) => {
        setSelectedlogo(files[0]);
        setFileNamesbanner(
            files.map((file) => ({
                name: file.name,
                preview: URL.createObjectURL(file),
            }))
        );

    };

    const handleFileChangephoto = (files: any[]) => {
        setSelectedphoto(files[0]);
        setFileNameslogo(
            files.map((file) => ({
                name: file.name,
                preview: URL.createObjectURL(file),
            }))
        );

    };

    const schema: any = yup.object().shape({
        name: yup
            .string()
            .trim()
            .required(),
        sub_stream_slug: yup
            .string()
            .trim()
            .required(),
    })

    const defaultValues = {
        name: isAddMode ? '' : olddata.name,
        sub_stream_slug: isAddMode ? '' : olddata.sub_stream_slug,
        sub_stream_description: isAddMode ? '' : olddata.sub_stream_description,
        stream_id: isAddMode ? '' : olddata.stream,
    }

    const {
        control,
        handleSubmit,
        resetField: admfiledReset,
        reset,
        formState: { errors }
    } = useForm<any>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    })


    const getcities = useCallback(async () => {
        setCities([]);
        try {
            const roleparams: any = {}
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            roleparams['state_id'] = stateId;
            const response = await axios1.get('/api/admin/city/get', { params: roleparams });
            setCities(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, [stateId]);

    useEffect(() => {
        if (stateId) {
            getcities();
        }
    }, [stateId]);

    //get all countries
    const getstates = useCallback(async () => {
        setStates([]);
        try {
            const roleparams: any = {}
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            roleparams['country_id'] = countryId;
            const response = await axios1.get('/api/admin/state/get', { params: roleparams });
            setStates(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, [countryId]);

    useEffect(() => {
        if (countryId) {
            getstates();
        }
    }, [countryId]);


    //get all countries
    const getcountries = useCallback(async () => {

        try {
            const roleparams: any = {};
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/admin/countries/get', { params: roleparams });

            setCountries(response.data.data);

        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);

    useEffect(() => {

        getcountries();

    }, [getcountries]);


    const onSubmit = async (data: any) => {

        if (!isAddMode && olddata.id) {
            let updateid = olddata.id;
            setLoading(true)
            let url = 'api/admin/substream/update';
            const formData = new FormData();
            formData.append('id', updateid);
            formData.append('name', data.name);
            formData.append('sub_stream_slug', data.sub_stream_slug);
            formData.append('sub_stream_description', data.sub_stream_description);
            formData.append('stream_id', data.stream_id.id);

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
            let url = 'api/admin/College/add';

            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('slug', data.slug);
            formData.append('type', data.type);
            formData.append('status', data.status);
            formData.append('home_view_status', data.home_view_status);
            formData.append('college_type', data.college_type);
            formData.append('listing_order', data.listing_order);
            formData.append('established', data.established);
            formData.append('meta_title', data.meta_title);
            formData.append('meta_description', data.meta_description);
            formData.append('address', data.address);
            formData.append('map', data.map);
            formData.append('video_url', data.video_url);
            formData.append('avg_rating', data.avg_rating);
            formData.append('info', data.info);
            formData.append('admissions', data.admissions);
            formData.append('placements', data.placements);
            formData.append('ranking', data.ranking);
            formData.append('Scholarships', data.Scholarships);
            formData.append('hostel', data.hostel);
            formData.append('country_id', data.country_id);
            formData.append('state_id', data.state_id);
            formData.append('city_id', data.city_id.id);
            formData.append('city_id', data.city_id.id);

            formData.append('banner_image', selectedbanner);
            formData.append('icon', selectedphoto);
            formData.append('logo', selectedlogo);

         

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
                                        name='country_id'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <CustomAutocomplete
                                                fullWidth
                                                options={countries}
                                                loading={!countries.length}
                                                value={field.value}
                                                onChange={(event, newValue) => {
                                                    if (newValue) {

                                                        setCountryId(newValue ? newValue.id : null);
                                                        admfiledReset("state_id", { defaultValue: "New" })
                                                        admfiledReset("city_id", { defaultValue: "New" })
                                                        field.onChange(newValue);



                                                    }
                                                    else {
                                                        console.log(newValue, "newValue2")

                                                        setCountryId(null);

                                                        admfiledReset("state_id", { defaultValue: "New" })
                                                        admfiledReset("city_id", { defaultValue: "New" })



                                                    }

                                                }}
                                                getOptionLabel={(option: any) => option.name || ''}
                                                renderInput={(params: any) => <CustomTextField {...params} error={Boolean(errors.country_id)}
                                                    {...(errors.country_id && { helperText: 'This field is required' })} label='Select Country' />}
                                            />
                                        )}
                                    />
                </Grid>

                   <Grid item xs={12} sm={6}>

                                    <Controller
                                        name='state_id'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <CustomAutocomplete
                                                fullWidth
                                                options={states}
                                                loading={!states.length}
                                                value={field.value}
                                                onChange={(event, newValue) => {
                                                    if (newValue) {
                                                        setStateId(newValue ? newValue.id : null);
                                                        admfiledReset("city_id", { defaultValue: "New" })
                                                        field.onChange(newValue);



                                                    }
                                                    else {


                                                        setStateId(null);
                                                        admfiledReset("setStateId", { defaultValue: "New" })



                                                    }

                                                }}
                                                getOptionLabel={(option: any) => option.name || ''}
                                                renderInput={(params: any) => <CustomTextField {...params} error={Boolean(errors.state_id)}
                                                    {...(errors.state_id && { helperText: 'This field is required' })} label='Select State' />}
                                            />
                                        )}
                                    />
                 </Grid>

                 <Grid item xs={12} sm={6}>

<Controller
    name='city_id'
    control={control}
    rules={{ required: true }}
    render={({ field }) => (
        <CustomAutocomplete
            fullWidth
            options={cities}
            loading={!cities.length}
            value={field.value}
            onChange={(event, newValue) => {
                field.onChange(newValue)
            }}
            getOptionLabel={(option: any) => option.name || ''}
            renderInput={(params: any) => <CustomTextField {...params} error={Boolean(errors.city_id)}
                {...(errors.city_id && { helperText: 'This field is required' })} label='Select Cities' />}
        />
    )}
/>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='type'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    select
                                    value={value}
                                    label='Select Type'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.type)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.type && { helperText: 'This field is required' })}
                                >
                                     <MenuItem value='college'>college</MenuItem>
                                                <MenuItem value='university'>university</MenuItem>
                                                <MenuItem value='board'>board</MenuItem>
                                              
                                                </CustomTextField>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='home_view_status'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    select
                                    value={value}
                                    label='Select home_view_status'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.type)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.type && { helperText: 'This field is required' })}
                                >
                                     <MenuItem value='top_college'>top_college</MenuItem>
                                                <MenuItem value='default'>default</MenuItem>
                                                {/* <MenuItem value='board'>board</MenuItem> */}
                                              
                                                </CustomTextField>
                            )}
                        />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='college_type'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    select
                                    value={value}
                                    label='Select college_type'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.college_type)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.college_type && { helperText: 'This field is required' })}
                                >
                                     <MenuItem value='Public'>Public</MenuItem>
                                                <MenuItem value='Deemed'>Deemed</MenuItem>
                                                <MenuItem value='Private'>Private</MenuItem>
                                                <MenuItem value='Government'>Government</MenuItem>
                                              
                                                </CustomTextField>
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
                                    label='University/College/Board Name'
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
                            name='listing_order'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    type='number'
                                    label='Listing Order'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.listing_order)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.listing_order && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='established'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Established'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.established)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.established && { helperText: 'This field is required' })}
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


                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='address'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Address'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.address)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.address && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='map'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Map'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.map)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.map && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='video_url'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Video'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.video_url)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.video_url && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>



                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='avg_rating'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='avg_rating'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.avg_rating)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.avg_rating && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='info'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='info'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.info)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.info && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='admissions'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Admissions'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.admissions)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.admissions && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='placements'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Placements'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.placements)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.placements && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='ranking'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Ranking'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.ranking)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.ranking && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='Scholarships'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Scholarships'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.Scholarships)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.Scholarships && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='hostel'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Hostel'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.hostel)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.hostel && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>


                    <Grid item xs={12} sm={3}>
                        <FileUpload
                            isAddMode={isAddMode}
                            olddata={!isAddMode && olddata.icon ? olddata.icon : ""}
                            onFileChange={handleFileChangephoto}
                            maxFiles={1}
                            maxSize={2000000}
                            fileNames={fileNamesphoto}
                            label=" Upload Icon"
                            acceptedFormats={['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.pdf']}
                            rejectionMessage='Try another file for upload.'
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <FileUpload
                            isAddMode={isAddMode}
                            olddata={!isAddMode && olddata.logo ? olddata.logo : ""}
                            onFileChange={handleFileChangephoto}
                            maxFiles={1}
                            maxSize={2000000}
                            fileNames={fileNameslogo}
                            label=" Upload Logo"
                            acceptedFormats={['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.pdf']}
                            rejectionMessage='Try another file for upload.'
                        />
                    </Grid>


                    <Grid item xs={12} sm={3}>
                        <FileUpload
                            isAddMode={isAddMode}
                            olddata={!isAddMode && olddata.banner_image ? olddata.banner_image : ""}
                            onFileChange={handleFileChangebanner}
                            maxFiles={1}
                            maxSize={2000000}
                            fileNames={fileNamesbanner}
                            label="Upload banner_image"
                            acceptedFormats={['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.pdf']}
                            rejectionMessage='Try another file for upload.'
                        />
                    </Grid>



                    <Grid item xs={12} sm={12}>
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
