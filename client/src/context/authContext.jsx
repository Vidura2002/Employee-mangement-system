import axios from 'axios'
import React, { Children, createContext, useContext, useEffect, useState } from 'react'


const userContext=createContext()

const authContext = ({children}) => {

    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
      const verifyUser=async ()=>{
        try{
          const token=localStorage.getItem("token")
          const response=axios.get("http://localhost:3000/api/auth/verify",{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
          if((await response).data.success){
          setUser((await response).data.user)
          }else{
            setUser(null)
          }
        }catch(error){
          if(error.response && !error.response.data.error){
            setUser(null)
          }
        }finally{
          setLoading(false)
        }
      }
      verifyUser()
    },[])

    const login=(user)=>{
        setUser(user)
    }

    const logout=()=>{
        setUser(null)
        localStorage.removeItem("token")
    }
  return (
    <userContext.Provider value={{user,login,logout,loading}}>
        {children}
    </userContext.Provider>
  )
}
export const useAuth = () =>useContext(userContext)
export default authContext
