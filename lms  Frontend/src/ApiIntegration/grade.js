import axios from "axios";
import { createContext, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "src/env";
import  axiosInstance from "./Interseptors"
import { useUserContext } from "./User";

const GradeContext =  createContext()
 
export function useGradeContext ()
{
    return useContext(GradeContext)
}







export function GradeProvider({children})
{
  
   const {setLoader} = useUserContext()
   const [allStudent,setAllStudent] = useState([])
   const [studentGrade,setStudentGrade] = useState({})
    const getAllGrade = () =>{

      setLoader(true)
        axiosInstance.get(`/getallstudent/${JSON.parse(localStorage.getItem("course"))}`).then((response) =>{
            console.log(response);
            setAllStudent(response.data[0].user)
        }).catch((error)=>{
            console.log(error)
        }).finally(()=>{
            setLoader(false)
        
            
            
        })
    }
 

    const getPerticularGrade = (name) =>{

        setLoader(true)
          axiosInstance.get(`/getgrade/${JSON.parse(localStorage.getItem("course"))}/${name}`).then((response) =>{
              console.log(response);
              setStudentGrade(response.data[0])
          }).catch((error)=>{
              console.log(error)
          }).finally(()=>{
              setLoader(false)
          
              
              
          })
      }

      const createGrade = (data) => {
        const config = {
            headers:{
                "Authorization" : 'Bearer ' + JSON.parse(localStorage.getItem('UserToken')),
            }
         }
    
        axios.post(`${BASE_URL}/addgrade/${JSON.parse(localStorage.getItem("course"))}`,data,config).then((response) =>{
            console.log(response)
            getPerticularGrade(data.user)
        }).catch((error)=>{
           console.log(error)
        })
      }
     

      const EditGrade = (index,data) => {
        const config = {
            headers:{
                "Authorization" : 'Bearer ' + JSON.parse(localStorage.getItem('UserToken')),
            }
         }
    
        axios.patch(`${BASE_URL}/editgrade/${JSON.parse(localStorage.getItem("course"))}/${index}`,data,config).then((response) =>{
            console.log(response)
            getPerticularGrade(data.user)
        }).catch((error)=>{
           console.log(error)
        })
      }

  
  
      const deleteGrade = (index,user) => {
        const config = {
            headers:{
                "Authorization" : 'Bearer ' + JSON.parse(localStorage.getItem('UserToken')),
            }
         }
    
        axios.delete(`${BASE_URL}/deletegrade/${JSON.parse(localStorage.getItem("course"))}/${user}/${index}`,config).then((response) =>{
            console.log(response)
            getPerticularGrade(user)
        }).catch((error)=>{
           console.log(error)
        })
      }

 




 



  return <GradeContext.Provider value={{
    getAllGrade,
    allStudent,
    getPerticularGrade,
    studentGrade,
    createGrade,
    EditGrade,
    deleteGrade

  }}>
    {children}
  </GradeContext.Provider>


}


