import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab'
import { Chip, Typography } from '@mui/material'
import React from 'react'
import ConvertDate from '@/helpers/ConvertDate'

export default function TimelineComponent({data,approval_posisi}) {
    var colorTimeline = ""

    if (data.user_id == approval_posisi){
        colorTimeline = "success"
    }else if(data.user_id != approval_posisi){
        colorTimeline = "info"
    }else{
        colorTimeline = "info"
    }
    
  return (
    <div>
        <TimelineItem>
            <TimelineSeparator>
                <TimelineDot color={colorTimeline} />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                    <Typography className='font-medium' color='text.primary'>{data.name} {data.role}</Typography>
                    <Typography variant='caption'>{ConvertDate.ConvertDate(data.entry_time)}</Typography>
                </div>
                <div className='flex items-center gap-2.5 is-fit bg-actionHover rounded plb-[5px] pli-2.5'>
                    <Chip label='Ditolak' size='small' color={`${data.approval_type == "approve" ? "success":"error" }`} variant='tonal' className='self-start rounded-sm' />
                    <Typography className='font-medium' color='text.primary'>{data.entry_note}</Typography>
                </div>
            </TimelineContent>
        </TimelineItem>
    </div>
  )
}
