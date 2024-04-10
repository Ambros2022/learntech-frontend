// ** React Imports
import { useEffect, useState, useCallback, ChangeEvent } from 'react'
// ** MUI Imports

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import Link from 'next/link'
import axios1 from 'src/configs/axios'
// ** Context
import { useAuth } from 'src/hooks/useAuth'
import { useParams } from "react-router-dom";
// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar'
// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
// import { DataGridRowType } from 'src/@fake-db/types'
// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { Button, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Menu, MenuItem } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { GridToolbarExport } from '@mui/x-data-grid'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import NotAuthorized from 'src/pages/401'
// ** React Imports
import { useContext } from 'react'
import { AbilityContext } from 'src/layouts/components/acl/Can'
// ** Icon Imports
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import Fab from '@mui/material/Fab'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import axios from 'axios'
import Add from '../../../../../views/app/dashboard/locations/countries/AddEditForm'

interface StatusObj {
  [key: number]: {
    title: string
    color: ThemeColor
  }
}

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

const statusObj: StatusObj = {
  1: { title: 'current', color: 'primary' },
  2: { title: 'professional', color: 'success' },
  3: { title: 'rejected', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
}

const RowOptions = ({ id }: { id: number | string }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false)
  const ability = useContext(AbilityContext)
  const handleRowOptionsClose = () => {
    setShow(true);
  }

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
      await axios1.post('api/admin/city/delete/' + id)
        .then(response => {
          console.log(response);

          if (response.data.status == 1) {
            toast.success(response.data.message)
            router.reload();
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
        <Link href={`./cities/edit/` + id} >
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

interface Props {
  value: string
  clearSearch: () => void
  onChange: (e: ChangeEvent) => void
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
  const { user } = useAuth();
  const [schoolId, setschoolId] = useState<string>('')
  const [roles, setRoles] = useState([])
  const [schools, setSchools] = useState([])
  const [reloadpage, setReloadpage] = useState("0");
  const [city_id, setcity_id] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<number>(0)
  const [size, setSize] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const [orderby, setOrderby] = useState<SortType>('asc')
  const [rows, setRows] = useState<DataGridRowType[]>([])
  const [searchtext, setSearchtext] = useState<string>('')
  const [searchfrom, setSearchfrom] = useState<any>('name')
  const [fieldname, setFieldname] = useState<string>('name')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const isMountedRef = useIsMountedRef();
  const ability = useContext(AbilityContext)
  const [roleshow, setRoleshow] = useState<boolean>(false)
  const params: any = {}

  params['page'] = 1;
  params['size'] = 10000;

  let columns: GridColDef[] = [

    {
      flex: 0.175,
      minWidth: 100,
      field: 'name',
      headerName: 'Cities',
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
      field: 'state.name',
      headerName: 'States',
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {params.row.state && params.row.state ? params.row.state.name : ""}
          </Typography>
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
        <RowOptions id={row.id} />
      )

    }
  ]

  // if (user && user.role !== "superadmin") {
  //   columns = columns.filter(column => column.field !== 'school.name');
  // }


  const fetchTableData = useCallback(
    async (orderby: SortType, searchtext: string, searchfrom: any, size: number, page: number, fieldname: string, city_id: string) => {
      setLoading(true);
      // console.log("apicall schoolId", schoolId);

      // console.log(axios1);
      // if (typeof cancelToken !== typeof undefined) {
      //   cancelToken.cancel("Operation canceled due to new request.");
      // }
      // cancelToken = axios.CancelToken.source();

      await axios1
        .get('api/admin/city/get', {
          // cancelToken: cancelToken.token,
          params: {
            searchtext,
            searchfrom,
            orderby,
            size,
            page,
            fieldname,
            city_id,

          },
        })

        .then((res) => {
          setTotal(res.data.totalItems);
          setRows(res.data.data);
          console.log(res.data.data);

          setLoading(false);
        })
        .catch((error) => {
          // Handle error if needed
          setLoading(false);
          console.error("API call error:", error);
        });
      // } 

      // else {
      //   // schoolId is empty, handle accordingly (e.g., set loading to false)
      //   setLoading(false);
      // }
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
    fetchTableData(orderby, searchtext, searchfrom, size, page, fieldname, city_id)
  }, [fetchTableData, searchtext, orderby, searchfrom, size, page, fieldname, city_id])

  const handleSortModel = (newModel: GridSortModel) => {
    if (newModel.length) {
      setOrderby(newModel[0].sort)
      setFieldname(newModel[0].field)
    } else {
      setOrderby('asc')
      setFieldname('name')
    }
  }

  const handleSearch = (value: string) => {
    setSearchtext(value)
  }


  // useEffect(() => {
  //   setRoleshow(false);
  //   if (user && user.role !== "superadmin" && user.schoolId) {

  //     let schid = user.schoolId;
  //     setschoolId(schid);
  //   }
  //   if (schoolId) {

  //   }
  // }, [schoolId]);


  // Get all schools
  // const getschools = useCallback(async () => {
  //   try {
  //     const response = await axios1.get('api/admin/countries/get', { params: params });
  //     if (isMountedRef.current) {

  //       setSchools(response.data.data);

  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, [isMountedRef]);

  // useEffect(() => {

  //   getschools();
  // }, []);

  const AddButtonToolbar = () => {

    return (
      <>
        <Link href={'./cities/add'}>
          <Fab color='primary' variant='extended' sx={{ '& svg': { mr: 1 } }}>
            <Icon icon='tabler:plus' />
            Add
          </Fab>
        </Link>

      </>
    );
  };

  const AddButtonComponent = <AddButtonToolbar />;

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
            // getRowId={(row) => row._id}
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
                CustomToolbar: AddButtonComponent
              },
            }}
          />
        </Card>
      </Grid>

    </Grid>
  );
}

export default SecondPage
