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
  const [searchfrom, setSearchfrom] = useState<any>('name')
  const [columnname, setColumnname] = useState<string>('updated_at')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const params: any = {}

  params['page'] = 1;
  params['size'] = 10000;

  const handleReloadPage = useCallback(() => {
    setLoading(true);
    setReloadpage('1');
  }, []);

  let columns: GridColDef[] = [

    // {
    //   flex: 0.125,
    //   minWidth: 100,
    //   field: 'user.name',
    //   headerName: 'User',
    //   renderCell: (params: GridRenderCellParams) => {
    //     const { row } = params

    //     return (
    //           <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
    //             {row.user.name}
    //           </Typography>
    //     )
    //   }
    // },

    {
      flex: 0.175,
      minWidth: 100,
      field: 'review_type',
      headerName: 'Type',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;
        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.review_type}
          </Typography>
        );
      }
    },
    
    {
      flex: 0.4,
      minWidth: 100,
      field: 'current_url',
      headerName: 'Url',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (

          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.current_url}
          </Typography>


        )
      }
    },

    {
      flex: 0.175,
      minWidth: 100,
      field: 'content',
      headerName: 'Content',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;
        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.content}
          </Typography>
        );
      }
    },

    {
      flex: 0.175,
      minWidth: 200,
      field: 'is_approved',
      headerName: 'Status',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;
    
        let button;
        switch (row.is_approved) {
          case 0:
            button = <Button variant="contained" color="error" sx={{ width: '100px', height: '40px' }}>Pending</Button>;
            break;
          case 1:
            button = <Button variant="contained" color="success" sx={{ width: '100px', height: '40px' }}>Approved</Button>;
            break;
         
          
          default:
            button = <Button variant="contained" color="primary" sx={{ width: '100px', height: '40px' }}>Unknown</Button>;
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
            const response = await axios1.post('api/admin/review/update', { id: row.id, is_approved: 1 });
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
            sx={{ width: '140px', height: '40px' }}
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
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: any) => (
        <RowOptions id={row.id} onReloadPage={handleReloadPage} />
      )

    }
  ]




  const fetchTableData = useCallback(
    async (orderby: SortType, searchtext: string, searchfrom: any, size: number, page: number, columnname: string) => {
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
      setOrderby('asc')
      setColumnname('name')
    }
  }

  const handleSearch = (value: string) => {
    setSearchtext(value)
  }


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
