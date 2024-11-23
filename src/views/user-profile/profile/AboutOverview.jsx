import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import ConvertDate from '@/helpers/ConvertDate'

import classnames from 'classnames'

const renderList = (list, type) => {

  if (!list || typeof list !== 'object') return null;

  const dataList = {
    about: [
      { property: 'Nama Lengkap', value: list.full_name, icon: 'ri-user-3-line' },
      { property: 'Jenis Kelamin', value: list.gender, icon: 'ri-flag-line' },
      { property: 'Status', value: list.status === 1 ? "Active" : "Inactive", icon: 'ri-check-line' },
      { property: 'Role', value: list.role, icon: 'ri-star-line' },
      { property: 'Negara', value: list.country, icon: 'ri-map-pin-line' },
      { property: 'Kota', value: list.city, icon: 'ri-building-line' },
      { property: 'Tanggal Join', value: ConvertDate.ConvertDate(list.created_at), icon: 'ri-calendar-line' } // Assuming ConvertDate function exists
    ],
    contacts: [
      { property: 'Contact', value: list.phone_number, icon: 'ri-phone-line' },
      { property: 'Email', value: list.email, icon: 'ri-mail-open-line' }
    ]
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

const AboutOverview = ({ data }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <Typography variant='caption' className='uppercase'>
                About
              </Typography>
              {data && renderList(data, "about")}
            </div>
            <div className='flex flex-col gap-4'>
              <Typography variant='caption' className='uppercase'>
                Contacts
              </Typography>
              {data && renderList(data,"contacts")}
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AboutOverview
