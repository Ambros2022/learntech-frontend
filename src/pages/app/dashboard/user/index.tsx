// ** React Imports
import { useEffect, useState, useCallback, ChangeEvent } from 'react'
// ** MUI Imports

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



// const RowOptions = ({ id, onReloadPage }: { id: number | string, onReloadPage: () => void }) => {
//   const [open, setOpen] = useState(false);

//   const handleDelete = () => {
//     setOpen(true);
//   }
//   const handleClosePopup = () => {
//     setOpen(false);
//   };
//   const handleConfirmRemove = async () => {
//     await DeleteRow();
//     setOpen(false);
//   }

//   const DeleteRow = async () => {
//     try {
//       await axios1.post('api/admin/review/delete/' + id)
//         .then(response => {
//           if (response.data.status == 1) {
//             toast.success(response.data.message)
//             // router.reload();
//             onReloadPage();

//           } else {
//             toast.error(response.data.message)

//           }
//         })
//     } catch (err: any) {
//       console.error(err);
//       toast.error(err.message || "please try again")

//     }

//   };

//   return (
//     <>
//       <MenuItem sx={{ '& svg': { mr: 1 } }}>
//         <Link href={`./review/edit/` + id} >
//           <Icon icon='tabler:edit' fontSize={20} />
//         </Link>
//       </MenuItem>


//       <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 1 } }}>
//         <Icon icon='tabler:trash' fontSize={20} />

//       </MenuItem>

//       <Grid>

//         <Dialog
//           open={open}
//           onClose={handleClosePopup}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//         >
//           <DialogTitle className="popup-title" id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
//           <DialogContent style={{ paddingTop: '20px' }}>
//             <DialogContentText id="alert-dialog-description">
//               Would you like to delete?
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClosePopup} color="primary">
//               No
//             </Button>
//             <Button onClick={() => handleConfirmRemove()} color="primary" autoFocus>
//               Yes
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Grid>
//     </>


//   )
// }


const RowOptions = ({ id, status, onReloadPage }: { id: number | string, status: string, onReloadPage: () => void }) => {
  const [open, setOpen] = useState(false);

  const handleBlockUnblock = async () => {
    await BlockUnblockRow();
    setOpen(false);
  }

  const BlockUnblockRow = async () => {
    try {
      const endpoint = status === 'active' ? 'api/admin/user/block/' : 'api/admin/user/unblock/';
      await axios1.post(endpoint + id)
        .then(response => {
          if (response.data.status == 1) {
            toast.success(response.data.message)
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
      {/* <MenuItem sx={{ '& svg': { mr: 1 } }}>
        <Link href={`./review/edit/` + id} >
          <Icon icon='tabler:edit' fontSize={20} />
        </Link>
      </MenuItem> */}

      <Button
        onClick={handleBlockUnblock}
        variant="contained"
        color={status === 'active' ? 'error' : 'success'}
        startIcon={<Icon icon={status === 'active' ? 'tabler:lock' : 'tabler:lock-open'} fontSize={20} />}
        sx={{ mr: 2 }}
      >
        {status === 'active' ? 'Block' : 'Unblock'}
      </Button>

      {/* <Button
        onClick={() => setOpen(true)}
        variant="contained"
        color="error"
        startIcon={<Icon icon='tabler:trash' fontSize={20} />}
      >
        Delete
      </Button> */}

      
    </>
  )
}



type DataGridRowType = {
  id: number
  username: string
  email: string
  mobile: string
  status: any
}

const SecondPage = () => {
  // ** States


  const [reloadpage, setReloadpage] = useState("0");
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<number>(0)
  const [size, setSize] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const [orderby, setOrderby] = useState<SortType>('desc')
  const [rows, setRows] = useState<DataGridRowType[]>([])
  const [searchtext, setSearchtext] = useState<string>('')
  const [searchfrom, setSearchfrom] = useState<any>('name,email')
  const [columnname, setColumnname] = useState<string>('updated_at')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const params: any = {}

  params['page'] = 1;
  params['size'] = 10000;

  const handleReloadPage = () => {
    setReloadpage((prev) => (prev === "0" ? "1" : "0"));
  };

  let columns: GridColDef[] = [

    {
      flex: 0.175,
      minWidth: 100,
      field: 'name',
      headerName: 'Name',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.name}
              </Typography>
        )
      }
    },

    {
      flex: 0.175,
      minWidth: 100,
      field: 'email',
      headerName: 'email',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;
        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.email}
          </Typography>
        );
      }
    },
    

   
    {
      flex: 0.175,
      minWidth: 100,
      field: 'mobile',
      headerName: 'Contact Number',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (

          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.mobile}
          </Typography>


        )
      }
    },

    {
      flex: 0.175,
      minWidth: 100,
      field: 'provider_name',
      headerName: 'provider',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;
        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.provider_name}
          </Typography>
        );
      }
    },

    // {
    //   flex: 0.175,
    //   minWidth: 100,
    //   field: 'status',
    //   headerName: 'status',
    //   renderCell: (params: GridRenderCellParams) => {
    //     const { row } = params;
    //     return (
    //       <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
    //         {row.status}
    //       </Typography>
    //     );
    //   }
    // },
  
    // {
    //   flex: 0.175,
    //   minWidth: 100,
    //   sortable: false,
    //   field: 'actions',
    //   headerName: 'Actions',
    //   renderCell: ({ row }: any) => (
    //     <RowOptions id={row.id} status={row.status} onReloadPage={handleReloadPage} />
    //   )
    // }
  ]




  const fetchTableData = useCallback(
    async (orderby: SortType, searchtext: string, searchfrom: any, size: number, page: number, columnname: string) => {
      setLoading(true);
      if (typeof cancelToken !== typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.");
      }
      cancelToken = axios.CancelToken.source();

      await axios1
        .get('/api/admin/users/get', {
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
      setOrderby('asc')
      setColumnname('name')
    }
  }

  const handleSearch = (value: string) => {
    setSearchtext(value)
  }



  // const AddButtonToolbar = () => {

  //   return (
  //     <>
  //       <Link href={'./course/add'}>
  //         <Fab color='primary' variant='extended' sx={{ '& svg': { mr: 1 } }}>
  //           <Icon icon='tabler:plus' />
  //           Add
  //         </Fab>
  //       </Link>

  //     </>
  //   );
  // };

  // const AddButtonComponent = <AddButtonToolbar />;

  return (
    <Grid container spacing={6}>

      <Grid item xs={12}>
        <Card>

          <DataGrid
            autoHeight
            pagination
            loading={loading}
            rows={rows}
            rowCount={total}
            columns={columns}
            // checkboxSelection/
            sortingMode='server'
            paginationMode='server'
            pageSizeOptions={[10, 15, 25, 50]}
            getRowId={(row) => row.id}
            paginationModel={paginationModel}
            onSortModelChange={handleSortModel}
            slots={{ toolbar: ServerSideToolbar }}
            onPaginationModelChange={paginationchange}
            slotProps={{
              baseButton: {
                size: 'medium',
                variant: 'tonal',
              },
              toolbar: {
                value: searchtext,
                clearSearch: () => handleSearch(''),
                onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value),
                // CustomToolbar: AddButtonComponent
              },
            }}
          />
        </Card>
      </Grid>

    </Grid>
  );
}

export default SecondPage
