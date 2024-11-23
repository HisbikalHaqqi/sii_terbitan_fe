// MUI Imports
import Grid from '@mui/material/Grid'

// Data Imports
import { getInvoiceData } from '@/app/server/actions'
import ListSubmissionTableWaiting from './ListSubmissionWaiting'
import ListSubmissionTablePublish from './ListSubmissionWaiting'

const ListSubmission = async () => {

  const invoiceData = await getInvoiceData()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ListSubmissionTablePublish invoiceData={invoiceData} />
      </Grid>
    </Grid>
  )
}

export default ListSubmission
