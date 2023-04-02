import axios from "axios";
import { createContext, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "src/env";
import  axiosInstance from "./Interseptors"
import { useUserContext } from "./User";

const QuizContext =  createContext()
 
export function useQuizContext ()
{
    return useContext(QuizContext)
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






export function QuizProvider({children})
{
  
   const {setLoader} = useUserContext()
   const [quizsData,setQuizsData] = useState([])
   const navigate = useNavigate()

    const createQuiz = (data,setSuccessStatus,setErrorStatus) =>{

      setLoader(true)
      const config = {
        headers:{
            "Authorization" : 'Bearer ' + JSON.parse(localStorage.getItem('UserToken')),
        }
     }

        axios.post(`${BASE_URL}/addquiz`, data,config).then((response) =>{
            console.log(response);
             setSuccessStatus(true)
             getQuizData()
        }).catch((error)=>{
            console.log(error)
            setErrorStatus(error.response.data.message)
        }).finally(()=>{
            setLoader(false)
          setTimeout(()=>{
            navigate("/dashboard/quiz")
          },1000)
            
            
        })
    }
 

    const getQuizData = () => {
      setLoader(true)
  
      axiosInstance.get(`/getquiz/${JSON.parse(localStorage.getItem("course"))}`).
      then((response) => {
          // console.log(response.data)
         console.log(response.data)
         setQuizsData(response.data) 
          
      }).catch((error) => {
          console.log(error)
      }).finally(()=>{
        setLoader(false)
      })
  
    }

  

 




 



  return <QuizContext.Provider value={{
    createQuiz,
    getQuizData,
    quizsData

  }}>
    {children}
  </QuizContext.Provider>


}