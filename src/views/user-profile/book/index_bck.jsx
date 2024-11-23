'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Chip from '@mui/material/Chip'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@core/components/option-menu'
import Link from '@components/Link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Teams = ({ data,email }) => {

  const [loading, setLoading] = useState(false);
  const [dataAPI, setDataAPI] = useState([]);

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
  }, []);

  return (
    <Grid container spacing={6}>
      
      {dataAPI.data &&
        dataAPI.data.map((item, index) => {
          return (
            <Grid item key={index} xs={12} md={6} lg={4}>
              <Card>
                <CardContent className='flex flex-col gap-4'>
                  <div className='flex items-center justify-between gap-2'>
                    <div className='flex items-center gap-2'>
                      <CustomAvatar size={38} src={item.avatar} />
                      <Typography variant='h5'>{item.Paper.title}</Typography>
                    </div>
                    <div className='flex items-center gap-1'>
                      <OptionMenu
                        iconButtonProps={{
                          size: 'medium',
                          className: 'text-textDisabled'
                        }}
                        options={[
                          'View Details',
                        ]}
                      />
                    </div>
                  </div>
                  <Typography>{item.Paper.abstract}</Typography>
                  <div className='flex items-center justify-between flex-wrap'>
                   
                    <div className='flex items-center gap-2'>
                      {/* {item.chips.map((chip, index) => (
                        <Link key={index}>
                          <Chip variant='tonal' size='small' label={chip.title} color={chip.color} />
                        </Link>
                      ))} */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
    </Grid>
  )
}

export default Teams
