import React from 'react'
import { Outlet } from 'react-router-dom'
import Dashboard from './Dashboard'
import DashHeader from './DashHeader'
import { Toaster } from 'react-hot-toast'
import useTask from '../../hooks/useTask'

const DashboardRoot = () => {
   const [tasks,refetch] = useTask();
   if(tasks){
    refetch();
   }
  
  return (
    <div>
        <DashHeader></DashHeader>
        <Outlet></Outlet>
        <Toaster></Toaster>
    </div>
  )
}

export default DashboardRoot