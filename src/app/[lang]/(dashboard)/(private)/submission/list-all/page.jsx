// Component Imports
import ListSubmission from '@/views/submission/list-submission'

// Data Imports
import { getUserData } from '@/app/server/actions'


const ListSubmissionAll = async () => {
  // Vars
  const data = await getUserData()

  return <ListSubmission userData={data} />
}

export default ListSubmissionAll
