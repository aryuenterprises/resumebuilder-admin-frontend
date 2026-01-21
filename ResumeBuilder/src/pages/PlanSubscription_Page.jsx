import React from 'react'
import Sidebar from '../components/Sidebar'
import DesiredJobTitle from '../components/Desired Job Title/DesiredJobTitle'
import PlanSubscription from '../components/Subscription Module/Plansubscription'

const PlanSubscription_Page = () => {
  return (
    <div className='flex '>

      <div className="bg-gray-100 md:bg-white">
      <Sidebar/>
      </div>
      
     <PlanSubscription/>
    </div>
  )
}

export default PlanSubscription_Page