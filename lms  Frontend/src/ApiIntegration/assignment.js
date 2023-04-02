import axios from "axios";
import { createContext, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import  axiosInstance from "./Interseptors"
import { useUserContext } from "./User";

const AssignmentContext =  createContext()
 
export function useAssignmentContext ()
{
    return useContext(AssignmentContext)
}


function objectToFormData(obj) {
  const formData = new FormData();
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (value instanceof File) {
        formData.append(key, value, value.name);
      } else if (value instanceof Array) {
           let data = JSON.stringify(value)
            formData.append(key, data);
          
          
      } else if (typeof value === 'object' && value !== null) {
        let data = JSON.stringify(value)
        formData.append(key, data);
      } else {
       
        formData.append(key,  JSON.stringify(value));
      }
    }
  }
  return formData;
}






export function AssignmentProvider({children})
{
  
   const {setLoader} = useUserContext()
   const [assignmentsData,setAssignmentsData] = useState([])
   const navigate = useNavigate()

    const createAssignment = (data,setSuccessStatus,setErrorStatus) =>{

      setLoader(true)
        axiosInstance.post(`/addassignment`,data).then((response) =>{
            console.log(response);
             setSuccessStatus(true)
        }).catch((error)=>{
            console.log(error)
            setErrorStatus(error.response.data.message)
        }).finally(()=>{
            setLoader(false)
          setTimeout(()=>{
            navigate("/dashboard/assignment")
          },1000)
            
            
        })
    }
 

    const getAssignmentData = () => {
      setLoader(true)
  
      axiosInstance.get(`/getassignment/${JSON.parse(localStorage.getItem("course"))}`).
      then((response) => {
          // console.log(response.data)
         console.log(response.data)
         setAssignmentsData(response.data) 
          
      }).catch((error) => {
          console.log(error)
      }).finally(()=>{
        setLoader(false)
      })
  
    }

  

 




 



  return <AssignmentContext.Provider value={{
    createAssignment,
    getAssignmentData,
    assignmentsData

  }}>
    {children}
  </AssignmentContext.Provider>


}