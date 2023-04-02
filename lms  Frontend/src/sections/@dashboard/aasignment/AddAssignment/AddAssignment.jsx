/* eslint-disable */

import React, { useState } from 'react'
import { useAssignmentContext } from 'src/ApiIntegration/assignment'
import { useUserContext } from 'src/ApiIntegration/User'
import Loder from 'src/pages/Loader/Loder'
import { Error_pop_up, Success_pop_up } from 'src/pages/LoginPage'
import Editors from '../Editor'
import "./AddAssignment.css"
const AddAssignment = () => {

  
  const [newAssignmentData,setNewAssignmentData] = useState({
    title:"",
    video:"",
    content:"",
    startDate:"",
    endDate:"",
    course:JSON.parse(localStorage.getItem("course")),
    points:""
   })

  const {showLoader} = useUserContext()
  const [successStatus,setSuccessStatus] = useState(false)
  const [errorStatus,setErrorStatus] = useState("")

   const {createAssignment} = useAssignmentContext()



  const SuccessPopUp = () => {
    return <Success_pop_up >
        <p style={{
          color:"#008C0E"
        }}>You have successfully created Assignment</p>
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
            <h2>Add Assignment</h2>
        </div>
      <form onSubmit={(event)=>{
        event.preventDefault();
        createAssignment(newAssignmentData,setSuccessStatus,setErrorStatus)
      }} className="add_assignment_content_wrapper">
      <div className="assignment_form">
            <div className="assignment_input_form">
                <p>Assignment Title</p>
                <input value={newAssignmentData.title} onChange={(event)=>{
                  setNewAssignmentData({...newAssignmentData,title:event.target.value})
                }} type="text" />
            </div>
            <div className="assignment_input_form">
                <p>Assignment Points</p>
                <input  value={newAssignmentData.points} onChange={(event)=>{
                  setNewAssignmentData({...newAssignmentData,points:event.target.value})
                }}  placeholder='10' type="text" />
            </div>
            <div className="assignment_input_form">
                <p>Assignment Start Date</p>
                <input value={newAssignmentData.startDate} onChange={(event)=>{
                  setNewAssignmentData({...newAssignmentData,startDate:event.target.value})
                }} type="date" />
            </div>
            <div className="assignment_input_form">
                <p>Assignment End Date</p>
                <input value={newAssignmentData.endDate} onChange={(event)=>{
                  setNewAssignmentData({...newAssignmentData,endDate:event.target.value})
                }}  type="date" />
            </div>
        </div>
        <h3>Assignment Content</h3>

       <div className="assignment_content_container">
       <Editors setNewAssignmentData={setNewAssignmentData} newAssignmentData={newAssignmentData}/>
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

export default AddAssignment
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