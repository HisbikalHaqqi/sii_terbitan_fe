'use client'

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiTimeline from '@mui/lab/Timeline'
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import DecryptData from '@/helpers/DecryptData'
import Typography from '@mui/material/Typography'
import ConvertDate from '@/helpers/ConvertDate'


// Component Imports
import TimelineComponent from './Timeline'
import Approval from './Approval'
import { Divider } from '@mui/material'
import HistoryReject from './HistoryReject'

// Styled Timeline component
const Timeline = styled(MuiTimeline)({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

const approvalPosisi = 10927

const Sidebar = ({id}) => {

  const [loading, setLoading] = useState(false);
  const [data, setDataAPI] = useState([]);

  // Hooks
  const fetchData = async (id) => {
      const getIdDecrypt = DecryptData(id)
      setLoading(true);
   
      try {
        const req = JSON.stringify({
          request: { 
            "id":parseInt(getIdDecrypt)
          }
        });
   
        const response = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: 'paper/by-id',
            requestBody: req
          })
        });
   
        const getResponse = await response.json();
        if (getResponse && getResponse.data) {
          setDataAPI(getResponse.data)
        } else {
          throw new Error('Invalid response from server')
        }
      } catch (error) {
        toast.error(error)
      } finally {
        setLoading(false)
      }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);  
    }
  }, [id])

  if (loading) return <Typography>Loading...</Typography>

  return (
    <div>
       {
          data ? (
            <Grid container gap={5}>
              <Grid item lg={12} md={12} xs={12}>
                  {
                    data && data.Paper && data.Paper.approval_list ? (
                    <div>
                        <Grid container gap={5}>
                          <Grid item lg={12} md={12} xs={12}>
                            <Card>
                              <CardHeader title='Riwayat Persetujuan' />
                              <Divider/>
                              <CardContent>

                                <Typography variant='h6'>Maker Penugasan Review</Typography>
                                <Typography className='font-medium' color='text.primary'>{data.Paper.entry_name_assign_approval}</Typography>
                                <Typography variant='caption'>{ConvertDate.ConvertDate(data.Paper.entry_time_assign_approval)}</Typography>
                                <Typography>{data.Paper.catatan_assignment}</Typography>

                                <Typography variant='h6' marginBottom={5} marginTop={5}>User Approval</Typography>
                              
                                <Timeline marginBottom={10}>
                                  {JSON.parse(data.Paper.approval_list).map((approval, index) => (
                                    <TimelineComponent 
                                      data={approval} 
                                      key={index} 
                                      approval_posisi={approvalPosisi} 
                                    />
                                  ))}
                                </Timeline>
                              </CardContent>
                            </Card>
                            {
                                data && data.Paper.catatan_tolakan ? (
                                  <HistoryReject data={data.Paper.catatan_tolakan}/>
                                ) : (
                                  <p></p>
                                )
                              }
                          </Grid>
                        </Grid>
                      </div>
                    ) : (
                      <p></p>
                    )
                  }
              </Grid>
             
            </Grid>
          ):(
           <Typography>Naskah ini belum di assign.</Typography>
          )
        }
    </div>
  )
}

export default Sidebar
