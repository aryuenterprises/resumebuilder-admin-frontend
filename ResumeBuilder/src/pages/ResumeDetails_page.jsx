
import Sidebar from '../components/Sidebar'
import ResumeDetails from '../components/UserList Components/ResumeDetails'

const ResumeDetails_page = () => {
  return (
    <div className='flex '>

      <div className="bg-gray-100 md:bg-white">
      <Sidebar/>
      </div>
      
     <ResumeDetails/>
    </div>
  )
}

export default ResumeDetails_page