import React from 'react'
import MyPage from './dashboard'
import ClientLayout from '../login/client_layout' 
import PageLayout from '../components/sliderNavebar'
function dashboard() {
  return (
    <ClientLayout>
    <div>
      <PageLayout/>
<MyPage/>

    </div>
    </ClientLayout>
  )
}

export default dashboard