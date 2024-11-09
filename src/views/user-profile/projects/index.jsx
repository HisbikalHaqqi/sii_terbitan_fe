// MUI Imports
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import LinearProgress from '@mui/material/LinearProgress'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'

// Component Imports
import OptionMenu from '@core/components/option-menu'
import Link from '@components/Link'
import CustomAvatar from '@core/components/mui/Avatar'

const Projects = ({ data }) => {
  return (
    <Grid container spacing={6}>
      {data &&
        data.map((item, index) => {
          return (
            <Grid item key={index} xs={12} md={6} lg={4}>
              <Card>
                <CardContent className='flex flex-col gap-4'>
                  <div className='flex items-center justify-between gap-4'>
                    <div className='flex items-center gap-4'>
                      <CustomAvatar src={item.avatar} size={38} />
                      <div>
                        <Typography variant='h5' component={Link} className='hover:text-primary'>
                          {item.title}
                        </Typography>
                        <Typography>
                          <span className='font-medium'>Publisher: </span>
                          {item.client}
                        </Typography>
                      </div>
                    </div>
                    <OptionMenu
                      iconButtonProps={{
                        size: 'small',
                        className: 'text-textDisabled'
                      }}
                      options={[
                        'Rename Article',
                        'View Details',
                        { divider: true },
                        { text: 'Leave Project', menuItemProps: { className: 'text-error' } }
                      ]}
                    />
                  </div>
                  <div className='flex items-center justify-between flex-wrap'>
                    <div className='flex flex-col'>
                      <div className='flex gap-1'>
                        <Typography className='font-medium' color='text.primary'>
                          Start Submission:
                        </Typography>
                        <Typography>{item.startDate}</Typography>
                      </div>
                      <div className='flex gap-1'>
                        <Typography className='font-medium' color='text.primary'>
                          End Submission:
                        </Typography>
                        <Typography>{item.deadline}</Typography>
                      </div>
                    </div>
                  </div>
                  <Typography>{item.description}</Typography>
                </CardContent>
                <Divider />
                <CardContent className='flex flex-col gap-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex gap-1'>
                      <Typography className='font-medium' color='text.primary'>
                        Publish Date:
                      </Typography>
                      <Typography>{item.hours}</Typography>
                    </div>
                    <Chip size='small' variant='tonal' color={item.chipColor} label={`4.3 star`} />
                  </div>
                  <div className='flex items-center justify-between gap-1'>
                    <div className='flex items-center flex-grow gap-3'>
                      <AvatarGroup className='items-center pull-up'>
                        {item.avatarGroup.map((person, index) => {
                          return (
                            <Tooltip key={index} title={person.name}>
                              <Avatar src={person.avatar} alt={person.name} className='bs-8 is-8' />
                            </Tooltip>
                          )
                        })}
                      </AvatarGroup>
                      <Typography variant='body2' color='text.disabled' className='flex-grow'>
                        {item.members}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
    </Grid>
  )
}

export default Projects
