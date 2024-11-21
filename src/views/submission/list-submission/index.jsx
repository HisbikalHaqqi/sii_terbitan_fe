// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import ListSubmissionTable from './ListSubmissionTable'

const ListSubmission = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ListSubmissionTable />
      </Grid>
    </Grid>
  )
}

export default ListSubmission
