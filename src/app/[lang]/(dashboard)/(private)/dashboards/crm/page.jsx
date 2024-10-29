// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports
import CardStatWithImage from '@components/card-statistics/Character'
import CardStatVertical from '@components/card-statistics/Vertical'
import Transactions from '@views/dashboards/crm/Transactions'
import TotalSales from '@views/dashboards/crm/TotalSales'
import RevenueReport from '@views/dashboards/crm/RevenueReport'
import CardWidgetsSalesOverview from '@views/dashboards/crm/SalesOverview'
import ActivityTimeline from '@views/dashboards/crm/ActivityTimeline'
import WeeklySales from '@views/dashboards/crm/WeeklySales'
import LineAreaChart from '@views/dashboards/crm/LineAreaChart'
import UpgradePlan from '@views/dashboards/crm/UpgradePlan'
import MeetingSchedule from '@views/dashboards/crm/MeetingSchedule'
import DeveloperMeetup from '@views/dashboards/crm/DeveloperMeetup'

const DashboardCRM = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6} md={3} className='self-end'>
        <CardStatWithImage
          stats='13k'
          title='Total Review'
          trendNumber='15.6%'
          chipColor='primary'
          src='/images/illustrations/characters/9.png'
          chipText={`Year of ${new Date().getFullYear()}`}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3} className='self-end'>
        <CardStatWithImage
          stats='24.5k'
          trend='negative'
          title='Sessions'
          trendNumber='20%'
          chipText='Last Week'
          src='/images/illustrations/characters/10.png'
        />
      </Grid>
      <Grid item xs={12} md={6} className='self-end'>
        <Transactions />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TotalSales />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardWidgetsSalesOverview />
      </Grid>
    </Grid>
  )
}

export default DashboardCRM
