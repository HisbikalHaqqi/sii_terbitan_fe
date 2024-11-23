import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import ConvertDate from '@/helpers/ConvertDate'

import classnames from 'classnames'

const renderList = (list, type) => {


  if (!list || typeof list !== 'object' || !type) return null;

  const data = {
    biography: list.biography,
    experience: list.experience,  
    achievement: list.achievement,  
  };

  if (!data[type]) return null;

  return (
    <div className='flex items-center gap-2'>
      <Typography className='font-medium'>
        {data[type]}
      </Typography>
    </div>
  );
};


const Biography = ({ data }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <Typography variant='caption' className='uppercase'>
                Biografi
              </Typography>
              {data && renderList(data, "biography")}
            </div>
            <div className='flex flex-col gap-4'>
              <Typography variant='caption' className='uppercase'>
                Pengalaman
              </Typography>
              {data && renderList(data,"experience")}
            </div>
            <div className='flex flex-col gap-4'>
              <Typography variant='caption' className='uppercase'>
                Pencapaian
              </Typography>
              {data && renderList(data,"achievement")}
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Biography
