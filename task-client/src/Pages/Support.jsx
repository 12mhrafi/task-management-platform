import React, { useContext } from 'react'
import { AuthContext } from '../Provider/AuthProvider'
import ContainerArea from '../Components/ContainerArea/ContainerArea';
import { Button } from 'flowbite-react';

const Support = () => {
   const {user} = useContext(AuthContext);
  return (
   <ContainerArea>
     <div className='flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-bold'>Hello, {user?.displayName}, Welcome to Task management</h2>
      <div className='relative'>
      <input className='md:w-[60vw] w-[90vw] mt-4' type="text" placeholder='how can i help? ' />
        <Button className='absolute rounded-none bottom-0 right-0 ' type='submit'>Send</Button>
      </div>
   </div>
   </ContainerArea>
  )
}

export default Support