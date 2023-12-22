import React, { useContext } from 'react'
import useAxiosPublic from './useAxiosPublic'
import {useQuery} from "@tanstack/react-query"
import { AuthContext } from '../Provider/AuthProvider';
const useTask = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useContext(AuthContext);
    const {data: tasks = [], refetch}  = useQuery({
        queryKey:["tasks", user?.email],
        queryFn: async ( ) => {
            const res = await axiosPublic.get(`/getTask?email=${user?.email}`);
            return  res.data
        }
    })

        
  return [tasks,refetch];
 
}

export default useTask