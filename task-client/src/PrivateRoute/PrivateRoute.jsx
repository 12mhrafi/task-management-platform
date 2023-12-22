import  { useContext } from 'react'
import {Navigate, useLocation} from "react-router-dom"
import { AuthContext } from '../Provider/AuthProvider';
import { Spinner } from 'flowbite-react';
const PrivateRoute = ({children}) => {  

    const location = useLocation();

    const {user,loading} = useContext(AuthContext);

    if(loading){
        return <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
            <Spinner aria-label="Large spinner example" size="lg" />
        </div>
    }
    if(user?.email){
        return children;
    }
    
  return <Navigate state={location?.pathname} to="/login"></Navigate>
}

export default PrivateRoute