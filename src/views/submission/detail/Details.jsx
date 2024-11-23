'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import Grid from '@mui/material/Grid' 
import ConvertDate from '@/helpers/ConvertDate'


// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import classnames from 'classnames'

const Details = ({id}) => {

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
                  "paper_id":  parseInt(id)
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
    const renderList = (detail, type) => {


      if (!detail || typeof detail !== 'object') return null;
    
      const dataDetail = {
        about: [
          { property: 'Judul', value: detail.Paper.title, icon: 'ri-user-3-line' },
          { property: 'Penulis 1', value: detail.Paper.authors, icon: 'ri-flag-line' },
          { property: 'Penulis 2', value: detail.Paper.co_authors, icon: 'ri-check-line' },
          { property: 'Publikasi', value: ConvertDate.ConvertDate(detail.Paper.publication_date), icon: 'ri-star-line' },
          { property: 'Volume', value:detail.Paper.volume, icon: 'ri-map-pin-line' },
          { property: 'Issue', value: detail.Paper.issue, icon: 'ri-building-line' },
          { property: 'Jumlah Halaman', value: detail.Paper.page_range, icon: 'ri-building-line' },
          { property: 'Kata Kunci',value: detail.Paper.keywords, icon: 'ri-phone-line' },
          { property: 'Tipe Riset', value: detail.Paper.research_type, icon: 'ri-phone-line' },
        ],
        contact: [
          { property: 'Info Pendanaan', value: detail.Paper.funding_info, icon: 'ri-phone-line' },
          { property: 'Affiliasi', value:detail.Paper.affiliations, icon: 'ri-facebook-line' },
          { property: 'Link Text', value: detail.Paper.full_text_link, icon: 'ri-twitter-line' },
          { property: 'Bahasa', value: detail.Paper.language, icon: 'ri-pages-line' },
          { property: 'Lisensi', value: detail.Paper.license, icon: 'ri-pages-line' },
        ]
      };
    
      const getDataList = dataDetail[type]; 
    
      if (!getDataList || getDataList.length === 0) return null; 
    
      return getDataList.map((item, index) => {
        const displayValue = item.value ? item.value : 'N/A';
    
        return (
          <ListItem role='listitem' className='flex items-center gap-2 p-0' key={index}>
            <i className={classnames(item.icon, 'text-textSecondary')} />
            <Typography> {`${item.property.charAt(0).toUpperCase() + item.property.slice(1)}:`}</Typography>
            <Typography>{displayValue}</Typography>
          </ListItem>
        );
      });
    };

    useEffect(() => {
      if (id) {
        fetchData(id);  
      }
    }, [id])

    return (
    
      <Card>
        {data && data[0] 
          && 
          <div>
              <Card>
                <CardContent className='flex flex-wrap items-center justify-between gap-4 pbe-6'>
                  <div>
                    <Typography variant='h5'>{data[0].Paper.title}</Typography> 
                      <Typography> 
                        <span className='font-medium text-textPrimary'>{data[0].Paper.authors}</span>
                    </Typography>
                    
                  </div>
                  <div className='flex items-center gap-4'>
                    <Chip label='Fiction' variant='tonal' size='small' color='error' />
                    <Chip label='Comic' variant='tonal' size='small' color='success' />
                    <i className='ri-share-forward-line cursor-pointer' />
                  </div>
              </CardContent>
              <CardContent>
                <div className='border rounded'>
                 
                  <div className='flex flex-col gap-6 p-5'>
                    <div className='flex flex-col gap-4'>
                      <Typography variant='h5'>Abstrak</Typography>
                        <Typography>{data[0].Paper.abstract}</Typography>
                    </div>
                    <Divider />
                    <div className='flex flex-col gap-4'>
                      <Typography variant='h5'>Detail Buku</Typography>
                        <Grid container>
                          <Grid sm={6}>
                            <List role='list' component='div' className='flex flex-col gap-2 plb-0'>
                              <p>{data && renderList(data[0],"about")}</p>
                            </List>
                          </Grid>
                          <Grid sm={6}>
                            <List role='list' component='div' className='flex flex-col gap-2 plb-0'>
                              <p>{data && renderList(data[0],"contact")}</p>
                            </List>
                          </Grid>
                        </Grid>
               
                    </div>
                    <Divider />
                    <div className='flex flex-col gap-4'>
                      <Typography variant='h5'>Penerbit</Typography>
                      <div className='flex items-center gap-4'>
                        <CustomAvatar skin='light-static' color='error' src={"/images/avatars/1.png"} size={38} />
                        <div className='flex flex-col gap-1'>
                          <Typography className='font-medium' color='text.primary'>
                            {data[0].Publisher.name}
                          </Typography>
                          <Typography variant='body2'>{data[0].Publisher.address}</Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
          </Card>
          </div>  
        }
        
      </Card>
    )
}

export default Details
