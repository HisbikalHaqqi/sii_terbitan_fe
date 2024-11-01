'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import OptionsMenu from '@core/components/option-menu'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const CardWidgetsSalesOverview = () => {
  // Hooks
  const theme = useTheme()
  const textSecondary = 'var(--mui-palette-text-secondary)'

  const options = {
    chart: {
      sparkline: { enabled: true }
    },
    grid: {
      padding: {
        left: 20,
        right: 20
      }
    },
    colors: [
      'var(--mui-palette-primary-main)',
      'rgba(var(--mui-palette-primary-mainChannel) / 0.7)',
      'rgba(var(--mui-palette-primary-mainChannel) / 0.5)',
      'var(--mui-palette-customColors-trackBg)'
    ],
    stroke: { width: 0 },
    legend: { show: false },
    tooltip: { theme: 'false' },
    dataLabels: { enabled: false },
    labels: ['Apparel', 'Electronics', 'FMCG', 'Other Sales'],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      pie: {
        customScale: 0.9,
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              offsetY: 25,
              fontSize: '0.875rem',
              color: textSecondary
            },
            value: {
              offsetY: -15,
              fontWeight: 500,
              fontSize: '24px',
              formatter: value => `${value}`,
              color: 'var(--mui-palette-text-primary)'
            },
            total: {
              show: true,
              fontSize: '0.875rem',
              label: 'All Paper',
              color: textSecondary,
              formatter: value => `${value.globals.seriesTotals.reduce((total, num) => total + num)}k`
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 1300,
        options: { chart: { height: 257 } }
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        options: { chart: { height: 276 } }
      },
      {
        breakpoint: 1050,
        options: { chart: { height: 250 } }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='Summary Publish'
        action={<OptionsMenu iconClassName='text-textPrimary' options={['Last 28 Days', 'Last Month', 'Last Year']} />}
      />
      <CardContent>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: [3, 0] }}>
            <AppReactApexCharts type='donut' height={277} width='100%' series={[50, 130, 100, 20]} options={options} />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ my: 'auto' }}>
            <div className='flex items-center gap-3'>
              <CustomAvatar skin='light' color='primary' variant='rounded'>
                <i className='ri-wallet-line text-primary' />
              </CustomAvatar>
              <div className='flex flex-col'>
                <Typography>New Submission</Typography>
                <Typography variant='h5'>300</Typography>
              </div>
            </div>
            <Divider className='mlb-6' />
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <div className='flex items-center gap-2 mbe-1'>
                  <div>
                    <i className='ri-circle-fill text-[10px] text-primary' />
                  </div>
                  <Typography>Check</Typography>
                </div>
                <Typography className='font-medium'>50 paper</Typography>
              </Grid>
              <Grid item xs={6}>
                <div className='flex items-center gap-2 mbe-1'>
                  <div>
                    <i className='ri-circle-fill text-[10px] text-primary' />
                  </div>
                  <Typography>Waiting Publish</Typography>
                </div>
                <Typography className='font-medium'>130 paper</Typography>
              </Grid>
              <Grid item xs={6}>
                <div className='flex items-center gap-2 mbe-1'>
                  <div>
                    <i className='ri-circle-fill text-[10px] text-primary' />
                  </div>
                  <Typography>Publish</Typography>
                </div>
                <Typography className='font-medium'>100 paper</Typography>
              </Grid>
              <Grid item xs={6}>
                <div className='flex items-center gap-2 mbe-1'>
                  <div>
                    <i className='ri-circle-fill text-[10px] text-primary' />
                  </div>
                  <Typography>Paper Reject</Typography>
                </div>
                <Typography className='font-medium'>20 Paper</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardWidgetsSalesOverview
