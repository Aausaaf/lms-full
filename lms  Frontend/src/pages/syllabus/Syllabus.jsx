import React, { useState } from 'react'
import "./Syllabus.css"
import {
 
  Button,
 
} from '@mui/material';
import { Role } from '../../env';

import Iconify from '../../components/iconify';
import AddSyllabus from './AddSyllabus/AddSyllabus';
import { useSyllabusContext } from 'src/ApiIntegration/syllabus';
import { useEffect } from 'react';
const Data = [
    {
      name:"Introduction",
      details:[{title:"What You will learn in this course",
    duration:"9m 34s"},
    {title:"An Overview of Web Development and React",
    duration:"4m 54s"},
    {title:" Course Repo and Software Installations",
    duration:"1h 9m 34s"},
    
  
  
    ]
        
    },
    {
      name:"Understanding React Native Fundamentals",
  
      details:[{title:"React Native For Absolute Beginners with React Hooks",
    duration:"2h 25m 27s"},
    {title:"Understanding React Native View, Text , StyleSheet",
    duration:"9m 38s"},
    {title:"Understanding React Native TextInput and Dimensions",
    duration:"1h 9m 34s"},
    {title:"Extra React Native Tagss",
    duration:"1h 9m 34s"},
    
    
  
  
    ]
        
    },
    {
      name:"Adding Stack amd Bottom Tab Navigation to our react native app",
  
      details:[{title:"",
  
    duration:"2h 25m 27s"},
    {title:"Intro to React Native Navigation",
    duration:"9m 38s"},
    {title:"Adding an npm package and configuring it",
    duration:"1h 9m 34s"},
    {title:"Navigating from one Stack screen to another",
    duration:"1h 9m 34s"},
    
    
  
  
    ]
        
    },
    {
      name:"Overview of React Hooks",
  
      details:[{title:"UseState Hook",
  
  
    duration:"2h 25m 27s"},
    {title:"UseState Hook",
  
    duration:"9m 38s"},
   
    
    
  
  
    ]
        
    },  {
      name:"Project",
  
      details:[{title:"Setting up login form",
  
  
    duration:"2h 25m 27s"},
    {title:"Finishing the project with signup form",
  
    duration:"9m 38s"},
   
    
    
  
  
    ]
        
    },
    {
      name:"Conclusion",
  
      details:[{title:"My next course",
  
  
    duration:"2h 25m 27s"},
    {title:"Conclusiony",
  
    duration:"9m 38s"},
   
    
    
  
  
    ]
        
    },
  ]
  



const Syllabus = () => {

    const [showCirculum, setShowCirculum] = useState(true)
    const [showText, setShowText] = useState(false)
     const [showVideo, setShowVideo] = useState(false)
   
     const [showAddSyllabus, setShowAddSyllabus] = useState(false)
    const {getSyllabus,syllabusData} = useSyllabusContext()
    const [showInfo, setShowInfo] = useState({
        0:true
      });
      
      const handleClick = (index)  => {
        // setShowInfo({})
        setShowInfo(state => ({
          ...state, // <-- copy previous state
          [index]: !state[index] // <-- update value by index key
        }));
      }; 
        useEffect(()=>{
          getSyllabus()
        },[])
const CourseDescription = () => {
    return <div className="course_description_container">
         <h5 style={{
            height: !showText? '15rem' : "auto",
            
         }}>
          {
           "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo, nostrum officia quaerat magnam vitae ab sequi adipisci assumenda nesciunt mollitia cum, repellat modi vero aperiam alias fugit incidunt eveniet quam?"
          }.
          
         </h5>
         <h5 onClick={()=>{
          setShowText(!showText)
         }}>{showText?"Show Less" : "Show More"}</h5>
    </div>
  }
  

  const CoursetitleDetails = ({title,duration}) => {
    return <>
     { title.map((data)=>{
         return <div className="course_title_details_container">
       <i className="fa fa-tasks" aria-hidden="true"></i>
         <h4 >{data.name}</h4>
         {/* <p style={{
          marginLeft:"auto"
         }}>{data.duration}</p> */}
     </div>
      })
    }
    </>
  }
  
  return (<div className="syllabus_main_container">
     <div className="course_info_details_comp_main_contianer_details">
          <div className="course_info_details_comp_main_contianer_details_header">
            <h5 onClick={()=>{
                 setShowCirculum(true)
            }}>Syllabus</h5>
           {
            Role === "Teacher" || Role == "admin" ?   <Button style={{
              marginLeft:"auto",
              marginRight:"2rem"
            }} onClick={()=>{
             setShowAddSyllabus(true)
         }} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
           Add Syllabus
         </Button>  : ""
           }
          </div>
          <div className="course_info_details_comp_main_contianer_details_list">
           {
          
          syllabusData?.syllabus?.map((data,i)=>{
                return   <>
                <div  onClick={()=>{
                      handleClick(i)
                }} className="course_info_details_comp_main_contianer_details_list_item">
                <h3>{data.title}</h3>
                <i  className='fa fa-chevron-down'></i>
              </div>
               {
                showInfo[i]?<CoursetitleDetails   title={data.topics}/>:""
               }
              </>
              })
             
           }
          </div>
  </div>
  {
    showAddSyllabus && <AddSyllabus setClose={setShowAddSyllabus}/> 
  }
  </div>
  )
}

export default Syllabus