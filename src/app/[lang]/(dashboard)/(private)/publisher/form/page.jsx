// Next Imports
import dynamic from 'next/dynamic'

// Component Imports
import UserProfile from '@/views/user-profile'

// Data Imports
import { getProfileData } from '@/app/server/actions'
import { getServerSession } from 'next-auth'
import FormPublisher from '@/views/publisher/FormPublisher'


const Publisher = async () => {
  // Vars

  return <FormPublisher  />
}

export default Publisher
