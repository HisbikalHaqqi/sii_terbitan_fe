'use client'

// React Imports
import { useState, useMemo,useEffect } from 'react'
import TextField from '@mui/material/TextField'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'

// MUI Imports
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Skeleton, Chip } from '@mui/material'
import TablePagination from '@mui/material/TablePagination'
import ConvertDate from '@/helpers/ConvertDate'
import TableFilters from './TableFilters'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// Third-party Imports
import classnames from 'classnames'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'


// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Column Definitions
const columnHelper = createColumnHelper()

const ListSubmissionTable = ({ id }) => {
  // States
  const [dataAPI, setDataAPI]           = useState([])
  const [totalRows, setTotalRows]       = useState(0)
  const [page, setPage]                 = useState(0)
  const [pageSize, setPageSize]         = useState(5)
  const [filteredData, setFilteredData] = useState(dataAPI)
  const [globalFilter, setGlobalFilter] = useState({
    "paper_id": '',
    "status": '',
    "title": '',
    "publish_date": '',
  });
  const [loading, setLoading] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null)

  const userStatusObj = {
    active: 'success',
    non_active: 'secondary'
  }

  // Vars
  const open = Boolean(anchorEl)

  // Hooks
  const { lang: locale } = useParams()

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'No Pengajuan',
        cell: ({ row }) => (
          <Typography
            component={Link}
            href={getLocalizedUrl(`submission/detail/${row.original.Paper.unique_id}`, locale)}
            color='primary'
          >{`${row.original.Paper.unique_id}`}</Typography>
        )
      }),
      columnHelper.accessor('judul_naskah', {
        header: 'Judul Naskah',
        cell: ({ row }) => <Typography>{row.original.Paper.title} </Typography>
      }),
      columnHelper.accessor('categoryName', {
        header: 'Kategori',
        cell: ({ row }) => <Typography>Fiksi</Typography>
      }),
      columnHelper.accessor('jmlh_halaman', {
        header: 'Jumlah Halaman',
        cell: ({ row }) => <Typography>{row.original.Paper.page_range} </Typography>
      }),
      columnHelper.accessor('issuedDate', {
        header: 'Tanggal Pengajuan',
        cell: ({ row }) => <Typography>{ConvertDate.ConvertDate(row.original.Paper.created_at)}</Typography>
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) =>   
        <Chip
          variant='tonal'
          label='Menunggu Review'
          size='small'
          color={userStatusObj["active"]}
          className='capitalize'
        />
      }),
      columnHelper.accessor('', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
      
            <IconButton>
                <Link href={getLocalizedUrl(`submission/task-assign/${row.original.Paper.id}`, locale)} className="flex">
                  <i className="ri-edit-line text-textSecondary" />
                </Link>
            </IconButton>
       
            <IconButton>
                <Link href={getLocalizedUrl(`submission/detail/${row.original.Paper.id}}`, locale)} className="flex">
                  <i className="ri-eye-line text-textSecondary" />
                </Link>
            </IconButton>
            
          </div>
        ),
        enableSorting: false
      })
    ],
    [dataAPI,loading]
  )

  const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {

    const [value, setValue] = useState(initialValue)
  
    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value)
      }, debounce)
  
      return () => clearTimeout(timeout)
  
    }, [value])
  
    return <TextField {...props} value={value} onChange={e => setValue(e.target.value)} size='small' />
  }

  const table = useReactTable({
      data: dataAPI,
      columns,
      initialState: {
        pagination: {
          pageSize: 10
        }
      },
      manualFilters: true,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel()
  });

  const fetchData = async (id) => {
    setLoading(true);
 
    try {
      const req = JSON.stringify({
        request: { 
          "page": page + 1, 
          "size": pageSize,
          "filter": {
              "user": id,
              "title": "",
              "publish_date":""
          }
        }
      });
      console.log(req)
 
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: 'paper/by-user-id',
          requestBody: req
        })
      });
 
      const getResponse = await response.json();
      if (getResponse && getResponse.data) {
        setDataAPI(getResponse.data.data);
        setTotalRows(getResponse.data.total);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      toast.error(error)
    } finally {
      setLoading(false)
    }
  };

  const handlePageChange = (_, page) => {
  
    setPage(page) 

  }

  const handleRowsPerPageChange = e => {
    const newPageSize = Number(e.target.value)
    setPageSize(newPageSize) 
  }

  useEffect(() => {
      fetchData(id);  

  }, [page,pageSize]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card>
      <CardHeader title='Filters' />
      <TableFilters setData={setFilteredData} tableData={dataAPI} />
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
          {
              table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} {...(header.id === 'action' && { className: 'is-24' })}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='ri-arrow-up-s-line text-xl' />,
                              desc: <i className='ri-arrow-down-s-line text-xl' />
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))
            }
          </thead>
          <tbody>
          {
            !dataAPI ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              </tbody>
            ) :  (
              table.getRowModel()
                .rows.slice(0, table.getState().pagination.pageSize)
                .map(row => (
                  <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                    {row.getVisibleCells().map(cell => (
                      <td
                        key={cell.id}
                        {...(cell.id.includes('action') && { className: 'is-24' })}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
            ) }

          </tbody>
        </table>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component='div'
        className='border-bs'
        count={totalRows}
        rowsPerPage={pageSize}
        page={page}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' }
        }}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Card>
  )
}

export default ListSubmissionTable
