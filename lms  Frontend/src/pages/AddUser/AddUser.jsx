import React, { useState } from 'react'
import "./AddUser.css"


const AddNewUserPopUp = ({setShowAddNewUserPopUp}) => {

  const [userData,setUserData] = useState({
    username:"",
    password:"",
    email:""
  })

  const [errorApi,setErrorApi] = useState("")

  return (  <div className="login_page_main_container">
  <div className="login-page">
      <form onSubmit={async(e)=>{
        e.preventDefault()
       
        
        
       
      }} className="form">
         
              <h2>Add User <span onClick={()=>{
                setShowAddNewUserPopUp(false)
              }}>×</span></h2>
           
            
              <input value={userData.username} onChange={(e)=>{
                setUserData({...userData,username:e.target.value})
                setErrorApi("")
              }} type="text" required placeholder="Username"  autoComplete="off" />
              <input value={userData.email} onChange={(e)=>{
                setUserData({...userData,email:e.target.value})
                setErrorApi("")

              }} type="email" required placeholder='Email'  />
              <input value={userData.password} onChange={(e)=>{
                setUserData({...userData,password:e.target.value})
                setErrorApi("")

              }}  type="password" required placeholder="Password"  autoComplete="off" />
              {/* <img src="https://cdn2.iconfinder.com/data/icons/basic-ui-interface-v-2/32/hide-512.png"
                  onclick="show()" id="showimg"/> */}
              <span id="vaild-pass">{errorApi} </span>
           
            
              <button type="submit">Save</button>
              
        
      </form>
  </div>
</div>
  )
}

export default AddNewUserPopUp