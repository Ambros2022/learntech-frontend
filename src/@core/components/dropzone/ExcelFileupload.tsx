// FileUpload.tsx
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import Icon from 'src/@core/components/icon';

interface FileUploadProps {
    onFileChange: (files: File[]) => void;
    maxFiles?: number;
    maxSize?: number;
    label?: string;
    acceptedFormats?: any;
    rejectionMessage?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
    onFileChange,
    maxFiles = 1,
    maxSize = 2000000,
    label = 'Upload Excel File',
    acceptedFormats = ['.xlsx', '.xls'],
    rejectionMessage = 'You can only upload Excel files.',
}) => {
    const [fileNames, setFileNames] = useState<any[]>([]);

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: maxFiles,
        maxSize: maxSize,
        accept: acceptedFormats.join(','),
        onDrop: (acceptedFiles) => {
            const names = acceptedFiles.map((file) => file.name);
            setFileNames(names);
            onFileChange(acceptedFiles);
        },
        onDropRejected: () => {
            // Handle rejection logic here
            // You can also use the rejectionMessage prop to display a custom rejection message
            alert(rejectionMessage);
        },
    });

    return (
        <>
            <Typography variant='h6' sx={{ fontSize: '0.8125rem', marginBottom: '0.25rem' }}>
                {label}
            </Typography>
            <Card>
                <CardContent sx={{ '&:last-of-type': { paddingBottom: '0 !important' }, pt: 1, px: 1 }}>
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <Box sx={{ width: '100%' }}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                                    {fileNames.length > 0 && (
                                        <Typography variant='body1' sx={{ fontSize: '0.8125rem', mt: 2, mb: 2, textAlign: 'center', color: 'blue' }}>
                                            Files: {fileNames.join(', ')}
                                        </Typography>
                                    )}

                                    {fileNames.length === 0 && (
                                        <Box
                                            sx={{
                                                mb: 1.5,
                                                width: 48,
                                                height: 48,
                                                display: 'flex',
                                                borderRadius: 1,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: (theme) => `rgba(${theme.palette.customColors.main}, 0.08)`,
                                            }}
                                        >
                                            <Icon icon='tabler:upload' fontSize='1.75rem' />
                                        </Box>
                                    )}

                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default FileUpload;
