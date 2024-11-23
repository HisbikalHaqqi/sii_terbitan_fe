// Component Imports
import ListSubmission from '@/views/submission/list-submission'

// Data Imports
import { getServerSession } from 'next-auth'


const ListSubmissionAll = async () => {
  const data = await getServerSession()
  const email = data?.user.email

  return <ListSubmission email={email} />
}

export default ListSubmissionAll
