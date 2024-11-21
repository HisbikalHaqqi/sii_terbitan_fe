'use client'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { toast } from 'react-toastify'
import { useState,useEffect } from 'react'

import classnames from 'classnames'

const Biography = ( id ) => {

  const [loading, setLoading] = useState(false);
  const [dataAPI, setDataAPI] = useState({
    fullname: '',
    role: '',
    birth_date: ''
  });

  const fetchData = async (id) => {
    setLoading(true);

    try {
      const reqBody = JSON.stringify({
        request: id
      });

      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: 'admin/detail-user',
          requestBody: reqBody
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
    fetchData(id)
  }, []);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <Typography variant='caption' className='uppercase'>
                Biografi
              </Typography>
              {dataAPI && dataAPI.biography}
            </div>
            <div className='flex flex-col gap-4'>
              <Typography variant='caption' className='uppercase'>
                Pengalaman
              </Typography>
              {dataAPI && dataAPI.experience}
            </div>
            <div className='flex flex-col gap-4'>
              <Typography variant='caption' className='uppercase'>
                Pencapaian
              </Typography>
              {dataAPI && dataAPI.achievement}
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Biography
