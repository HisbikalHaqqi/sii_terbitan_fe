'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import ConvertDate from '@/helpers/ConvertDate'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import classnames from 'classnames'

const renderList = (detail, type) => {

  if (!detail || typeof detail !== 'object') return null;

  const dataDetail = {
    about: [
      { property: 'Nama Penerbit', value: detail.name, icon: 'ri-user-3-line' },
      { property: 'Alamat', value: detail.address, icon: 'ri-flag-line' },
      { property: 'Email', value: detail.email, icon: 'ri-check-line' },
      { property: 'Tahun Berdiri', value: detail.founded_year, icon: 'ri-star-line' },
      { property: 'Kota', value: detail.country, icon: 'ri-map-pin-line' },
      { property: 'Kontak 1', value: detail.contact_person_1, icon: 'ri-building-line' },
      { property: 'Kontak 2', value: detail.contact_person_2, icon: 'ri-building-line' },
      { property: 'Tanggal Join', value: ConvertDate.ConvertDate(detail.join_date), icon: 'ri-calendar-line' },
      { property: 'No Telepon', value: detail.phone, icon: 'ri-phone-line' },
    ],
    contacts: [
      { property: 'Fax', value: detail.fax, icon: 'ri-phone-line' },
      { property: 'Link Facebook', value: detail.social_fb_links, icon: 'ri-facebook-line' },
      { property: 'Link Twitter', value: detail.social_twitter_links, icon: 'ri-twitter-line' },
      { property: 'Link Website', value: detail.social_web_links, icon: 'ri-pages-line' },
   
   
    ]
  };

  const getDataList = dataDetail[type]; 

  if (!getDataList || getDataList.length === 0) return null; 

  return getDataList.map((item, index) => {
    const displayValue = item.value ? item.value : 'N/A';

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


const DetailPublisherView = () => {

  const [loading, setLoading] = useState(false);
  const [dataAPI, setDataAPI] = useState({
    publisher_id: '',
    name: '',
    address: '',
    email:'',
    website:'',
    founded_year:'',
    country:'',
    contact_person_1:'',
    contact_person_2:'',
    fax:'',
    fb_link:'',
    twitter_link:'',
    web_link:'',
    join_date:'',
    phone:'',
    entry_name:''
  });

  const fetchData = async () => {
    setLoading(true);

    try {
      const req = JSON.stringify({
        request: { 
          "id":1
        }
      });

      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: 'publisher/by_id',
          requestBody: req
        })
      });

      const getResponse = await response.json();
      console.log(getResponse)

      if (getResponse.status == 200) {
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
  }, []);

  return (
    <Grid container spacing={6}>
        <Grid item xs={12}>
        <Typography variant='h4'>Informasi Penerbit</Typography>
        <Typography>Detail informasi penerbit</Typography>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardContent className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <Typography variant='caption' className='uppercase'>
                Informasi Penerbit
              </Typography>
              {dataAPI && renderList(dataAPI, "about")}
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardContent className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <Typography variant='caption' className='uppercase'>
                Informasi Lainnya
              </Typography>
              {dataAPI && renderList(dataAPI,"contacts")}
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default DetailPublisherView
