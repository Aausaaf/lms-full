/* eslint-disable */

import React from 'react'
import Editors from '../Editor'
import "./AddProject.css"
const AddProject = () => {
  return (<div className="assignment_main_container_wrapper">
    <div className="assignment_main_container">
        <div className="assignment_header">
            <h2>Add Project</h2>
        </div>
      <div className="add_assignment_content_wrapper">
      <div className="assignment_form">
            <div className="assignment_input_form">
                <p>Project Title</p>
                <input placeholder='Example' type="text" />
            </div>
            <div className="assignment_input_form">
                <p>Project Points</p>
                <input placeholder='10' type="text" />
            </div>
            <div className="assignment_input_form">
                <p>Project Start Date</p>
                <input type="date" />
            </div>
            <div className="assignment_input_form">
                <p>Project End Date</p>
                <input type="date" />
            </div>
        </div>
        <h3>Project Content</h3>

       <div className="assignment_content_container">
       <Editors/>
       </div>
      </div>
    </div>
  </div>
  )
}

export default AddProject
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