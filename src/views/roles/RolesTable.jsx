'use client'

// React Imports
import { useState, useMemo, useEffect } from 'react'
import { toast } from 'react-toastify'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@core/components/option-menu'

// Util Imports
import { getInitials } from '@/utils/getInitials'
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Styled Components
const Icon = styled('i')({})

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <TextField {...props} value={value} onChange={e => setValue(e.target.value)} size='small' />
}

// Vars
const userRoleObj = {
  admin: { icon: 'ri-vip-crown-line', color: 'error' },
  author: { icon: 'ri-computer-line', color: 'warning' },
  editor: { icon: 'ri-edit-box-line', color: 'info' },
  maintainer: { icon: 'ri-pie-chart-2-line', color: 'success' },
  subscriber: { icon: 'ri-user-3-line', color: 'primary' }
}

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// Column Definitions
const columnHelper = createColumnHelper()

const RolesTable = () => {
  // States
  const [role, setRole]                 = useState([])
  const [dataAPI, setDataAPI]           = useState([])
  const [totalRows, setTotalRows]       = useState(0)
  const [page, setPage]                 = useState(0)
  const [pageSize, setPageSize]         = useState(5)
  const [globalFilter, setGlobalFilter] = useState({
    role: '',
    email: '',
  });
  const [loading, setLoading] = useState(true)

  // Hooks
  const { lang: locale } = useParams()

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
                  {row.original.id}
                </Typography>
            
              </div>
            </div>
          ))
      }),
      columnHelper.accessor('fullName', {
        header: 'User',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            {getAvatar({ avatar: row.original.profilPicture, fullName: row.original.full_name })}
            <div className='flex flex-col'>
              <Typography className='font-medium' color='text.primary'>
                {row.original.full_name}
              </Typography>
              <Typography variant='body2'>{row.original.phone_number}</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: ({ row }) => <Typography>{row.original.email}</Typography>
      }),
      columnHelper.accessor('role', {
        header: 'Role',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            {/* <Icon
              className={userRoleObj[row.original.role].icon}
              sx={{ color: `var(--mui-palette-${userRoleObj[row.original.role].color}-main)`, fontSize: '1.375rem' }}
            /> */}
            <Typography className='capitalize' color='text.primary'>
              {row.original.role}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Chip
                variant='tonal'
                label={row.original.status == 1 ? "Active" : "Non Active"}
                size='small'
                color={userStatusObj[row.original.status == 1 ? "active" : "non_active"]}
                className='capitalize'
              />
          </div>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Actions',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton onClick={() => setData(data?.filter(product => product.id !== row.original.id))}>
              <i className='ri-delete-bin-7-line text-textSecondary' />
            </IconButton>
            <IconButton>
              <Link href={getLocalizedUrl('/apps/user/view', locale)} className='flex'>
                <i className='ri-eye-line text-textSecondary' />
              </Link>
            </IconButton>
            <IconButton>
              <Link href={getLocalizedUrl('/apps/user/view', locale)} className='flex'>
                <i className='ri-trash-line text-textSecondary' />
              </Link>
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    [dataAPI,loading]
  )

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
  })

  const getAvatar = params => {
    const { avatar, fullName } = params

    if (avatar) {
      return <CustomAvatar src={avatar} skin='light' size={34} />
    } else {
      return (
        <CustomAvatar skin='light' size={34}>
          {getInitials(fullName)}
        </CustomAvatar>
      )
    }
  }

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
          url: 'admin/list-user',
          requestBody: req
        })
      });

      const getResponse = await response.json();
      console.log(getResponse)
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
        <Button
          variant='outlined'
          color='secondary'
          startIcon={<i className='ri-upload-2-line' />}
          className='max-sm:is-full'
        >
          Export
        </Button>
        <div className='flex gap-4 flex-col !items-start max-sm:is-full sm:flex-row sm:items-center'>
          <DebouncedInput
            value={globalFilter ?? ''}
            className='max-sm:is-full min-is-[220px]'
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search User'
          />
          <FormControl size='small' className='max-sm:is-full'>
            <InputLabel id='roles-app-role-select-label'>Select Role</InputLabel>
            <Select
              value={role}
              onChange={e => setRole(e.target.value)}
              label='Select Role'
              id='roles-app-role-select'
              labelId='roles-app-role-select-label'
              className='min-is-[150px]'
            >
              <MenuItem value=''>Select Role</MenuItem>
              <MenuItem value='admin'>Admin</MenuItem>
              <MenuItem value='author'>Author</MenuItem>
              <MenuItem value='editor'>Editor</MenuItem>
            </Select>
          </FormControl>
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

export default RolesTable
