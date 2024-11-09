// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import FormAddHeader from '@/views/submission/FormAddHeader'
import FormInformation from '@/views/submission/FormInformation'
import FormUpload from '@/views/submission/FormUpload'
import FormOrganize from '@/views/submission/FormOrganize'

const submissionFormAdd = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <FormAddHeader />
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <FormInformation />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormUpload />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormOrganize />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default submissionFormAdd
