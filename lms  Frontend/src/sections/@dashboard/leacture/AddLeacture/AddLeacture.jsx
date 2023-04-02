/* eslint-disable */

import React, { useState } from 'react'
import { useLectureContext } from 'src/ApiIntegration/lecture'
import { useUserContext } from 'src/ApiIntegration/User'
import Loder from 'src/pages/Loader/Loder'
import { Error_pop_up, Success_pop_up } from 'src/pages/LoginPage'
import Editors from '../Editor'
import "./AddLeacture.css"
const AddLeacture = () => {

   const [newLectureData,setNewLectureData] = useState({
    title:"",
    video:"",
    content:"",
    course:JSON.parse(localStorage.getItem("course"))
   })
  const {createLecture} = useLectureContext()
  const {showLoader} = useUserContext()
  const [successStatus,setSuccessStatus] = useState(false)
  const [errorStatus,setErrorStatus] = useState("")





  const SuccessPopUp = () => {
    return <Success_pop_up >
        <p style={{
          color:"#008C0E"
        }}>You have successfully created Lecture</p>
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













  return (<div className="assignment_main_container_wrapper">
    <div className="assignment_main_container">
        <div className="assignment_header">
            <h2>Add Lecture</h2>
        </div>
      <form onSubmit={(event)=>{
       event.preventDefault()
       createLecture(newLectureData,setSuccessStatus,setErrorStatus)
      }} className="add_assignment_content_wrapper">
      <div className="assignment_form">
            <div className="assignment_input_form">
                <p>Lecture Title</p>
                <input value={newLectureData?.title}  onChange={(event)=>{
                  setNewLectureData({...newLectureData,title:event.target.value})
                }} placeholder='Example' type="text" />
            </div>
      <div  className="assignment_input_form">
                <p>Lecture Videos</p>
                <input style={{
          
               cursor:"pointer"

               }}  onChange={(event)=>{
                setNewLectureData({...newLectureData,video:event.target.files[0]})
              }}  type="file" />
            </div>
                  {/* 
            <div className="assignment_input_form">
                <p>Assignment Start Date</p>
                <input type="date" />
            </div>
            <div className="assignment_input_form">
                <p>Assignment End Date</p>
                <input type="date" />
            </div> */}
        </div>
        <h3>Lecture Content</h3>

       <div className="assignment_content_container">
       <Editors newLectureData={newLectureData} setNewLectureData={setNewLectureData}/>
       </div>
      </form>
    </div>
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
  )
}

export default AddLeacture
// import Editors from '../Editor'
// import "./AddAssignment.css"
// const AddAssignment = () => {
//   return (<div className="assignment_main_container_wrapper">
//     <div className="assignment_main_container">
//         <div className="assignment_header">
//             <h2>Add Assignment</h2>
//         </div>
//       <div className="add_assignment_content_wrapper">
//       <div className="assignment_form">
//             <div className="assignment_input_form">
//                 <p>Assignment Title</p>
//                 <input placeholder='Example' type="text" />
//             </div>
//             <div className="assignment_input_form">
//                 <p>Assignment Points</p>
//                 <input placeholder='10' type="text" />
//             </div>
//             <div className="assignment_input_form">
//                 <p>Assignment Start Date</p>
//                 <input type="date" />
//             </div>
//             <div className="assignment_input_form">
//                 <p>Assignment End Date</p>
//                 <input type="date" />
//             </div>
//         </div>
//         <h3>Assignment Content</h3>

//        <div className="assignment_content_container">
//        <Editors/>
//        </div>
//       </div>
//     </div>
//   </div>
//   )
// }

// export default AddAssignment