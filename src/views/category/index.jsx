'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Component Imports
import CategoryTable from './CategoryTable'

const Category = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} className=''>
        <Typography variant='h4' className='mbe-1'>Kategori</Typography>
      </Grid>
      <Grid item xs={12}>
        <CategoryTable/>
      </Grid>
    </Grid>
  )
}

export default Category
