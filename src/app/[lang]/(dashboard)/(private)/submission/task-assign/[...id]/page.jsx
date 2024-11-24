'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Third-party Imports
import { toast } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'
import FormTaskAssign from '@/views/submission/task-assign/FormTaskAssign'

const ViewFormTaskAssign = (data) => {

  return (
    <Grid container>
        <Grid item xs={12} paddingBottom={2}>
            <Typography variant='h4'>Form Penugasan Editor</Typography>
            <Typography>Isi informasi penugasan</Typography>
        </Grid>
      
        <FormTaskAssign id={decodeURIComponent(data?.params.id)}/>
    </Grid>
    

  )
}

export default ViewFormTaskAssign
