'use client'

import React from 'react'

import Grid from '@mui/material/Grid'

// Component Imports
import Details from '@views/submission/detail/Details'
import Sidebar from '@views/submission/detail/Sidebar'

const PageDetail = ({ id }) => {

    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={8}>
                <Details id={id} />
            </Grid>
            <Grid item xs={12} md={4}>
            <div className='sticky top-[88px]'>
                <Sidebar id={id} />
            </div>
            </Grid>
        </Grid>
    )
}

export default PageDetail
   
