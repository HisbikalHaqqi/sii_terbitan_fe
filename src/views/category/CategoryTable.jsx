'use client'

import Link from 'next/link'
import { useState, useMemo, useEffect } from 'react'
import { Skeleton, Chip, Grid } from '@mui/material'

// Next Imports
// import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'
import { toast } from 'react-toastify'
import { useParams } from 'next/navigation'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

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


// Style Imports
import tableStyles from '@core/styles/table.module.css'
import { getLocalizedUrl } from '@/utils/i18n'

// Column Definitions
const columnHelper = createColumnHelper()


const CategoryTable = () => {

  const { lang: locale } = useParams()
  const [dataAPI, setDataAPI]           = useState([])
  const [totalRows, setTotalRows]       = useState(0)
  const [page, setPage]                 = useState(0)
  const [pageSize, setPageSize]         = useState(5)
  const [globalFilter, setGlobalFilter] = useState({
    category_name: '',
    description: '',
  });
  const [loading, setLoading] = useState(true)

  const columns = useMemo(
    () => [
      columnHelper.accessor('No', {
        header: 'No',
        cell: ({ row }) => (
          loading ? (
            <Skeleton animation={'wave'} sx={{ bgcolor: '#DEE9FA' }} variant='text' width={120} />
          ) : (
            <div className='flex items-center gap-4'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {row.original.category_id}
                </Typography>
            
              </div>
            </div>
          ))
      }),
      columnHelper.accessor('category', {
        header: 'Kategori',
        cell: ({ row }) => (
          loading ? (
            <Skeleton animation={'wave'} sx={{ bgcolor: '#DEE9FA' }} variant='text' width={120} />
          ) : (
            <div className='flex items-center gap-4'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {row.original.category_name}
                </Typography>
            
              </div>
            </div>
          )
         
        )
      }),

      columnHelper.accessor('action', {
        header: 'Actions',
        cell: ({ row }) => (
          loading ? (
            <Skeleton animation={'wave'} sx={{ bgcolor: '#DEE9FA' }} variant='text' width={120} />
          ) : (
            <div className='flex items-center'>
            <IconButton onClick={() => setData(data?.filter(category => category.category_id !== row.category_id))}>
              <i className='ri-delete-bin-7-line text-textSecondary' />
            </IconButton>
          </div>
          )
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

  const fetchData = async () => {
    setLoading(true)
    try {
      const req =  JSON.stringify({
        request: { "page": page + 1, "size": pageSize, "filter": globalFilter }
      })

      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          url: 'category/all',
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
  }

  const handlePageChange = (_, page) => {
  
    setPage(page) 

  }

  const handleRowsPerPageChange = e => {
    const newPageSize = Number(e.target.value)
    setPageSize(newPageSize) 
  }

  useEffect(() => {
      fetchData();  

  }, [page,pageSize]);


  return (
    <Card>
      <CardContent className='flex justify-between flex-col gap-4 items-start sm:flex-row sm:items-center'>
        <Typography variant='h5' className='mbe-1'>Filter Kategori</Typography>
        <div className='flex gap-4 flex-col !items-start max-sm:is-full sm:flex-row sm:items-center'>
          <div className='flex items-center gap-x-4 gap-4 flex-col max-sm:is-full sm:flex-row'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter({role:''})}
              placeholder='Search User'
              className='max-sm:is-full'
            />

            <Button
              component={Link}
              variant='contained'
              href={getLocalizedUrl('/category/add', locale)}
            >Tambah Data</Button>
          </div>
        </div>
      </CardContent>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
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
            ))}
          </thead>
          {table.getFilteredRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  No data available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, table.getState().pagination.pageSize)
                .map(row => {
                  return (
                    <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                      ))}
                    </tr>
                  )
                })}
            </tbody>
          )}
        </table>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
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

export default CategoryTable
