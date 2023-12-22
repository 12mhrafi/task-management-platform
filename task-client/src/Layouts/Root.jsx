import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header/Header'
import { Toaster } from 'react-hot-toast'

import useTask from '../hooks/useTask'
import { Footer } from 'flowbite-react'
import FooterComponent from '../Components/Footer/Footer'

const Root = () => {
const [tasks,refetch] = useTask();
if(tasks){
  refetch();
}
  return (
    <div>
        <Header />
        <Outlet />
        <FooterComponent />
        <Toaster></Toaster>

    </div>
  )
}

export default Root