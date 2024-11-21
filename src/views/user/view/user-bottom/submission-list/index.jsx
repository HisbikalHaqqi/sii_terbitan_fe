// MUI Imports
import Grid from '@mui/material/Grid'

// Data Imports
import { getInvoiceData } from '@/app/server/actions'
import ListSubmissionTable from './ListSubmissionTable'

const OverViewTab = async () => {

  const invoiceData = await getInvoiceData()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ListSubmissionTable invoiceData={invoiceData} />
      </Grid>
    </Grid>
  )
}

export default OverViewTab
