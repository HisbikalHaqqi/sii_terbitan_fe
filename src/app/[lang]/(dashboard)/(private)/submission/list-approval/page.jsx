// Component Imports
import ListSubmission from '@/views/submission/list-approval'

// Data Imports
import { getUserData } from '@/app/server/actions'


const ListSubmssionApproval = async () => {
  // Vars
  const data = await getUserData()

  return <ListSubmission userData={data} />
}

export default ListSubmssionApproval
