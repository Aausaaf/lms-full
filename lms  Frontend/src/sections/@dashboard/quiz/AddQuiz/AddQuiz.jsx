import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useQuizContext } from 'src/ApiIntegration/quiz';
import { useUserContext } from 'src/ApiIntegration/User';
import Loder from 'src/pages/Loader/Loder';
import { Error_pop_up, Success_pop_up } from 'src/pages/LoginPage';
import "./AddQuiz.css"

const AddQuiz = () => {


    const [questions, setQuestions] = useState([{title: '', options: ['', '', '', ''], answer: ''}]);

    const handleChange = (event, index, optionIndex) => {
      const { name, value } = event.target;
  
      if (name === 'title') {
        setQuestions(prevQuestions => {
          const newQuestions = [...prevQuestions];
          newQuestions[index].title = value;
          return newQuestions;
        });
      } else if (name === 'option') {
        setQuestions(prevQuestions => {
          const newQuestions = [...prevQuestions];
          newQuestions[index].options[optionIndex] = value;
          return newQuestions;
        });
      } else if (name === 'answer') {
        setQuestions(prevQuestions => {
          const newQuestions = [...prevQuestions];
          newQuestions[index].answer = value;
          return newQuestions;
        });
      }
    }
    const navigate = useNavigate();
   
    const handleAddQuestion = () => {



        setQuestions(prevQuestions => {
          const newQuestions = [...prevQuestions, {title: '', options: ['', '', '', ''], answer: ''}];
          return newQuestions;
        });
      }
     
   

      const [quizData,setQuizData] = useState({
        title:"",
        content:questions,
        startDate:"",
        endDate:"",
        course:JSON.parse(localStorage.getItem("course"))

      })

      const {showLoader} = useUserContext()
      const [successStatus,setSuccessStatus] = useState(false)
      const [errorStatus,setErrorStatus] = useState("")
    
    
    
    
    
      const SuccessPopUp = () => {
        return <Success_pop_up >
            <p style={{
              color:"#008C0E"
            }}>You have successfully created Quiz</p>
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
    
    const {createQuiz} = useQuizContext()

    return (<div className="assignment_main_container_wrapper">
    <div className="assignment_main_container">
        <div className="assignment_header">
            <h2>Add Quiz</h2>
        </div>
      <form onSubmit={(event)=>{
    event.preventDefault()
    console.log(quizData)
    createQuiz({
      title:quizData.title,
      points:quizData.points,
      startDate:quizData.startDate,
      endDate:quizData.endDate,
      content : quizData.content,
      course:JSON.parse(localStorage.getItem("course"))

    },setSuccessStatus,setErrorStatus)
      }} className="add_assignment_content_wrapper">
      <div className="assignment_form">
            <div className="assignment_input_form">
                <p>Quiz Title</p>
                <input value={quizData?.title} onChange={(event)=>{
                  setQuizData({...quizData,title:event.target.value})
                }} placeholder='Example' type="text" />
            </div>
            <div className="assignment_input_form">
                <p>Quiz Points</p>
                <input value={quizData?.points} onChange={(event)=>{
                  setQuizData({...quizData,points:event.target.value})
                }} placeholder='10' type="text" />
            </div>
            <div className="assignment_input_form">
                <p>Quiz Start Date</p>
                <input value={quizData?.startDate} onChange={(event)=>{
                  setQuizData({...quizData,startDate:event.target.value})
                }}   type="date" />
            </div>
            <div className="assignment_input_form">
                <p>Quiz End Date</p>
                <input  value={quizData?.endDate} onChange={(event)=>{
                  setQuizData({...quizData,endDate:event.target.value})
                }}  type="date" />
            </div>
        </div>
        <h3>Quiz Content</h3>

       <div className="assignment_content_container">
       {questions.map((question, index) => (
        <div key={index} className="quiz_question_container">
         <div className="quiz_form_input">
         <p style={{
    paddingLeft: "1rem"
          }}  htmlFor={`title-${index}`}>Question Title :</p>
          <input style={{
    marginLeft: "1rem"
          }}  type="text" name="title" id={`title-${index}`} value={question.title} onChange={event => handleChange(event, index)} />
         </div>

           <div className="quiz_option_grid">
           <div className="quiz_form_input">
          <p htmlFor={`option-${index}-1`}>Option 1:</p>
          <input type="text" name="option" id={`option-${index}-1`} value={question.options[0]} onChange={event => handleChange(event, index, 0)} />
          </div>
        
          <div className="quiz_form_input">
          <p htmlFor={`option-${index}-2`}>Option 2:</p>
          <input type="text" name="option" id={`option-${index}-2`} value={question.options[1]} onChange={event => handleChange(event, index, 1)} />
            </div>
        
            <div className="quiz_form_input">
          <p htmlFor={`option-${index}-3`}>Option 3:</p>
          <input type="text" name="option" id={`option-${index}-3`} value={question.options[2]} onChange={event => handleChange(event, index, 2)} />
            </div>
    
            <div className="quiz_form_input">
          <p htmlFor={`option-${index}-4`}>Option 4:</p>
          <input type="text" name="option" id={`option-${index}-4`} value={question.options[3]} onChange={event => handleChange(event, index, 3)} />
           </div>
           </div>
           
          <div className="quiz_form_input">
          <p style={{
    paddingLeft: "1rem"
          }} htmlFor={`answer-${index}`}>Answer:</p>
          <input style={{
    marginLeft: "1rem"
          }} type="text" name="answer" id={`answer-${index}`} value={question.answer} onChange={event => handleChange(event, index)} />
            </div>
        </div>
      ))}
           <div className="add_quiz_question">   <button type="button" onClick={handleAddQuestion}>Add Question</button></div>
   

      <br /><br />
      <div className="save_cancle_published_button">
        <button  value="cancle"onClick={()=>{
          navigate("/dashboard/quiz")
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
        color: "#006D05"
        }}>
        <svg width="19" height="19" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0.000488281C4.48429 0.000488281 0 4.48477 0 10.0005C0 15.513 4.48429 20.0005 10 20.0005C15.5125 20.0005 20 15.513 20 10.0005C20 4.48477 15.5125 0.000488281 10 0.000488281ZM15.0282 7.78192L9.25643 13.5537C9.07827 13.7349 8.84082 13.8319 8.58761 13.8319C8.33454 13.8319 8.09696 13.7351 7.91575 13.5537L4.96889 10.6068C4.60018 10.2381 4.60018 9.6381 4.96889 9.26938C5.14705 9.09123 5.3845 8.99441 5.63771 8.99441C5.89399 8.99441 6.12836 9.09123 6.30957 9.26938L8.59082 11.5506L13.694 6.44742C13.8753 6.2662 14.1129 6.16923 14.3659 6.16923C14.619 6.16923 14.8565 6.26605 15.0347 6.44742C15.2129 6.62557 15.3129 6.86302 15.3129 7.11624C15.3065 7.36289 15.2065 7.60356 15.0284 7.7817L15.0282 7.78192Z" fill="#006D05"/>
        </svg> &nbsp;
        Save</button>
        <button   style={{
            background:"#9460ff",
            color:"white"
        }} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="white" d="M11 21.95q-1.9-.2-3.538-1.037t-2.85-2.175Q3.4 17.4 2.7 15.675T2 12q0-2.275.913-4.2T5.4 4.5H3v-2h6v6H7V5.775q-1.375 1.1-2.188 2.713T4 12q0 3.075 2.013 5.313T11 19.925v2.025Zm-.425-5.35L6.35 12.35l1.4-1.4l2.825 2.825L16.25 8.1l1.4 1.425l-7.075 7.075ZM15 21.5v-6h2v2.725q1.375-1.125 2.188-2.725T20 12q0-3.075-2.013-5.313T13 4.075V2.05q3.8.375 6.4 3.2T22 12q0 2.275-.913 4.2T18.6 19.5H21v2h-6Z"/></svg> &nbsp; Published</button>
    </div>
      {/* <button type="button" onClick={handleSubmit}>Submit</button> */}
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

export default AddQuiz