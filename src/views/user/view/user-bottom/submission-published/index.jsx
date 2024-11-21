// MUI Imports
import Grid from '@mui/material/Grid'

// Data Imports
import { getInvoiceData } from '@/app/server/actions'
import ListSubmissionTablePublished from './ListSubmissionPublished'

const ListSubmission = async () => {

  const invoiceData = await getInvoiceData()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ListSubmissionTablePublished invoiceData={invoiceData} />
      </Grid>
    </Grid>
  )
}

export default ListSubmission
