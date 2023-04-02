import React, { useState } from 'react'

const AddContent = ({index,data,setData,setClose}) => {
  const [selectedAssignment, setSelectedAssignment] = useState("");
  const [selectedLecture, setSelectedLecture] = useState("");
  const [fileTitle, setFileTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleSave = () => {
    const datas = {
      assignment: selectedAssignment,
      lecture: selectedLecture,
      fileTitle: fileTitle,
      file: file
    };
    let topics = data.topics
    topics[index] = {...topics[index],data: datas}
    setData({...data,topics:topics})
     // replace with your desired logic
     setClose(false)
  };
  console.log(data);
  
  return (
    <div className="add_content_modules_main_container">
      <div className="add_content_modules_body_container">
        <div className="add_content_modules_header">
          <h2>Add Modules Content</h2>
        </div>
        <div className="add_content_module_list">
          <div className="select_assignment">
            <p>Select Assignment : </p>
            <select
              name="assignment"
              id="assignment"
              value={selectedAssignment}
              onChange={(e) => setSelectedAssignment(e.target.value)}
            >
              <option value="">Select Assignment</option>
              <option value="Assign1">Assignment 1</option>
              <option value="Assign2">Assignment 2</option>
              <option value="Assign3">Assignment 3</option>
              <option value="">Add New Assignment</option>
            </select>
          </div>

          <div className="select_assignment">
            <p>Select Lecture : </p>
            <select
              name="lecture"
              id="lecture"
              value={selectedLecture}
              onChange={(e) => setSelectedLecture(e.target.value)}
            >
              <option value="">Select Lecture</option>
              <option value="Lecture1">Lecture 1</option>
              <option value="Lecture2">Lecture 2</option>
              <option value="Lecture3">Lecture 3</option>
              <option value="">Add New Lecture</option>
            </select>
          </div>

          <div className="add_pdf">
            <p>Add File</p>
            <div className="add_input_file">
              <input
                type="text"
                placeholder="Enter file title"
                value={fileTitle}
                onChange={(e) => setFileTitle(e.target.value)}
              />
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>

          <div
            style={{
              width: "97%",
              marginRight: "auto",
              marginBottom: "-0.3rem",
              marginTop: "4rem"
            }}
            className="save_cancle_published_button"
          >
            <button
              onClick={() => {
                setClose(false);
              }}
              style={{
                background: "#FFE5E5",
                color: "#C20000"
              }}
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                
         d="M2.94846 17.0716C-0.98282 13.1663 -0.98282 6.8346 2.94846 2.92942C6.87974 -0.975823 13.2537 -0.975823 17.1849 2.92942C21.1162 6.83467 21.1162 13.1664 17.1849 17.0716C13.2536 20.9768 6.87967 20.9768 2.94846 17.0716ZM5.79581 5.75798C5.43833 6.1131 5.43833 6.68863 5.79581 7.04376L8.12532 9.35784C8.48281 9.71296 8.48281 10.2885 8.12532 10.6434L5.79581 12.9577C5.43833 13.3126 5.43833 13.8883 5.79581 14.2432C6.1533 14.5983 6.73266 14.5983 7.09016 14.2432L9.41967 11.9291C9.77715 11.574 10.3565 11.574 10.7138 11.9291L13.0435 14.2432C13.4007 14.5983 13.9804 14.5983 14.3376 14.2432C14.6951 13.8884 14.6951 13.3126 14.3376 12.9577L12.0081 10.6434C11.6506 10.2885 11.6506 9.71297 12.0081 9.35784L14.3376 7.04376C14.6951 6.68864 14.6951 6.11311 14.3376 5.75798C13.9804 5.40287 13.4008 5.40287 13.0435 5.75798L10.7138 8.07207C10.3565 8.42718 9.77716 8.42718 9.41967 8.07207L7.09016 5.75798C6.73268 5.40287 6.15331 5.40287 5.79581 5.75798Z" fill="#C20000"/>
        </svg> &nbsp;
        Cancle</button>
        <button onClick={()=>{
          handleSave()
        }}  style={{
        background:"#D9FFDA",
        color: "#006D05"
        }}>
        <svg width="19" height="19" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0.000488281C4.48429 0.000488281 0 4.48477 0 10.0005C0 15.513 4.48429 20.0005 10 20.0005C15.5125 20.0005 20 15.513 20 10.0005C20 4.48477 15.5125 0.000488281 10 0.000488281ZM15.0282 7.78192L9.25643 13.5537C9.07827 13.7349 8.84082 13.8319 8.58761 13.8319C8.33454 13.8319 8.09696 13.7351 7.91575 13.5537L4.96889 10.6068C4.60018 10.2381 4.60018 9.6381 4.96889 9.26938C5.14705 9.09123 5.3845 8.99441 5.63771 8.99441C5.89399 8.99441 6.12836 9.09123 6.30957 9.26938L8.59082 11.5506L13.694 6.44742C13.8753 6.2662 14.1129 6.16923 14.3659 6.16923C14.619 6.16923 14.8565 6.26605 15.0347 6.44742C15.2129 6.62557 15.3129 6.86302 15.3129 7.11624C15.3065 7.36289 15.2065 7.60356 15.0284 7.7817L15.0282 7.78192Z" fill="#006D05"/>
        </svg> &nbsp;
        Save</button>
       
    </div>

        </div>
    </div>
  </div>
  )
}

export default AddContent