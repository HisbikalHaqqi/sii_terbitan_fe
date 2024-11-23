// MUI Imports
import PageDetail from '@/views/submission/detail/PageDetail'

const CourseDetailsPage = async (data) => {

  return (
    <PageDetail id={decodeURIComponent(data.params.id)} />
  )
}

export default CourseDetailsPage
