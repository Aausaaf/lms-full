import axios from "axios";
import { createContext, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "src/env";
import  axiosInstance from "./Interseptors"
import { useUserContext } from "./User";

const SyllabusContext =  createContext()
 
export function useSyllabusContext ()
{
    return useContext(SyllabusContext)
}







export function SyllabusProvider({children})
{
  
   const {setLoader} = useUserContext()
   const [syllabusData,setSyllabusData] = useState([])

  
 

    const getSyllabus = () =>{

        setLoader(true)
          axiosInstance.get(`/getsyllabus/${JSON.parse(localStorage.getItem("course"))}`).then((response) =>{
              console.log(response);
              setSyllabusData(response.data)
          }).catch((error)=>{
              console.log(error)
          }).finally(()=>{
              setLoader(false)
          
              
              
          })
      }

      const createGrade = (data,setClose) => {
        const config = {
            headers:{
                "Authorization" : 'Bearer ' + JSON.parse(localStorage.getItem('UserToken')),
            }
         }
    
        axios.post(`${BASE_URL}/postsyllabus/${JSON.parse(localStorage.getItem("course"))}`,data,config).then((response) =>{
            console.log(response)
            getSyllabus()
        }).catch((error)=>{
            
           console.log(error)
        }).finally(()=>{
            setLoader(true)
            setClose(false)
        })
      }
     

    //   const EditGrade = (index,data) => {
    //     const config = {
    //         headers:{
    //             "Authorization" : 'Bearer ' + JSON.parse(localStorage.getItem('UserToken')),
    //         }
    //      }
    
    //     axios.patch(`${BASE_URL}/editgrade/${JSON.parse(localStorage.getItem("course"))}/${index}`,data,config).then((response) =>{
    //         console.log(response)
    //         getPerticularGrade(data.user)
    //     }).catch((error)=>{
    //        console.log(error)
    //     })
    //   }

  
  
    //   const deleteGrade = (index,user) => {
    //     const config = {
    //         headers:{
    //             "Authorization" : 'Bearer ' + JSON.parse(localStorage.getItem('UserToken')),
    //         }
    //      }
    
    //     axios.delete(`${BASE_URL}/deletegrade/${JSON.parse(localStorage.getItem("course"))}/${user}/${index}`,config).then((response) =>{
    //         console.log(response)
    //         getPerticularGrade(user)
    //     }).catch((error)=>{
    //        console.log(error)
    //     })
    //   }

 




 



  return <SyllabusContext.Provider value={{
    getSyllabus,
    syllabusData,
    createGrade

  }}>
    {children}
  </SyllabusContext.Provider>


}


