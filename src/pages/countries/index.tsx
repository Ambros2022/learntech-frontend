// ** MUI Imports
import { useEffect, useState, useCallback, ChangeEvent, useContext } from 'react'
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CustomTextField from 'src/@core/components/mui/text-field'
import { Divider, Fab, Link, MenuItem } from '@mui/material'
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar'


import { AbilityContext } from 'src/layouts/components/acl/Can'

import axios1 from '../../configs/axios'


import Icon from 'src/@core/components/icon'

// ** Context
import { useAuth } from 'src/hooks/useAuth'
import axios from 'axios'


let cancelToken: any;

type DataGridRowType = {
  id: number
  username: string
  email: string
  mobile: string
  status: any
}

type SortType = 'asc' | 'desc' | undefined | null

const SecondPage = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<DataGridRowType[]>([])
  const [total, setTotal] = useState<number>(0)
  const [searchtext, setSearchtext] = useState<string>('')
  const [city_id, setCity_id] = useState('')


  const [reloadpage, setReloadpage] = useState("0");
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [searchfrom, setSearchfrom] = useState<any>('name,school.name')
  const [fieldname, setFieldname] = useState<string>('name')
  const ability = useContext(AbilityContext)


  const [size, setSize] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const [orderby, setOrderby] = useState<SortType>('asc')



  const handleReloadPage = useCallback(() => {
    setLoading(true);
    setReloadpage('1');
  }, []);


  let columns: GridColDef[] = [

    {
      flex: 0.1,
      minWidth: 100,
      field: 'name',
      headerName: 'Countries',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.name}
          </Typography>
        )
      }
    },
  ]

  const fetchTableData = useCallback(
    async (orderby: SortType, searchtext: string, searchfrom: any, size: number, page: number, fieldname: string, city_id: string) => {
      setLoading(true);
      console.log("apicall schoolId",);

      // Check if schoolId has data
      if (user && user.role == "admin") {

        cancelToken = axios.CancelToken.source();

        await axios1
          .get('api/admin/countries/get', {
            cancelToken: cancelToken.token,
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
            setTotal(res.data.totalRecords);
            setRows(res.data.data);
            console.log(res.data.data);

            setLoading(false);
          })
          .catch((error) => {
            // Handle error if needed
            setLoading(false);
            console.error("API call error:", error);
          });
      } else {
        // schoolId is empty, handle accordingly (e.g., set loading to false)
        setLoading(false);
      }
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

  const AddButtonToolbar = () => {

    return (
      <>

        <Link href={`/countries/add/`} >
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
          <CardHeader title='Search Filters'></CardHeader>
          <CardContent>
            <Grid item sm={4} xs={12}>
              <CustomTextField
                select
                fullWidth
                defaultValue="Select School"
                value={""}

                SelectProps={{
                  displayEmpty: true,
                }}
              >
                <MenuItem value=''>Select Countries</MenuItem>

              </CustomTextField>
            </Grid>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          {/* <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} /> */}
          {/* <DataGrid
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
            getRowId={(row) => row._id}
            slots={{ toolbar: ServerSideToolbar }}
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
          /> */}

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
            getRowId={(row) => row._id}
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
  )
}

export default SecondPage
