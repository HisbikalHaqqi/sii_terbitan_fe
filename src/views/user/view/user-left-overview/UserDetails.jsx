// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import ConvertDate from '@/helpers/ConvertDate'
import classnames from 'classnames'


const renderList = (list, type) => {

  if (!list || typeof list !== 'object') return null;

  const dataList = {
    about: [
      { property: 'Nama Lengkap', value: list.full_name, icon: 'ri-user-3-line' },
      { property: 'Jenis Kelamin', value: list.gender == "M" ? "Laki-Laki":"Perempuan", icon: 'ri-flag-line' },
      { property: 'Tempat Lahir', value: list.born_place, icon: 'ri-flag-line' },
      { property: 'Tanggal Lahir', value: ConvertDate.ConvertDate(list.created_at), icon: 'ri-calendar-line' },
      { property: 'Pendidikan Terakhir', value: list.last_education, icon: 'ri-flag-line' },
      { property: 'Status', value: list.status === 1 ? "Active" : "Inactive", icon: 'ri-check-line' },
      { property: 'Role', value: list.role, icon: 'ri-star-line' },
      { property: 'Negara', value: list.country, icon: 'ri-map-pin-line' },
      { property: 'Kota', value: list.city, icon: 'ri-building-line' },
      { property: 'Tanggal Join', value: ConvertDate.ConvertDate(list.created_at), icon: 'ri-calendar-line' }
    ],
  };

  const getDataList = dataList[type]; 

  if (!getDataList || getDataList.length === 0) return null; 

  return getDataList.map((item, index) => {
    const displayValue = item.value ? item.value.charAt(0).toUpperCase() + item.value.slice(1) : 'N/A';

    return (
      
      <div key={index} className='flex items-center gap-2'>
        <i className={classnames(item.icon, 'text-textSecondary')} />
        <div className='flex items-center flex-wrap gap-2'>
          <Typography className='font-medium'>
            {`${item.property.charAt(0).toUpperCase() + item.property.slice(1)}:`}
          </Typography>
          <Typography>{displayValue}</Typography>
        </div>
      </div>
    );
  });
};


const UserDetails = ({data}) => {
  const buttonProps = (children, color, variant) => ({
    children,
    color,
    variant
  })

  return (
    <>
      <Card>
        <CardContent className='flex flex-col pbs-12 gap-6'>
          <div className='flex flex-col gap-6'>
            <div className='flex items-center justify-center flex-col gap-4'>
              <div className='flex flex-col items-center gap-4'>
                <CustomAvatar alt='user-profile' src={data.imageProfile} variant='rounded' size={120} />
                <Typography variant='h5'>{data.full_name}</Typography>
              </div>
              <Chip label='Subscriber' color='error' size='small' variant='tonal' />
            </div>
            <div className='flex items-center justify-around flex-wrap gap-4'>
              <div className='flex items-center gap-4'>
                <CustomAvatar variant='rounded' color='primary' skin='light'>
                  <i className='ri-check-line' />
                </CustomAvatar>
                <div>
                  <Typography variant='h5'>1.23k</Typography>
                  <Typography>Total Pengajuan</Typography>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <CustomAvatar variant='rounded' color='primary' skin='light'>
                  <i className='ri-star-smile-line' />
                </CustomAvatar>
                <div>
                  <Typography variant='h5'>568</Typography>
                  <Typography>Menunggu Review</Typography>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <CustomAvatar variant='rounded' color='primary' skin='light'>
                  <i className='ri-star-smile-line' />
                </CustomAvatar>
                <div>
                  <Typography variant='h5'>568</Typography>
                  <Typography>Dipublish</Typography>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Typography variant='h5'>Details</Typography>
            <Divider className='mlb-4' />
              <div className='flex flex-col gap-2'>
                {data && renderList(data, "about")}
              </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default UserDetails
