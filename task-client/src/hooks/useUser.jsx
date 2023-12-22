import React, { useContext } from 'react'
import { AuthContext } from '../Provider/AuthProvider'

const useUser = () => {
    const {user,loading} = useContext(AuthContext);
  return {user,loading};
}

export default useUser