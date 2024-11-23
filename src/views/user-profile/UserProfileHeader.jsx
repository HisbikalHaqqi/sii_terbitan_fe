'use client'

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import ConvertDate from '../../helpers/ConvertDate'

import classnames from 'classnames'

const UserProfileHeader = ({ data }) => {
  return (
    <Card>
      <CardMedia image="/images/pages/profile-banner.png" className='bs-[100px]' />
      <CardContent className='flex gap-6 justify-center flex-col items-center md:items-end md:flex-row !pt-0 md:justify-start'>
        <div className='flex rounded-bs-md mbs-[-45px] border-[5px] border-backgroundPaper bg-backgroundPaper'>
          <img height={120} width={120} src={data?.imageProfile} className='rounded' alt='Profile Background' />
        </div>
        <div className='flex is-full flex-wrap justify-center flex-col items-center sm:flex-row sm:justify-between sm:items-end gap-5'>
          <div className='flex flex-col items-center sm:items-start gap-2'>
            <Typography variant='h4'>{data?.full_name}</Typography>
            <div className='flex flex-wrap gap-6 justify-center sm:justify-normal'>
              <div className='flex items-center gap-2'>
                {"ri-palette-line" && <i className={classnames("ri-palette-line", 'text-textSecondary')} />}
                <Typography className='font-medium'>{data?.role}</Typography>
              </div>
              <div className='flex items-center gap-2'>
                <i className='ri-map-pin-2-line text-textSecondary' />
                <Typography className='font-medium'>{data?.country == "" ? "Not Defined" : data?.country}</Typography>
              </div>
              <div className='flex items-center gap-2'>
                <i className='ri-calendar-line text-textSecondary' />
                <Typography className='font-medium'>{ConvertDate.ConvertDate(data?.created_at)}</Typography>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserProfileHeader
