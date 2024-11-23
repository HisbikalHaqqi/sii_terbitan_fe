// Next Imports
import dynamic from 'next/dynamic'

// Component Imports
import UserProfile from '@/views/user-profile'

// Data Imports
import { getProfileData } from '@/app/server/actions'
import { getServerSession } from 'next-auth'
import FormPublisher from '@/views/publisher/FormPublisher'
import FormCategory from '@/views/category/FormCategory'


const CategoryAdd = async () => {
  // Vars

  return <FormCategory  />
}

export default CategoryAdd
