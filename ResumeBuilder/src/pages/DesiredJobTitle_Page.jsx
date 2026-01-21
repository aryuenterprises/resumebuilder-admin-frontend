import React from 'react'
import Sidebar from '../components/Sidebar'
import DesiredJobTitle from '../components/Desired Job Title/DesiredJobTitle'

const DesiredJobTitle_Page = () => {
  return (
    <div className='flex '>

      <div className="bg-gray-100 md:bg-white">
      <Sidebar/>
      </div>
      
     <DesiredJobTitle/>
    </div>
  )
}

export default DesiredJobTitle_Page