import React from 'react'
import Sidebar from '../components/Sidebar'
import PaymentRecords from '../components/Payment Records Module/PaymentRecords'

const PaymentRecords_page = () => {
  return (
    <div className='flex '>

      <div className="bg-gray-100 md:bg-white">
      <Sidebar/>
      </div>
      
     <PaymentRecords/>
    </div>
  )
}

export default PaymentRecords_page