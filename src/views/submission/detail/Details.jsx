'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Grid from '@mui/material/Grid'
import ConvertDate from '@/helpers/ConvertDate'
import DecryptData from '@/helpers/DecryptData'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import classnames from 'classnames'
import Approval from './Approval'

const Details = ({ id }) => {
  const [loading, setLoading] = useState(false)
  const [data, setDataAPI] = useState(null)
  const approvalPosisi = 10927

  // Fetch data function
  const fetchData = async (id) => {
    const getIdDecrypt = DecryptData(id)
    setLoading(true)

    try {
      const req = JSON.stringify({
        request: { "id": parseInt(getIdDecrypt) },
      })

      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: 'paper/by-id',
          requestBody: req,
        }),
      })

      const getResponse = await response.json()

      if (getResponse && getResponse.data) {
        setDataAPI(getResponse.data)
      } else {
        throw new Error('Invalid response from server')
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Render list helper function
  const renderList = (detail, type) => {
    if (!detail || typeof detail !== 'object') return null

    const dataDetail = {
      about: [
        { property: 'Judul', value: detail.Paper.title, icon: 'ri-file-paper-line' },
        { property: 'Penulis 1', value: detail.Paper.authors, icon: 'ri-user-line' },
        { property: 'Penulis 2', value: detail.Paper.co_authors, icon: 'ri-user-line' },
        { property: 'Publikasi', value: ConvertDate.ConvertDate(detail.Paper.publication_date), icon: 'ri-star-line' },
        { property: 'Volume', value: detail.Paper.volume, icon: 'ri-map-pin-line' },
        { property: 'Issue', value: detail.Paper.issue, icon: 'ri-bug-line' },
        { property: 'Jumlah Halaman', value: detail.Paper.page_range, icon: 'ri-pages-line' },
        { property: 'Kata Kunci', value: detail.Paper.keywords, icon: 'ri-key-line' },
        { property: 'Tipe Riset', value: detail.Paper.research_type, icon: 'ri-search-line' },
      ],
      contact: [
        { property: 'Info Pendanaan', value: detail.Paper.funding_info, icon: 'ri-wallet-line' },
        { property: 'Affiliasi', value: detail.Paper.affiliations, icon: 'ri-group-line' },
        { property: 'Link Text', value: detail.Paper.full_text_link, icon: 'ri-link' },
        { property: 'Bahasa', value: detail.Paper.language, icon: 'ri-speaker-line' },
        { property: 'Lisensi', value: detail.Paper.license, icon: 'ri-pages-line' },
      ],
    }

    const getDataList = dataDetail[type]

    if (!getDataList || getDataList.length === 0) return null

    return getDataList.map((item, index) => {
      const displayValue = item.value ? item.value : 'N/A'

      return (
        <ListItem role='listitem' className='flex items-center gap-2 p-0' key={index}>
          <i className={classnames(item.icon, 'text-textSecondary')} />
          <Typography>{`${item.property.charAt(0).toUpperCase() + item.property.slice(1)}:`}</Typography>
          <Typography>{displayValue}</Typography>
        </ListItem>
      )
    })
  }

  useEffect(() => {
    if (id) {
      fetchData(id)
    }
  }, [id])

  if (loading) return <Typography>Loading...</Typography>

  return (
    <div>
      {data ? (
        <div>
          <Card>
            <CardContent className='flex flex-wrap items-center justify-between gap-4 pbe-6'>
              <div>
                <Typography variant='h5'>{data.Paper.title}</Typography>
                <Typography>
                  <span className='font-medium text-textPrimary'>{data.Paper.authors}</span>
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
                    <Typography>{data.Paper.abstract}</Typography>
                  </div>
                  <Divider />
                  <div className='flex flex-col gap-4'>
                    <Typography variant='h5'>Detail Buku</Typography>
                    <Grid container>
                      <Grid sm={6} xs={12} >
                        <List role='list' component='div' className='flex flex-col gap-2 plb-0'>
                          {renderList(data, 'about')}
                        </List>
                      </Grid>
                      <Grid sm={6}  xs={12}>
                        <List role='list' component='div' className='flex flex-col gap-2 plb-0'>
                          {renderList(data, 'contact')}
                        </List>
                      </Grid>
                    </Grid>
                  </div>
                  <Divider />
                  <div className='flex flex-col gap-4'>
                    <Typography variant='h5'>Penerbit</Typography>
                    <div className='flex items-center gap-4'>
                      <CustomAvatar skin='light-static' color='error' src='/images/avatars/1.png' size={38} />
                      <div className='flex flex-col gap-1'>
                        <Typography className='font-medium' color='text.primary'>
                          {data.Publisher.name}
                        </Typography>
                        <Typography variant='body2'>{data.Publisher.address}</Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          { 
              data && data.Paper && (data.Paper.approval_position == approvalPosisi) ? 
              (
                <Grid marginTop={2}>
                    <Approval id={id} />
                 </Grid>
              ) : (
                <p></p>
              )
            }
        </div>
      ) : (
        <Card>
          <Typography>No data found.</Typography>
        </Card>
     
      )}
      </div>

  )
}

export default Details
