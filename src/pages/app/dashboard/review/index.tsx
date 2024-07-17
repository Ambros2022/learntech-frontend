// ** React Imports
import { useEffect, useState, useCallback, ChangeEvent } from 'react'
// ** MUI Imports
import CardHeader from '@mui/material/CardHeader'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import Link from 'next/link'
import axios1 from 'src/configs/axios'
import CustomAvatar from 'src/@core/components/mui/avatar'
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar'
// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { getInitials } from 'src/@core/utils/get-initials'
import { Button, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Menu, MenuItem } from '@mui/material'


// ** Icon Imports
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import Fab from '@mui/material/Fab'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import axios from 'axios'
import CustomTextField from 'src/@core/components/mui/text-field'
import useIsMountedRef from 'src/hooks/useIsMountedRef';


let cancelToken: any;

type SortType = 'asc' | 'desc' | undefined | null

// ** renders client column
const renderClient = (params: GridRenderCellParams) => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]
  return (
    <CustomAvatar
      skin='light'
      color={color as ThemeColor}
      sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
    >
      {getInitials(row.name ? row.name : 'John Doe')}
    </CustomAvatar>
  )
}



const RowOptions = ({ id, onReloadPage }: { id: number | string, onReloadPage: () => void }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    setOpen(true);
  }
  const handleClosePopup = () => {
    setOpen(false);
  };
  const handleConfirmRemove = async () => {
    await DeleteRow();
    setOpen(false);
  }

  const DeleteRow = async () => {
    try {
      await axios1.post('api/admin/review/delete/' + id)
        .then(response => {
          if (response.data.status == 1) {
            toast.success(response.data.message)
            // router.reload();
            onReloadPage();

          } else {
            toast.error(response.data.message)

          }
        })
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "please try again")

    }

  };

  return (
    <>
      <MenuItem sx={{ '& svg': { mr: 1 } }}>
        <Link href={`./review/edit/` + id} >
          <Icon icon='tabler:edit' fontSize={20} />
        </Link>
      </MenuItem>


      <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 1 } }}>
        <Icon icon='tabler:trash' fontSize={20} />

      </MenuItem>

      <Grid>

        <Dialog
          open={open}
          onClose={handleClosePopup}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className="popup-title" id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent style={{ paddingTop: '20px' }}>
            <DialogContentText id="alert-dialog-description">
              Would you like to delete?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePopup} color="primary">
              No
            </Button>
            <Button onClick={() => handleConfirmRemove()} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>


  )
}


type DataGridRowType = {
  id: number;
  username: string;
  email: string;
  content: string;
  mobile: string;
  status: any;
  reviewuser: { name: string };
  name: string;
  review_type: string;
  clgreview: { name: string };
  sclreview: { name: string };
  sclbrdreview: { name: string };
  coursereview: { slug: string };
  course_type: string;
  is_approved: number;
  userrating: number;
  grade: string;
  likes: any;
  dislikes: string;
  is_reported: any;
};


const SecondPage = () => {
  // ** States
  const [colleges, setColleges] = useState([])
  const [college_id, setCollege_id] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState<DataGridRowType | null>(null);
  const [reloadpage, setReloadpage] = useState("0");
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<number>(0)
  const [size, setSize] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const [orderby, setOrderby] = useState<SortType>('desc')
  const [rows, setRows] = useState<DataGridRowType[]>([])
  const [searchtext, setSearchtext] = useState<string>('')
  const [searchfrom, setSearchfrom] = useState<any>('name')
  const [columnname, setColumnname] = useState<string>('name')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const params: any = {}
  const isMountedRef = useIsMountedRef();


  params['page'] = 1;
  params['size'] = 10000;


  const handleDialogOpen = (row: DataGridRowType) => {
    setDialogData(row);
    setDialogOpen(true);
  };


  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleReloadPage = useCallback(() => {
    setLoading(true);
    setReloadpage('1');
  }, []);

  let columns: GridColDef[] = [

    {
      flex: 0.125,
      minWidth: 100,
      field: 'reviewuser.name',
      headerName: 'Name',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row?.reviewuser?.name}
          </Typography>
        )
      }
    },
    // {
    //   flex: 0.125,
    //   minWidth: 100,
    //   field: 'name',
    //   headerName: 'Name',
    //   renderCell: (params: GridRenderCellParams) => {
    //     const { row } = params

    //     return (
    //       <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
    //         {row.name}
    //       </Typography>
    //     )
    //   }
    // },


    {
      flex: 0.125,
      minWidth: 100,
      field: 'review_type',
      headerName: 'Type',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.review_type}
          </Typography>
        )
      }
    },
    {
      flex: 0.125,
      minWidth: 100,
      field: 'userrating',
      headerName: 'Rating',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.userrating}
          </Typography>
        )
      }
    },


    {
      flex: 0.1,
      minWidth: 100,
      field: 'clgreview.name',
      headerName: 'college',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;
        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row?.clgreview?.name}
          </Typography>
        );
      }
    },
    {
      flex: 0.2,
      minWidth: 100,
      field: 'course_type',
      headerName: 'course',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;
        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.course_type}
          </Typography>
        );
      }
    },

    {
      flex: 0.175,
      minWidth: 100,
      field: 'is_approved',
      headerName: 'Status',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;

        let button;
        switch (row.is_approved) {
          case 0:
            button = <Button variant="contained" color="error" sx={{ width: '73px', height: '31px' }}>Pending</Button>;
            break;
          case 1:
            button = <Button variant="contained" color="success" sx={{ width: '73px', height: '31px' }}>Approved</Button>;
            break;


          default:
            button = <Button variant="contained" color="primary" sx={{ width: '73px', height: '31px' }}>Unknown</Button>;
            break;
        }

        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {button}
          </Typography>
        );
      }
    },

    {
      flex: 0.175,
      minWidth: 100,
      field: 'update',
      headerName: 'Update',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;

        const handleUpdateClick = async () => {
          try {
            // Call the API to update the status
            const response = await axios1.post('/api/website/review/statusupdate', { id: row.id, is_approved: 1 });
            if (response.data.status === 1) {
              toast.success(response.data.message);
              // Update the local state to reflect the change
              row.is_approved = 1;
              handleReloadPage(); // Reload the page to reflect changes
            } else {
              toast.error(response.data.message);
            }
          } catch (err) {
            console.error(err);
            toast.error("Failed to update status. Please try again.");
          }
        };

        return (
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '109px', height: '31px' }}
            onClick={handleUpdateClick}
          >
            Change Status
          </Button>
        );
      }
    },

    {
      flex: 0.175,
      minWidth: 100,
      field: 'view',
      headerName: 'View',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;

        const handleViewClick = () => {
          handleDialogOpen(row);
        };

        return (
          <Button
            variant="contained"
            sx={{
              width: '30px',
              height: '30px',
              backgroundColor: 'green',
              color: 'white',
              '&:hover': {
                backgroundColor: 'green', // Keeps the background color green on hover
              },
            }}
            onClick={handleViewClick}
          >
            View
          </Button>
        );
      },
    },

    {
      flex: 0.175,
      minWidth: 50,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: any) => (
        <RowOptions id={row.id} onReloadPage={handleReloadPage} />
      )

    }
  ]




  const fetchTableData = useCallback(
    async (orderby: SortType, searchtext: string, searchfrom: any, size: number, page: number, columnname: string , ) => {
      setLoading(true);
      if (typeof cancelToken !== typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.");
      }
      cancelToken = axios.CancelToken.source();

      await axios1
        .get('api/admin/review/get', {
          cancelToken: cancelToken.token,
          params: {
            columnname,
            orderby,
            page,
            size,
            searchtext,
            searchfrom,
            

          },
        })

        .then((res) => {
          setTotal(res.data.totalItems);
          setRows(res.data.data);


          setLoading(false);
        })
        .catch((error) => {

          setLoading(false);
          // console.error("API call error:", error);
        });

    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paginationModel, reloadpage]
  );

  const paginationchange = (model: GridPaginationModel, details: GridCallbackDetails) => {
    setSize(model.pageSize);
    setPage(model.page + 1);
    setPaginationModel({ page: model.page, pageSize: model.pageSize });

  }

  useEffect(() => {
    fetchTableData(orderby, searchtext, searchfrom, size, page, columnname)
  }, [fetchTableData, searchtext, orderby, searchfrom, size, page, columnname])

  const handleSortModel = (newModel: GridSortModel) => {
    if (newModel.length) {
      setOrderby(newModel[0].sort)
      setColumnname(newModel[0].field)
    } else {
      setOrderby('desc')
      setColumnname('name')
    }
  }

  const handleSearch = (value: string) => {
    setSearchtext(value)
  }


  //get all countries
  const getcolleges = useCallback(async () => {
    try {
        const roleparams: any = {};
        roleparams['page'] = 1;
        roleparams['size'] = 10000;
        const response = await axios1.get('api/admin/college/get', { params: roleparams });

        setColleges(response.data.data);

    } catch (err) {
        console.error(err);
    }
}, [isMountedRef]);

useEffect(() => {

  getcolleges();

}, [getcolleges]);


  return (
    // <Grid container spacing={6}>

    //   <Grid item xs={12}>
    //     <Card>

    //       <DataGrid
    //         autoHeight
    //         pagination
    //         loading={loading}
    //         rows={rows}
    //         rowCount={total}
    //         columns={columns}
    //         // checkboxSelection/
    //         sortingMode='server'
    //         paginationMode='server'
    //         pageSizeOptions={[10, 15, 25, 50]}
    //         getRowId={(row) => row.id}
    //         paginationModel={paginationModel}
    //         onSortModelChange={handleSortModel}
    //         slots={{ toolbar: ServerSideToolbar }}
    //         onPaginationModelChange={paginationchange}
    //         slotProps={{
    //           baseButton: {
    //             size: 'medium',
    //             variant: 'tonal',
    //           },
    //           toolbar: {
    //             value: searchtext,
    //             clearSearch: () => handleSearch(''),
    //             onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value),
    //             // CustomToolbar: AddButtonComponent
    //           },
    //         }}
    //       />
    //     </Card>
    //   </Grid>
    //   <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="view-dialog-title">
    //     <DialogTitle id="view-dialog-title">View Details</DialogTitle>
    //     <DialogContent>
    //       <DialogContentText>
    //         {/* Display the relevant details of the row here */}
    //         {dialogData && JSON.stringify(dialogData, null, 2)}
    //       </DialogContentText>
    //     </DialogContent>
    //     <DialogActions>
    //       <Button onClick={handleDialogClose} color="primary">
    //         Close
    //       </Button>
    //     </DialogActions>
    //   </Dialog>
    // </Grid>

    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>

        <CardHeader title="Search Filters" />
        <CardContent>
                  <Grid container spacing={6}>
                    <Grid item sm={4} xs={12}>
                      <CustomTextField
                        select
                        fullWidth
                        defaultValue="Select College"
                        value={college_id}
                        onChange={(e: any) => {
                          // setCountry_id(e.target.value);
                          // console.log(setschoolId, "setschoolId");
                          
                        }}
                        SelectProps={{
                          displayEmpty: true,
                        }}
                      >
                        <MenuItem value=''>Select Country</MenuItem>
                        {colleges && colleges.map((val: any) => (
                          <MenuItem value={val.id}>{val.name}</MenuItem>
                        ))}
                        {colleges.length === 0 && <MenuItem disabled>Loading...</MenuItem>}
                      </CustomTextField>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <Button sx={{ mt: 0 }} variant="contained" color='error'
                        onClick={(e: any) => {
                          // setClassId('');
                          // setCountry_id('');
                          // setStatus('');
                        }}
                        startIcon={<Icon icon='tabler:trash' />} >Clear Filter</Button>
                    </Grid>
                  </Grid>
                </CardContent>


                <Divider sx={{ m: '0 !important' }} />








          <DataGrid
            autoHeight
            pagination
            loading={loading}
            rows={rows}
            rowCount={total}
            columns={columns}
            sortingMode="server"
            paginationMode="server"
            pageSizeOptions={[10, 15, 25, 50]}
            getRowId={(row) => row.id}
            paginationModel={paginationModel}
            onSortModelChange={handleSortModel}
            slots={{ toolbar: ServerSideToolbar }}
            onPaginationModelChange={(model, details) => {
              setSize(model.pageSize);
              setPage(model.page + 1);
              setPaginationModel({ page: model.page, pageSize: model.pageSize });
            }}
            slotProps={{
              baseButton: {
                size: 'medium',
                variant: 'tonal',
              },
              toolbar: {
                value: searchtext,
                clearSearch: () => handleSearch(''),
                onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value),
              },
            }}
          />
        </Card>
      </Grid>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="view-dialog-title"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="view-dialog-title" className='typographypopup'>View Details</DialogTitle>
        <DialogContent>
          {dialogData && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {dialogData?.reviewuser?.name && (
                  <Card sx={{ flex: 1 }}>
                    <CardContent>
                      <Typography variant="h6" component="div" className='typographypopup'>
                        User Name
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {dialogData.reviewuser.name}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
                {dialogData?.name && (
                  <Card sx={{ flex: 1 }}>
                    <CardContent>
                      <Typography variant="h6" component="div" className='typographypopup'>
                        Name
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {dialogData.name}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
                {dialogData?.review_type && (
                  <Card sx={{ flex: 1 }}>
                    <CardContent>
                      <Typography variant="h6" component="div" className='typographypopup'>
                        Review Type
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {dialogData.review_type}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {dialogData?.userrating && (
                  <Card sx={{ flex: 1 }}>
                    <CardContent>
                      <Typography variant="h6" component="div" className='typographypopup'>
                        User Rating
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {dialogData.userrating}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
                {dialogData?.content && (
                  <Card sx={{ flex: 1 }}>
                    <CardContent>
                      <Typography variant="h6" component="div" className='typographypopup'>
                        Content
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {dialogData.content}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
                {dialogData?.review_type && (
                  <Card sx={{ flex: 1 }}>
                    <CardContent>
                      <Typography variant="h6" component="div" className='typographypopup'>
                        Type
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {dialogData.review_type}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {dialogData?.clgreview?.name && (
                  <Card sx={{ flex: 1 }}>
                    <CardContent>
                      <Typography variant="h6" component="div" className='typographypopup'>
                        College
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {dialogData.clgreview.name}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
                {dialogData?.sclreview?.name && (
                  <Card sx={{ flex: 1 }}>
                    <CardContent>
                      <Typography variant="h6" component="div" className='typographypopup'>
                        School
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {dialogData.sclreview.name}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
                {dialogData?.coursereview?.slug && (
                  <Card sx={{ flex: 1 }}>
                    <CardContent>
                      <Typography variant="h6" component="div" className='typographypopup'>
                        Course
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {dialogData.coursereview.slug}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {dialogData?.sclbrdreview?.name && (
                  <Card sx={{ flex: 1 }}>
                    <CardContent>
                      <Typography variant="h6" component="div" className='typographypopup'>
                        School Board
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {dialogData.sclbrdreview.name}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
                {dialogData?.course_type && (
                  <Card sx={{ flex: 1 }}>
                    <CardContent>
                      <Typography variant="h6" component="div" className='typographypopup'>
                        Course Type
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {dialogData.course_type}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
                {dialogData?.grade && (
                  <Card sx={{ flex: 1 }}>
                    <CardContent>
                      <Typography variant="h6" component="div" className='typographypopup'>
                        Grade
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {dialogData.grade}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>

                <Card sx={{ flex: 1 }}>
                  <CardContent>
                    <Typography variant="h6" component="div" className='typographypopup'>
                      Likes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {dialogData.likes}
                    </Typography>
                  </CardContent>
                </Card>


                <Card sx={{ flex: 1 }}>
                  <CardContent>
                    <Typography variant="h6" component="div" className='typographypopup'>
                      Dislikes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {dialogData.dislikes}
                    </Typography>
                  </CardContent>
                </Card>


                {dialogData?.is_reported !== undefined && (
                  <Card sx={{ flex: 1 }}>
                    <CardContent>
                      <Typography variant="h6" component="div" className='typographypopup'>
                        Reported
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {dialogData.is_reported === 1 ? 'Yes' : 'No'}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Box>
              <Card style={{ width: "273px" }} >
                <CardContent>
                  <Typography variant="h6" component="div" className='typographypopup'>
                    Status
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {dialogData.is_approved === 1 ? 'Approved' : 'Pending'}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </Grid>
  );
}

export default SecondPage
