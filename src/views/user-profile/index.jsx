'use client'

import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

import UserProfileHeader from './UserProfileHeader'
import CustomTabList from '@core/components/mui/TabList'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const UserProfile = ({ tabContentList, email }) => {

  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false);
  const [dataAPI, setDataAPI] = useState({
    fullname: '',
    role: '',
    birth_date: ''
  });

  const handleChange = (event, value) => {
    setActiveTab(value)
  }

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
        <UserProfileHeader data={dataAPI} />
      </Grid>
      {activeTab === undefined ? null : (
        <Grid item xs={12} className='flex flex-col gap-6'>
          <TabContext value={activeTab}>
            <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
              <Tab
                label={
                  <div className='flex items-center gap-1.5'>
                    <i className='ri-user-3-line text-lg' />
                    Profil Pengguna
                  </div>
                }
                value='profile'
              />
              <Tab
                label={
                  <div className='flex items-center gap-1.5'>
                    <i className='ri-computer-line text-lg' />
                    Artikel / Buku
                  </div>
                }
                value='book'
              />
              <Tab
                label={
                  <div className='flex items-center gap-1.5'>
                    <i className='ri-team-line text-lg' />
                    Pengaturan Akun
                  </div>
                }
                value='setting'
              />
              <Tab
                label={
                  <div className='flex items-center gap-1.5'>
                    <i className='ri-team-line text-lg' />
                    Pengaturan Keamanan
                  </div>
                }
                value='account'
              />
            </CustomTabList>

            <TabPanel value={activeTab} className='p-0'>
              {tabContentList[activeTab]}
            </TabPanel>
          </TabContext>
        </Grid>
      )}
    </Grid>
  )
}

export default UserProfile
