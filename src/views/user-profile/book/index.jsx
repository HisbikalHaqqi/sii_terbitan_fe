'use client'

import { useState, useEffect } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'


// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import LinearProgress from '@mui/material/LinearProgress'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

const chipColor = {
  Web: { color: 'primary' },
  Art: { color: 'success' },
  'UI/UX': { color: 'error' },
  Psychology: { color: 'warning' },
  Design: { color: 'info' }
}

const Book = props => {
 const { courseData, searchValue } = props;
 const [activePage, setActivePage] = useState(0)
 const [loading, setLoading] = useState(false);
 const [dataAPI, setDataAPI] = useState([]);
 const { lang: locale } = useParams()


 const fetchData = async () => {
   setLoading(true);

   try {
     const req = JSON.stringify({
       request: { 
        "page": 1,
        "size": 5,
        "filter": {
            "user_id": 2,
            "title": "",
            "publish_date":""
        }
       }
     });

     const response = await fetch('/api/user', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         url: 'paper/by-user-id',
         requestBody: req
       })
     });

     const getResponse = await response.json();

     if (getResponse && getResponse.data) {
       setDataAPI(getResponse.data);
     } else {
       throw new Error('Invalid response from server');
     }
   } catch (error) {

     toast.error(error.message || 'An error occurred while fetching data');
   } finally {

     setLoading(false);
   }
 };

 useEffect(() => {
   fetchData()
 },[]);



  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div>
            <Typography variant='h5'>Artikel / Buku Saya</Typography>
            <Typography>Total 2 Buku</Typography>
          </div>
        </div>
        {dataAPI.total > 0 ? (
          <Grid container spacing={6}>
            {dataAPI.data.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <div className='border rounded bs-full'>
                  <div className='pli-2 pbs-2'>
                    <Link href={getLocalizedUrl('/apps/academy/course-details', locale)} className='flex'>
                      <img src={"/images/cards/sampul_1.jpg"} alt={item.Paper.title} className='is-full' />
                    </Link>
                  </div>
                  <div className='flex flex-col gap-4 p-5'>
     
                    {/* <div className='flex items-center justify-between'>
                      <Chip label={item.tags} variant='tonal' size='small' color={chipColor[item.tags].color} />
                      <div className='flex items-start'>
                        <Typography className='font-medium mie-1'>{item.rating}</Typography>
                        <i className='ri-star-fill text-warning mie-2' />
                        <Typography>{`(${item.ratingCount})`}</Typography>
                     </div>
                    </div> */}
                    <div className='flex flex-col gap-1'>
                      <Typography
                        variant='h5'
                        component={Link}
                        href={getLocalizedUrl('/apps/academy/course-details', locale)}
                        className='hover:text-primary'
                      >
                        {item.Paper.title}
                      </Typography>
                      <Typography>{item.Paper.abstract}</Typography>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='flex items-center gap-1'>
                          <List role='list' component='div' className='flex flex-col gap-2 plb-0'>
                          <ListItem role='listitem' className='flex items-center gap-2 p-0'>
                            <i className='ri-check-line text-xl text-textSecondary' />
                            <Typography>Tanggal Publish: {item.Paper.publish_date}</Typography>
                          </ListItem>
                          <ListItem role='listitem' className='flex items-center gap-2 p-0'>
                            <i className='ri-group-line text-xl text-textSecondary' />
                            <Typography>Jumlah Halaman: {item.Paper.page_range}</Typography>
                          </ListItem>
                          <ListItem role='listitem' className='flex items-center gap-2 p-0'>
                            <i className='ri-global-line text-xl text-textSecondary' />
                            <Typography>Bahasa: {item.Paper.language}</Typography>
                          </ListItem>
                          <ListItem role='listitem' className='flex items-center gap-2 p-0'>
                            <i className='ri-pages-line text-xl text-textSecondary' />
                            <Typography>Penerbit: {item.Publisher.name}</Typography>
                          </ListItem>
                        </List>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-4'>
                        <Button
                          fullWidth
                          variant='outlined'
                          endIcon={
                            <DirectionalIcon ltrIconClass='ri-arrow-right-line' rtlIconClass='ri-arrow-left-line' />
                          }
                          component={Link}
                          href={getLocalizedUrl('/apps/academy/course-details', locale)}
                          className='is-auto flex-auto'
                        >
                          Detail
                        </Button>
                      </div>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography className='text-center'>No Book found</Typography>
        )}
        <div className='flex justify-center'>
          <Pagination
            count={dataAPI.total}
            page={activePage + 1}
            showFirstButton
            showLastButton
            variant='tonal'
            color='primary'
            onChange={(e, page) => setActivePage(page - 1)}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default Book
