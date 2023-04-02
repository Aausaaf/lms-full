import { borderRadius } from '@mui/system'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useGradeContext } from 'src/ApiIntegration/grade'
import { Role } from '../../env'
import "./Grade.css"
import { AllGradeData, GradeData } from './gradeData'
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { DialogActions } from '@mui/material'


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  button: {
    margin: theme.spacing(1)
  }
}));


 function ScoresList() {
  const classes = useStyles();
  const {studentGrade} = useGradeContext()
  const [scores, setScores] = useState(studentGrade?.grade);
  const [editIndex, setEditIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedScore, setEditedScore] = useState("");
  const [editedActualScore, setEditedActualScore] = useState("");
  const [addNewOpen, setAddNewOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newScore, setNewScore] = useState("");
  const [newActualScore, setNewActualScore] = useState("");
  const {createGrade,EditGrade,deleteGrade } = useGradeContext()
   const handleEdit = (index) => {
    
    setEditIndex(index);
    setEditedName(scores[index].name);
    setEditedScore(scores[index].points);
    setEditedActualScore(scores[index].actualPoints);
  };

  const handleSave = () => {
    console.log({
      index:editIndex,
     
    })
    EditGrade(editIndex,{
      user:studentGrade?.user,
      name: editedName,
      points: editedScore,
      actualPoints: editedActualScore,
    })
    // setScores((prevScores) => {
    //   const newScores = [...prevScores];
    //   newScores[editIndex] = {
    //     name: editedName,
    //     points: editedScore,
    //     actualPoints: editedActualScore,
    //   };
    //   return newScores;
    // });
    setEditIndex(null);
    setEditedName("");
    setEditedScore("");
    setEditedActualScore("");
  };

  const handleDelete = (index) => {
    deleteGrade(index,studentGrade?.user)
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedName("");
    setEditedScore("");
    setEditedActualScore("");
  };

  const handleAddNew = () => {
    setAddNewOpen(true);
  };

  const handleAddNewSave = () => {
    let postData = {
      user : studentGrade?.user,
      grade : [{
        name: newName,
        points: newScore,
        actualPoints: newActualScore,
      }]
    }

    createGrade(postData)
    console.log(postData)
    // setScores((prevScores) => {
    //   const newScores = [
    //     ...prevScores,
    //     {
    //       name: newName,
    //       points: newScore,
    //       actualPoints: newActualScore,
    //     },
    //   ];
    //   return newScores;
    // });
    setAddNewOpen(false);
    setNewName("");
    setNewScore("");
    setNewActualScore("");
  };

  const handleAddNewCancel = () => {
    setAddNewOpen(false);
    setNewName("");
    setNewScore("");
    setNewActualScore("");
  };
  return (
    <div>
    
      <List className={classes.root}>
        {scores?.map((score, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${score.name}`}
            />
             <ListItemText
              primary={score.points}
            />
              <ListItemText
              primary={score.actualPoints}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEdit(index)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"              aria-label="delete"
                onClick={() => handleDelete(index)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleAddNew}
      >
        Add New Score
      </Button>
      {editIndex !== null && (
        <Dialog style={{
          zIndex:"100000"
        }} open={editIndex !== null} onClose={handleCancel}>
          <DialogTitle>Edit Score</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Score"
              fullWidth
              value={editedScore}
              onChange={(e) => setEditedScore(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Actual Score"
              fullWidth
              value={editedActualScore}
              onChange={(e) => setEditedActualScore(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {addNewOpen && (
        <Dialog  style={{
          zIndex:"100000"
        }} open={addNewOpen} onClose={handleAddNewCancel}>
          <DialogTitle>Add New Score</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Score"
              fullWidth
              value={newScore}
              onChange={(e) => setNewScore(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Actual Score"
              fullWidth
              value={newActualScore}
              onChange={(e) => setNewActualScore(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddNewCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddNewSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
      }
  







const Grade = () => {

  const [showgradePopup, setShowgradePopup] = React.useState(false)
  function getScore () {
    let points = 0
    let total = 0
   for (let i = 0; i < GradeData.length; i+=1) {
    points += +(GradeData[i].points)
   }
   for (let i = 0; i < GradeData.length; i+=1) {
    total += +(GradeData[i].outof)
   }

   return {
    points,
    total
   }
  }
  
  const [perticularStudentGrade, setPerticularStudentGrade] = React.useState("")
  
  const PerticularStudentPopUp  = ({grade,setClose}) => {
  
    const {getPerticularGrade,studentGrade} = useGradeContext()
    const [editGrade,setEditGrade] = useState({})
   console.log(studentGrade)
    return <div className="perticular_student_pop_up_main_container">
       <div style={{
        background:"white",
        width: "100%",
        maxWidth:"1050px",
        borderRadius:"1rem",
        overflow:"hidden",
        padding:"2rem",
        paddingBottom:"2rem",
       }} className="perticular_student_grade_body">
       <div style={
        {
          borderTopRightRadius:"4px",
          borderTopLeftRadius:"4px",
        }
       } className="grade_info_details_comp_main_contianer_details_list_header">
        <h3 style={{
          textTransform:"capitalize",
          width:"20%"
        }}>{studentGrade?.user}</h3>
        <h3>Score</h3>
        <h3>Out of</h3>
        <h3>Action</h3>
      </div>
      {/* {
        studentGrade?.grade?.map((grade, index) => {
          return  <div onClick={()=>{
            setEditGrade(grade[index])
          }}  className="grade_info_details_comp_main_contianer_details_list_item">
          <input type="text" name="" id="" value={grade.name} />
          <input type="text" name="" id="" value={grade.points} />
          <input type="text" name="" id="" value={grade.actualPoints} />
        </div>
        })
        
      } */}
      <ScoresList/>
       <div style={{
        width:"97%",
        marginBottom:"0rem",
        marginTop:"2rem",
        columnGap:"1rem"
       }} className="save_cancle_published_button">
        <button onClick={()=>{
          setClose(false)
        }} style={{
           background:"#FFE5E5",
           color:"#C20000" 
        }}>
        <svg width="19" height="19" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M2.94846 17.0716C-0.98282 13.1663 -0.98282 6.8346 2.94846 2.92942C6.87974 -0.975823 13.2537 -0.975823 17.1849 2.92942C21.1162 6.83467 21.1162 13.1664 17.1849 17.0716C13.2536 20.9768 6.87967 20.9768 2.94846 17.0716ZM5.79581 5.75798C5.43833 6.1131 5.43833 6.68863 5.79581 7.04376L8.12532 9.35784C8.48281 9.71296 8.48281 10.2885 8.12532 10.6434L5.79581 12.9577C5.43833 13.3126 5.43833 13.8883 5.79581 14.2432C6.1533 14.5983 6.73266 14.5983 7.09016 14.2432L9.41967 11.9291C9.77715 11.574 10.3565 11.574 10.7138 11.9291L13.0435 14.2432C13.4007 14.5983 13.9804 14.5983 14.3376 14.2432C14.6951 13.8884 14.6951 13.3126 14.3376 12.9577L12.0081 10.6434C11.6506 10.2885 11.6506 9.71297 12.0081 9.35784L14.3376 7.04376C14.6951 6.68864 14.6951 6.11311 14.3376 5.75798C13.9804 5.40287 13.4008 5.40287 13.0435 5.75798L10.7138 8.07207C10.3565 8.42718 9.77716 8.42718 9.41967 8.07207L7.09016 5.75798C6.73268 5.40287 6.15331 5.40287 5.79581 5.75798Z" fill="#C20000"/>
        </svg> &nbsp;
        Back</button>
       
       
    </div>
       </div>
    </div>
  }


   const {getPerticularGrade,allStudent,getAllGrade} = useGradeContext()

  useEffect(()=>{
    getAllGrade()
  },[])
  return (<div className="grade_main_container">
  <div className="grade_info_details_comp_main_contianer_details">
       <div className="grade_info_details_comp_main_contianer_details_header">
         <h5>Grades</h5>
        
       </div>
       <div className="list_of_grades_wrapper">
       {
      Role === "student"?   <div className="grade_info_details_comp_main_contianer_details_list">
      <div className="grade_info_details_comp_main_contianer_details_list_header">
        <h3>Name</h3>
        <h3>Score</h3>
        <h3>Out of</h3>
      </div>
      {
        GradeData.map((grade, index) => {
          return  <div  className="grade_info_details_comp_main_contianer_details_list_item">
          <h4>{grade.name}</h4>
          <h4>{grade.points}</h4>
          <h4>{grade.outof}</h4>
        </div>
        })
        
      }
    
     </div> :   <div className="grade_info_details_comp_main_contianer_details_list">
      <div className="grade_info_details_comp_main_contianer_details_list_header">
        <h3>Student Name</h3>
      
      </div>
      {
        allStudent.map((grade, index) => {
          return  <div onClick={()=>{
             setShowgradePopup(true)
             getPerticularGrade(grade)
             setPerticularStudentGrade(grade)
          }}  className="grade_info_details_comp_main_contianer_details_list_item">
          <h4>{grade}</h4>
          
        </div>
        })
        
      }
    
     </div> 
     }
       </div>
      {
        Role === "student" ?  <div className="grade_info_details_comp_main_contianer_details_list_item_total">
        <h4>{"Total Score"}</h4>
        <h4>{getScore ().points}</h4>
        <h4>{getScore ().total}</h4>
      </div> : ""
      }
</div>
{
  showgradePopup &&  <PerticularStudentPopUp setClose={setShowgradePopup} grade={perticularStudentGrade} />
}
{
// showgradePopup &&
}
</div>
  )
}

export default Grade