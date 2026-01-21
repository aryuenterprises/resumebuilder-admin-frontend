import ResumeData from '../components/Resume Data Module/resumeData'
import Sidebar from '../components/Sidebar'

const ResumeData_Page = () => {
  return (
    <div className='flex '>

      <div className="bg-gray-100 md:bg-white">
      <Sidebar/>
      </div>
      
     <ResumeData/>
    </div>
  )
}

export default ResumeData_Page