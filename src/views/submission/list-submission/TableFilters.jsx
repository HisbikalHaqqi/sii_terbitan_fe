// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

const TableFilters = ({ setData, tableData }) => {
  // States
  const [role, setRole] = useState('')
  const [plan, setPlan] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    const filteredData = tableData?.filter(user => {
      if (role && user.role !== role) return false
      if (plan && user.currentPlan !== plan) return false
      if (status && user.status !== status) return false

      return true
    })

    setData(filteredData || [])
  }, [role, plan, status, tableData, setData])

  return (
    <CardContent>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id='role-select'>Pilih Kategori</InputLabel>
            <Select
              fullWidth
              id='select-role'
              value={role}
              onChange={e => setRole(e.target.value)}
              label='Select Role'
              labelId='role-select'
              inputProps={{ placeholder: 'Select Role' }}
            >
              <MenuItem value=''>Select Category</MenuItem>
              <MenuItem value='admin'>Fiksi</MenuItem>
              <MenuItem value='author'>Politk</MenuItem>
              <MenuItem value='editor'>Ekonomi</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <TextField
                fullWidth
                label='Naskah'
                type="text"
                
              />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} paddingRight={10}>
          <FormControl fullWidth>
            <InputLabel id='status-select'>Pilih Status</InputLabel>
            <Select
              fullWidth
              id='select-status'
              label='Select Status'
              value={status}
              onChange={e => setStatus(e.target.value)}
              labelId='status-select'
              inputProps={{ placeholder: 'Select Status' }}
            >
              <MenuItem value=''>Pilih Status</MenuItem>
              <MenuItem value='pending'>DRAFT</MenuItem>
              <MenuItem value='active'>DITOLAK EDITOR 1</MenuItem>
              <MenuItem value='inactive'>DITERIMA EDITOR 1</MenuItem>
              <MenuItem value='active'>DITOLAK EDITOR 2</MenuItem>
              <MenuItem value='inactive'>DITERIMA EDITOR 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3} >
          <div className='flex flex-col bs-full is-full gap-1.5'>
            <div className='flex items-start  is-full mbs-1.5 gap-1.5'>
                <Button variant='contained' onClick={() => setAddUserOpen(!addUserOpen)} className='max-sm:is-full'>
                  Pencarian
                </Button>
                <Button
                  color='secondary'
                  variant='outlined'
                  startIcon={<i className='ri-upload-2-line text-xl' />}
                  className='max-sm:is-full'
                >
                Export
              </Button>
            </div>
          
          </div>
            
          </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
