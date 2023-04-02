import axios from "axios";
import { createContext, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import  axiosInstance from "./Interseptors"
import { useUserContext } from "./User";

const LectureContext =  createContext()
 
export function useLectureContext ()
{
    return useContext(LectureContext)
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






export function LectureProvider({children})
{
  
   const {setLoader} = useUserContext()
   const [lecturesData,setLecturesData] = useState([])
   const navigate = useNavigate()

    const createLecture = (data,setSuccessStatus,setErrorStatus) =>{

      setLoader(true)
        axiosInstance.post(`/addlecture`,objectToFormData(data)).then((response) =>{
            console.log(response);
             setSuccessStatus(true)
        }).catch((error)=>{
            console.log(error)
            setErrorStatus(error.response.data.message)
        }).finally(()=>{
            setLoader(false)
          setTimeout(()=>{
            navigate("/dashboard/lecture")
          },1000)
            
            
        })
    }
 

    const getLectureData = () => {
      setLoader(true)
  
      axiosInstance.get(`/getlecture/${JSON.parse(localStorage.getItem("course"))}`).
      then((response) => {
          // console.log(response.data)
         console.log(response.data)
         setLecturesData(response.data) 
          
      }).catch((error) => {
          console.log(error)
      }).finally(()=>{
        setLoader(false)
      })
  
    }

  

 




 



  return <LectureContext.Provider value={{
    createLecture,
    getLectureData,
    lecturesData

  }}>
    {children}
  </LectureContext.Provider>


}