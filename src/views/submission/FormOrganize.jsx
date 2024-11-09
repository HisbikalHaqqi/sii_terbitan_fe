'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

// Component Imports
import CustomIconButton from '@core/components/mui/IconButton'

const FormOrganize = () => {
  // States
  const [vendor, setVendor] = useState('')
  const [category, setCategory] = useState('')
  const [collection, setCollection] = useState('')
  const [status, setStatus] = useState('')

  return (
    <Card>
      <CardHeader title='Organize' />
      <CardContent>
        <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-5'>
          <div className='flex items-center gap-4'>
            <FormControl fullWidth>
              <InputLabel>Select Category</InputLabel>
              <Select label='Select Category' value={category} onChange={e => setCategory(e.target.value)}>
                <MenuItem value='Household'>Household</MenuItem>
                <MenuItem value='Office'>Office</MenuItem>
                <MenuItem value='Electronics'>Electronics</MenuItem>
                <MenuItem value='Management'>Management</MenuItem>
                <MenuItem value='Automotive'>Automotive</MenuItem>
              </Select>
            </FormControl>
            <CustomIconButton size='large' variant='outlined' color='primary' className='min-is-fit'>
              <i className='ri-add-line' />
            </CustomIconButton>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormOrganize
