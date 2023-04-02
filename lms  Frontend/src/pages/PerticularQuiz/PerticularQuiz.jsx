import React, { useState } from 'react';
import "./PerticularQuiz.css"
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
  Typography,
  Container,
  Grid,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useQuizContext } from 'src/ApiIntegration/quiz';
import { useEffect } from 'react';

const QuestionDiv = ({data,index}) => {


  
    return <div className="quetion_div_main_container">
          <div className="question_heading">
            <h4>{index+1}.</h4>
            <h3>{data.title}</h3>
          </div>
          <div className="question_answer_option">
            <div className="quiz_question_option">
                <input  name="option" type="radio" /><p> {data.options[0]}</p>
            </div>
            <div className="quiz_question_option">
                <input name="option" type="radio" /> <p> {data.options[1]}</p>
            </div>
            <div className="quiz_question_option">
                <input name="option" type="radio" /> <p> {data.options[2]}</p>
            </div> <div className="quiz_question_option">
                <input name="option" type="radio" /> <p> {data.options[3]}</p>
            </div>

          </div>
    </div>
}

const questions = [
  {
    id: 1,
    text: 'What is the capital of France?',
    options: [
      { id: 'a', text: 'Paris' },
      { id: 'b', text: 'London' },
      { id: 'c', text: 'New York' },
      { id: 'd', text: 'Tokyo' },
    ],
    answer: 'a',
  },
  {
    id: 2,
    text: 'What is the largest continent by land area?',
    options: [
      { id: 'a', text: 'Africa' },
      { id: 'b', text: 'Asia' },
      { id: 'c', text: 'Europe' },
      { id: 'd', text: 'South America' },
    ],
    answer: 'b',
  },
];

const  Quizes = () => {
 

    const {id} = useParams();
    const {quizsData,getQuizData} = useQuizContext()
   useEffect(()=>{
    getQuizData()
   },[])
  return ( <div className="perticular_quiz_page_main_container">
    <h1>{quizsData[id]?.title}</h1>
    <div className="due_date_div">
        <div className="due_block">
            <h4>Due : </h4>
            <p>{quizsData[id]?.endDate}</p>
        </div>
        <div className="due_block">
            <h4>Points : </h4>
            <p>{quizsData[id]?.points}</p>
        </div>
        <div className="due_block">
            <h4>Submitting : </h4>
            <p>An  Option</p>
        </div>
      </div>
     <div className="quiz_question_list">
     {
        quizsData[id]?.content?.map((data,index)=>{
            return <QuestionDiv data={data} index={index}/>
        })
      }
     </div>
     <div style={{
        position:"absolute",
        bottom:"1.5rem",
        right:"2rem",
     }} className="submit_cancle_div">
          
            <button onClick={()=>{
               
               
            }} value={"cancle"}>
<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M2.94846 17.0716C-0.98282 13.1663 -0.98282 6.8346 2.94846 2.92942C6.87974 -0.975823 13.2537 -0.975823 17.1849 2.92942C21.1162 6.83467 21.1162 13.1664 17.1849 17.0716C13.2536 20.9768 6.87967 20.9768 2.94846 17.0716ZM5.79581 5.75798C5.43833 6.1131 5.43833 6.68863 5.79581 7.04376L8.12532 9.35784C8.48281 9.71296 8.48281 10.2885 8.12532 10.6434L5.79581 12.9577C5.43833 13.3126 5.43833 13.8883 5.79581 14.2432C6.1533 14.5983 6.73266 14.5983 7.09016 14.2432L9.41967 11.9291C9.77715 11.574 10.3565 11.574 10.7138 11.9291L13.0435 14.2432C13.4007 14.5983 13.9804 14.5983 14.3376 14.2432C14.6951 13.8884 14.6951 13.3126 14.3376 12.9577L12.0081 10.6434C11.6506 10.2885 11.6506 9.71297 12.0081 9.35784L14.3376 7.04376C14.6951 6.68864 14.6951 6.11311 14.3376 5.75798C13.9804 5.40287 13.4008 5.40287 13.0435 5.75798L10.7138 8.07207C10.3565 8.42718 9.77716 8.42718 9.41967 8.07207L7.09016 5.75798C6.73268 5.40287 6.15331 5.40287 5.79581 5.75798Z" fill="#C20000"/>
</svg> &nbsp; 
cancle</button>
            <button value={"submit"}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M10 0.000488281C4.48429 0.000488281 0 4.48477 0 10.0005C0 15.513 4.48429 20.0005 10 20.0005C15.5125 20.0005 20 15.513 20 10.0005C20 4.48477 15.5125 0.000488281 10 0.000488281ZM15.0282 7.78192L9.25643 13.5537C9.07827 13.7349 8.84082 13.8319 8.58761 13.8319C8.33454 13.8319 8.09696 13.7351 7.91575 13.5537L4.96889 10.6068C4.60018 10.2381 4.60018 9.6381 4.96889 9.26938C5.14705 9.09123 5.3845 8.99441 5.63771 8.99441C5.89399 8.99441 6.12836 9.09123 6.30957 9.26938L8.59082 11.5506L13.694 6.44742C13.8753 6.2662 14.1129 6.16923 14.3659 6.16923C14.619 6.16923 14.8565 6.26605 15.0347 6.44742C15.2129 6.62557 15.3129 6.86302 15.3129 7.11624C15.3065 7.36289 15.2065 7.60356 15.0284 7.7817L15.0282 7.78192Z" fill="#006D05"/>
</svg> &nbsp; Submit</button>
        </div>
  </div>
   
  );
}

export default Quizes;
