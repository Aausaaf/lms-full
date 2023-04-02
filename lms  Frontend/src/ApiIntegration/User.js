import axios from "axios";
import { createContext, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import  axiosInstance from "./Interseptors"
const UserContext =  createContext()
 
export function useUserContext ()
{
    return useContext(UserContext)
}


// function objectToFormData(obj) {
//   const formData = new FormData();
//   for (const key in obj) {
//     if (Object.prototype.hasOwnProperty.call(obj, key)) {
//       const value = obj[key];
//       if (value instanceof File) {
//         formData.append(key, value, value.name);
//       } else if (value instanceof Array) {
//            let data = JSON.stringify(value)
//             formData.append(key, data);
          
          
//       } else if (typeof value === 'object' && value !== null) {
//         let data = JSON.stringify(value)
//         formData.append(key, data);
//       } else {
       
//         formData.append(key,  JSON.stringify(value));
//       }
//     }
//   }
//   return formData;
// }






export function UserProvider({children})
{
  const [loginData,setLoginData] = useState({})
  const [loginError,setLoginError] = useState("")
  const [editData,setEditData] = useState({
     firstName:"",
     middleName:"",
     lastName:"",
     employeeId:"",
     bloodGroup:"",
     gender:"",
     dateOfBirth:"",
     userType:"",
     department:"",
     designation:"",
     dateOfJoin:"",
     contractData:"",
     status:"",
     socialLinks:{
      facebook:"",
      linkedin:"",
      twitter:"",
     },
     permanentAddress:{
      address:"",
      city:"",
      state:"",
      zip:"",
      country:""
     },
     currentAddress:{
      address:"",
      city:"",
      state:"",
      zip:"",
      country:""
     },
     emergancyAddress:{
      address:"",
      city:"",
      state:"",
      zip:"",
      country:""
     },
  //    education:{
  //     instituteName:"",
  //     degree:"",
  //     passingYear:"",
  //     certificateLink:"",
  //     result:""
  //    },
  //   experience:{
  //     companyName:"",
  //     position:"",
  //     startDate:"",
  //     endDate:"",

  //   },
  //    bankAccount:{
  //     bankName : "",
  //   accountNumber : "",
  //   IfscCode : "",
  //   backAccountType:"",
  //   bankHolderName:"",
  //   passbook:""
  //    },
  //    nominee:{
  //     name :"",
  //     aadharNumber:"",
  //     age:"",
  //     address:"",
  //     relation:"",
  //     share:""
  //    }
  //  , supervisedBy :"",
  //   supervisor:[],
    image:"",
    panNumber:"",
    adharNumber:"",
    contactNumber:"",
    dateOfBirth:"",
    employeeStatus:"",

  })
  const navigate = useNavigate()
  const [showLoader,setLoader] = useState(false)
  const [showPrview,setShowPrview] = useState(null)

  const getLogin = (data,setSuccessStatus,setErrorStatus) => {
     setLoader(true)
    axiosInstance.post("/login",data).
    then((response) => {
        if(response.data.token)
        {
            localStorage.setItem("UserToken", JSON.stringify(response.data.token))
            setLoginData(response.data)
            window.location.href="/"
            setSuccessStatus(true)
             
        }
    }).catch((error) => {
        console.log(error)
        setErrorStatus(error.response.data.message)
    }).finally(()=>{
      setLoader(false)
    })

  }




  const getLoggedIn = () => {
    setLoader(true)

    axiosInstance.get("/loggedin").
    then((response) => {
        // console.log(response.data)
       
            setLoginData(response.data)
          
        
    }).catch((error) => {
        console.log(error)
        // setLoginError(error.response.message)
        navigate("/login")
    }).finally(()=>{
      setLoader(false)
    })

  }

//   const EditUserData = (editable) => {
//     setLoader(true)
     
//     axiosInstance.patch("/updateuserdata", editable== true ? {editable} : objectToFormData(editData)).then((response) => {
//               // console.log(response.data) 
//       getUserData()
//     }).catch((error)=>{
//       console.log(error)
//     }).finally(()=>{
//       setLoader(false)
//     })


    
//   }
  
//   const getUserData = () =>  {
//     setLoader(true)

//     axiosInstance.get("/getsignupdata").then((response) => {
//       console.log(response.data.users) 
//       let data = response.data.users
//       setEditData({
//         ...editData,firstName:data.employeename.split(" ")[0] ,middleName:data.employeename.split(" ").length > 2 ? data.employeename.split(" ")[1] : "",lastName:data.employeename.split(" ").length>2 ? data.employeename.split(" ")[2] : data.employeename.split(" ")[1], ...data
//       })
//     }).catch((error)=>{
//     console.log(error)
//     }).finally(()=>{
//       setLoader(false)
//     })

//     }
  


//    const changePasswordApi = (data,setErrorStatus,setSuccessStatus,setSettingData) => {
//     setLoader(true)
//      axiosInstance.post("/changepasswordfromprofilepage",data)
//      .then(response => {
//       console.log(response)
//       setSuccessStatus(true)
//      }).catch((error)=>{
//       console.log(error)
//       setErrorStatus(error.response.data.message)
//      }).finally(()=>{
//       setLoader(false)
//       setSettingData({
//         oldPassword:"",
//        newPassword:"",
//        confirmPassword:"",})
//      })
//    } 
   

//    const forgotPasswordApi = (data,setErrorStatus,setSuccessStatus) => {
//     setLoader(true)
//      axiosInstance.post("/forgotpassword",data)
//      .then(response => {
//       console.log(response)
//       setLoader(false)
//       setSuccessStatus(true)
//       localStorage.setItem("forgotOtpEmail",JSON.stringify(data.email))
//       navigate("/otpverification")
//      }).catch((error)=>{
//       console.log(error)
//       setErrorStatus(error.response.data.message)
//      }).finally(()=>{
//       setLoader(false)
    
//      })
//    } 


//    const forgotPasswordOtpVerification = (data,setErrorStatus,setSuccessStatus) => {
//     setLoader(true)
//     data.email = JSON.parse(localStorage.getItem("forgotOtpEmail"))
//      axiosInstance.post("/verifyforgetpasswordotp",data)
//      .then(response => {
//       console.log(response)
//       setLoader(false)
//       setSuccessStatus(true)
//       localStorage.setItem("otp",JSON.stringify(data.otp))
//       navigate("/newpassword")
  
//      }).catch((error)=>{
//       console.log(error)
//       setErrorStatus(error.response.data.message)
//      }).finally(()=>{
//       setLoader(false)
      
//      })
//    }
 

//    const changePasswordAfterForgot = (data,setErrorStatus,setSuccessStatus) => {
//     setLoader(true)
//     data.email = JSON.parse(localStorage.getItem("forgotOtpEmail"))
//     data.otp = JSON.parse(localStorage.getItem("otp"))
//      axiosInstance.post("/changepassword",data)
//      .then(response => {
//       console.log(response)
//       setLoader(false)
//       setSuccessStatus(true)
//       navigate("/passwordreset")
//      }).catch((error)=>{
//       console.log(error)
//       setErrorStatus(error.response.data.message)
//      }).finally(()=>{
//       setLoader(false)
    
//      })
//    }


//    const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//    setShowPrview(URL.createObjectURL(event.target.files[0]))
//     // Perform validation and upload the file
//     setEditData({...editData,image:event.target.files[0]})
//   };



  return <UserContext.Provider value={{
    getLogin,
    loginData,
    getLoggedIn,
    loginError,
    setLoginError,
    // EditUserData,
    // getUserData,
    editData,
    // setEditData,
    showLoader,
    setLoader,
    // changePasswordApi,
    // forgotPasswordApi,
    // forgotPasswordOtpVerification,
    // changePasswordAfterForgot,
    // showPrview,
    // handleFileUpload

  }}>
    {children}
  </UserContext.Provider>


}