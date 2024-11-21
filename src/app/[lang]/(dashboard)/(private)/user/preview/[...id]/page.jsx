
// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Grid from '@mui/material/Grid'
// Component Imports
import UserLeftOverview from '@views/user/view/user-left-overview'
import UserRight from '@views/user/view/user-right'
import UserBottom from '@/views/user/view/user-bottom'

const SubmissionListTab = dynamic(() => import('@/views/user/view/user-bottom/submission-list'))
const SubmissionListWaitingTab = dynamic(() => import('@/views/user/view/user-bottom/submission-waiting'))
const SubmissionListPublishTab = dynamic(() => import('@/views/user/view/user-bottom/submission-published'))
const SecurityTab = dynamic(() => import('@views/user/view/user-right/security'))
const BiografiTab = dynamic(() => import('@views/user/view/user-right/biography'))

// Vars
const tabContentList = data => ({
  biografi: <BiografiTab userId={decodeURIComponent(data.params.id)} />,
  security: <SecurityTab />
  
})

const tabContentListBottom = data => ({
  submission: <SubmissionListTab userId={decodeURIComponent(data.params.id)} />,  
  waiting: <SubmissionListWaitingTab userId={decodeURIComponent(data.params.id)} />,  
  publish: <SubmissionListPublishTab userId={decodeURIComponent(data.params.id)} />,  
})


const UserViewTab = async (data) => {
  return (
    <>
     <Grid container spacing={6}>
        <Grid item lg={12} md={12} xs={12}>
            <Grid container spacing={6} justifyContent='space-between'>
              <Grid item xs={12} lg={6} md={6} sm={6}>
                <UserLeftOverview userId={decodeURIComponent(data.params.id)}/>
              </Grid>
              <Grid item xs={12} lg={6} md={6} sm={6}>
                <UserRight tabContentList={tabContentList(data)} />
              </Grid>
            </Grid>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
            <Grid container spacing={6}>
              <Grid item xs={12} lg={12} md={12} sm={6}>
                <UserBottom tabContentList={tabContentListBottom(data)} />
              </Grid>
            </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default UserViewTab
