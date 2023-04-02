import React, { useState } from 'react'
import { useCourseContext } from 'src/ApiIntegration/courses'
import { useUserContext } from 'src/ApiIntegration/User'
import Loder from '../Loader/Loder'
import { Error_pop_up, Success_pop_up } from '../LoginPage'
import "./AddCourses.css"




const AddCourses = ({setShowAddCourse}) => {

    const [courseData,setCourseData] = useState({
        name:"",
        price:"",
        duration:"",
        image : "",
        category:"",
        level:"",
        shortDescription:"",
        description:""
    })
    const {showLoader} = useUserContext()
    const [successStatus,setSuccessStatus] = useState(false)
    const [errorStatus,setErrorStatus] = useState("")
    const SuccessPopUp = () => {
        return <Success_pop_up >
            <p style={{
              color:"#008C0E"
            }}>You have successfully created course</p>
        </Success_pop_up>
      }
      
      const ErrorPopUp = () => {
        return <Error_pop_up >
            <p style={{
              color:"red"
            }}>{errorStatus}</p>
        </Error_pop_up>
      }


      if(successStatus)
{
  setTimeout(()=>{
     setSuccessStatus(false)
  },1500)
}



if(errorStatus.length > 0)
{
  setTimeout(()=>{
      setErrorStatus("")
  },1500)
}

   
   const {createCourse} = useCourseContext()
   

  return (<div className="add_courses_main_container">
          <div className="add_courses_main_body">
            <div className="add_courses_header">
                <h2>Add Course</h2>
            </div>
            <form onSubmit={(event)=>{
                event.preventDefault()
                console.log(courseData)
                createCourse(courseData,setSuccessStatus,setErrorStatus)
            }} className="add_course_content_warpper">
            <div className="add_courses_form">
                <div className="add_courses_input">
                    <p>Course Title</p>
                    <input value={courseData.name} onChange={(event)=>{
                        setCourseData({...courseData,name:event.target.value})
                    }} type="text" name="" id="" required/>
                </div>
                <div className="add_courses_input">
                    <p>Course Price</p>
                    <input value={courseData.price} onChange={(event)=>{
                        setCourseData({...courseData,price:event.target.value})
                    }} type="text" name="" id="" required />
                </div>
                <div className="add_courses_input">
                    <p>Course Duration</p>
                    <input value={courseData.duration} onChange={(event)=>{
                        setCourseData({...courseData,duration:event.target.value})
                    }} type="text" name="" id="" required />
                </div>

                <div className="add_courses_input">
                    <p>Course Image</p>
                    <input  onChange={(event)=>{
                        setCourseData({...courseData,image:event.target.files[0]})
                    }} type="file" name="" id="" required />
                </div>
                <div className="add_courses_input">
                    <p>Course Category</p>
                    <select  name="" id="" value={courseData.category} onChange={(event)=>{
                        setCourseData({...courseData,category:event.target.value})
                    }} required>
                        <option value="">Select Category </option>
                        <option value="1">Cyber Vidya</option>
                        <option value="2">Cyber Siksha</option>
                    </select>
                </div>
                <div className="add_courses_input">
                    <p>Course Level</p>
                    <select  name="" id="" value={courseData.level} onChange={(event)=>{
                        setCourseData({...courseData,level:event.target.value})
                    }} required>
                        <option value="">Select Level </option>
                        <option value="1">Begineer</option>
                        <option value="2">Intermediate</option>
                        <option value="3">Advance</option>
                    </select>
                </div>
               
                <div className="add_courses_input">
                    <p>Course Short Description</p>
                    <textarea  style={{
                      padding:"0",
                      height:"5rem"
                    }}  name="" id="" value={courseData.shortDescription} onChange={(event)=>{
                        setCourseData({...courseData,shortDescription:event.target.value})
                    }} required>
                        
                    </textarea>
                </div>
            </div>
            <div style={{
                width:"97%",
                margin:"auto",
                marginTop:"1.2rem"
            }} className="add_courses_input">
                    <p>Course  Description</p>
                    <textarea style={{
                        minHeight:"10rem"
                    }} name="" id="" value={courseData.description} onChange={(event)=>{
                        setCourseData({...courseData,description:event.target.value})
                    }}>
                        
                    </textarea>
                </div>
                <div style={{
                    paddingRight:"1rem"
                }} className="save_cancle_published_button">
        <button  value={"cancle"} onClick={()=>{
            setShowAddCourse(false)
        }} style={{
           background:"#FFE5E5",
           color:"#C20000" 
        }}>
        <svg width="19" height="19" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M2.94846 17.0716C-0.98282 13.1663 -0.98282 6.8346 2.94846 2.92942C6.87974 -0.975823 13.2537 -0.975823 17.1849 2.92942C21.1162 6.83467 21.1162 13.1664 17.1849 17.0716C13.2536 20.9768 6.87967 20.9768 2.94846 17.0716ZM5.79581 5.75798C5.43833 6.1131 5.43833 6.68863 5.79581 7.04376L8.12532 9.35784C8.48281 9.71296 8.48281 10.2885 8.12532 10.6434L5.79581 12.9577C5.43833 13.3126 5.43833 13.8883 5.79581 14.2432C6.1533 14.5983 6.73266 14.5983 7.09016 14.2432L9.41967 11.9291C9.77715 11.574 10.3565 11.574 10.7138 11.9291L13.0435 14.2432C13.4007 14.5983 13.9804 14.5983 14.3376 14.2432C14.6951 13.8884 14.6951 13.3126 14.3376 12.9577L12.0081 10.6434C11.6506 10.2885 11.6506 9.71297 12.0081 9.35784L14.3376 7.04376C14.6951 6.68864 14.6951 6.11311 14.3376 5.75798C13.9804 5.40287 13.4008 5.40287 13.0435 5.75798L10.7138 8.07207C10.3565 8.42718 9.77716 8.42718 9.41967 8.07207L7.09016 5.75798C6.73268 5.40287 6.15331 5.40287 5.79581 5.75798Z" fill="#C20000"/>
        </svg> &nbsp;
        Cancle</button>
        <button  style={{
        background:"#D9FFDA",
        color: "#006D05",
        
        }}>
        <svg width="19" height="19" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0.000488281C4.48429 0.000488281 0 4.48477 0 10.0005C0 15.513 4.48429 20.0005 10 20.0005C15.5125 20.0005 20 15.513 20 10.0005C20 4.48477 15.5125 0.000488281 10 0.000488281ZM15.0282 7.78192L9.25643 13.5537C9.07827 13.7349 8.84082 13.8319 8.58761 13.8319C8.33454 13.8319 8.09696 13.7351 7.91575 13.5537L4.96889 10.6068C4.60018 10.2381 4.60018 9.6381 4.96889 9.26938C5.14705 9.09123 5.3845 8.99441 5.63771 8.99441C5.89399 8.99441 6.12836 9.09123 6.30957 9.26938L8.59082 11.5506L13.694 6.44742C13.8753 6.2662 14.1129 6.16923 14.3659 6.16923C14.619 6.16923 14.8565 6.26605 15.0347 6.44742C15.2129 6.62557 15.3129 6.86302 15.3129 7.11624C15.3065 7.36289 15.2065 7.60356 15.0284 7.7817L15.0282 7.78192Z" fill="#006D05"/>
        </svg> &nbsp;
        Save</button>
        <button value={"cancle"} style={{
            background:"#9460ff",
            color:"white"
        }} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="white" d="M11 21.95q-1.9-.2-3.538-1.037t-2.85-2.175Q3.4 17.4 2.7 15.675T2 12q0-2.275.913-4.2T5.4 4.5H3v-2h6v6H7V5.775q-1.375 1.1-2.188 2.713T4 12q0 3.075 2.013 5.313T11 19.925v2.025Zm-.425-5.35L6.35 12.35l1.4-1.4l2.825 2.825L16.25 8.1l1.4 1.425l-7.075 7.075ZM15 21.5v-6h2v2.725q1.375-1.125 2.188-2.725T20 12q0-3.075-2.013-5.313T13 4.075V2.05q3.8.375 6.4 3.2T22 12q0 2.275-.913 4.2T18.6 19.5H21v2h-6Z"/></svg> &nbsp; Published</button>
    </div>
    </form>   

     {
          showLoader && <Loder/>
        }
         {
       successStatus&&<SuccessPopUp/>
          }
        {
    errorStatus.length > 0 &&<ErrorPopUp/>
          }     

          </div>
  </div>
  )
}

export default AddCourses