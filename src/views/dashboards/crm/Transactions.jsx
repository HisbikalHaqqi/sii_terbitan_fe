//MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'

// Vars
const data = [
  {
    stats: '245k',
    title: 'Total Publish Paper',
    color: 'primary',
    icon: 'ri-pie-chart-2-line'
  },
  {
    stats: '12.5k',
    title: 'Total Users Active',
    color: 'success',
    icon: 'ri-group-line'
  },
  {
    stats: '1.54k',
    color: 'warning',
    title: 'Total Publisher',
    icon: 'ri-macbook-line'
  }
]

const Transactions = () => {
  return (
    <Card>
      <CardHeader
        title='Summary'
        action={<OptionMenu iconClassName='text-textPrimary' options={['Refresh', 'Share', 'Update']} />}
        subheader={
          <>
            <span className='font-medium text-textPrimary'>Total 48.5% Growth 😎</span>{' '}
            <span className='text-textSecondary'>this month</span>
          </>
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <div className='flex items-center gap-3'>
                <CustomAvatar variant='rounded' color={item.color} className='shadow-xs'>
                  <i className={item.icon}></i>
                </CustomAvatar>
                <div>
                  <Typography>{item.title}</Typography>
                  <Typography variant='h5'>{item.stats}</Typography>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Transactions
