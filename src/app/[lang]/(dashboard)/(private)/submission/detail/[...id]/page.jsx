// MUI Imports
import PageDetail from '@/views/submission/detail/PageDetail'
import { getServerSession } from 'next-auth'

const DetailAssign = async (data) => {

  // const dataSession = await getServerSession()
  const getUserId = 1026
  return (
    <PageDetail id={decodeURIComponent(data?.params.id)} userId={getUserId} />
  )
}

export default DetailAssign
