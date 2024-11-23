'use client'
// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import UserDetails from './UserDetails'
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'

const UserLeftOverview = (id) => {

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
        <UserDetails data={dataAPI}/>
      </Grid>
    </Grid>
  )
}

export default UserLeftOverview
