import axios from "axios";
import { createContext, useState } from "react";
import { useContext } from "react";
import { useUserContext } from "./User";
import  axiosInstance from "./Interseptors"

const CourseContext =  createContext()
 
export function useCourseContext ()
{
    return useContext(CourseContext)
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






export function CourseProvider({children})
{
  
   const {setLoader} = useUserContext()
   const [coursesData,setCourseData] = useState([])

    const createCourse = (data,setSuccessStatus,setErrorStatus) =>{

     const config = {
        headers:{
            "Authorization" : 'Bearer ' + JSON.parse(localStorage.getItem('UserToken')),
             "Content-Type" : 'multipart/form-data'
        }
     }

         setLoader(true)
        axios.post(`http://172.29.234.5:5000/addCourse`,objectToFormData(data),config,).then((response) =>{
            console.log(response);
            setSuccessStatus(true)
        }).catch((error)=>{
            console.log(error)
            setErrorStatus(error.response.data.message)
        }).finally(()=>{
            setLoader(false)
            
        })
    }
 

    const getCourseData = () => {
      setLoader(true)
  
      axiosInstance.get("/course/2").
      then((response) => {
          // console.log(response.data)
         console.log(response.data.data)
           setCourseData(response.data.data) 
          
      }).catch((error) => {
          console.log(error)
      }).finally(()=>{
        setLoader(false)
      })
  
    }

  

 




 



  return <CourseContext.Provider value={{
    createCourse,
    getCourseData,
    coursesData,

  }}>
    {children}
  </CourseContext.Provider>


}