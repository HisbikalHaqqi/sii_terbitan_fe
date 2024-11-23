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


// Component Imports
import TimelineComponent from './Timeline'
import Approval from './Approval'

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

const approvalPosisi = 1

const Sidebar = ({id,userId}) => {

  const [loading, setLoading] = useState(false);
  const [data, setDataAPI] = useState([]);

  // Hooks
  const fetchData = async (id) => {
      setLoading(true);
   
      try {
        const req = JSON.stringify({
          request: { 
            "page": 1, 
            "size": 1,
            "filter": {
                "paper_id": parseInt(id)
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
          setDataAPI(getResponse.data.data)
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

  return (
    <div>
       {
          // data && data[0] 
          // && 
          <Grid container gap={5}>
            <Grid item lg={12} md={12} xs={12}>
                <Card>
                  <CardHeader title='Riwayat Persetujuan' />
                  <CardContent>
                    <Timeline>
                    {
                      data && data[0] && data[0].ApprovalSubmission && data[0].ApprovalSubmission.approval_list && (

                        JSON.parse(data[0].ApprovalSubmission.approval_list).map((approval, index) => (
                      
                          <TimelineComponent 
                            data={approval} 
                            key={index} 
                            approval_posisi={approvalPosisi} 
                          />
                        ))
                      )
                    }
                    </Timeline>
                  </CardContent>
                </Card>
            </Grid>
            { 
              data && 
              data[0] && 
              data[0].ApprovalSubmission && 
              (
                <Approval data={data[0]} />
              )
            }

          
          </Grid>
        }
    </div>
  )
}

export default Sidebar
