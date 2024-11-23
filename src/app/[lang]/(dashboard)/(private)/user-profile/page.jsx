// Next Imports
import dynamic from 'next/dynamic'

// Component Imports
import UserProfile from '@/views/user-profile'

// Data Imports
import { getProfileData } from '@/app/server/actions'
import { getServerSession } from 'next-auth'

const ProfileTab = dynamic(() => import('@/views/user-profile/profile/index'))
const BookTab = dynamic(() => import('@/views/user-profile/book/index'))
const SettingTab = dynamic(() => import('@/views/user-profile/setting/index'))
const AccountTab = dynamic(() => import('@/views/user-profile/account/index'))

// Vars
const tabContentList = (email) => ({
  profile: <ProfileTab  email={email} />,
  book: <BookTab  email={email}/>,
  setting: <SettingTab email={email}/>,
  account: <AccountTab  email={email} />
})

const ProfilePage = async () => {

  const session = await getServerSession()
  const email = session.user.email

  return <UserProfile tabContentList={tabContentList(email)} />
}

export default ProfilePage
