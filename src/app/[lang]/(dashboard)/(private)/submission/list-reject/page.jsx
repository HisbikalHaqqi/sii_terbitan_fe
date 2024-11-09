// Component Imports
import ListSubmission from '@/views/submission/list-reject'

// Data Imports
import { getUserData } from '@/app/server/actions'


const ListSubmissionReject = async () => {
  // Vars
  const data = await getUserData()

  return <ListSubmission userData={data} />
}

export default ListSubmissionReject
