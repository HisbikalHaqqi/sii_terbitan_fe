'use client'
// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import AboutOverview from './AboutOverview'
import  { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import Biography from './Biography'

const ProfileTab = ({ email }) => {
  const [loading, setLoading] = useState(false);
  const [dataAPI, setDataAPI] = useState({
    fullname: '',
    role: '',
    birth_date: ''
  });

  const fetchData = async () => {
    setLoading(true);

    try {
      const req = JSON.stringify({
        request: { 
          "email":email
        }
      });

      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: 'detail-user',
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
    fetchData(email)
  }, []);

  return (
    <Grid container spacing={6}>
      <Grid item lg={4} md={5} xs={12}>
        <AboutOverview data={dataAPI} />
      </Grid>
      <Grid item lg={8} md={7} xs={12}>
        <Grid item xs={12}>
        <Biography data={dataAPI} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProfileTab
