// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import ListSubmissionTable from './ListSubmissionTable'

const ListSubmission = ({ userData }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ListSubmissionTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default ListSubmission
