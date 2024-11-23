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

// Dynamically import the `CompApproval` component on the client side
import dynamic from 'next/dynamic'

const CompApproval = dynamic(() => import('@/views/apps/component/CompApproval'), {
  ssr: false, // Ensure this is only rendered on the client-side
})

const FormTaskAssign = () => {
  // Hooks
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      catatan: '',
      approval: [],
    }
  })

  const onSubmit = async () => {
    // await submitData();
    console.log('Form submitted');
  }

  return (
    <Grid item xs={12} sm={12}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={8}>
                <Controller
                  name='catatan'
                  control={control}
                  rules={{ required: 'Kolom harus diisi.' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Catatan Penugasan Reviewer'
                      placeholder=''
                      error={!!errors.catatan}
                      helperText={errors.catatan?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} sm={8} paddingTop={2}>
              {/* Pass control and errors to CompApproval */}
              <CompApproval url={"test"} control={control} errors={errors} />
            </Grid>

            <Grid item xs={12} className='flex gap-2' paddingTop={2}>
              <Button variant='contained' type='submit'>
                Submit
              </Button>
              <Button variant='outlined' type='reset' onClick={() => reset()}>
                Reset
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </Grid>
  )
}

export default FormTaskAssign
