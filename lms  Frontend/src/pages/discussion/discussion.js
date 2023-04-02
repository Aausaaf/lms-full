import React, { useRef, useState } from 'react'
import "./discussion.css"

const Discussion = () => {
  const [sendMessageData,setSendMessageData] = useState("")
  const [allData,setAllData] = useState([])
   const inputRef = useRef(null)
  const chatBoxRef = useRef(null);

  const handlesendData = (message) => {
     setSendMessageData("")
    const data = {
        name:"Aausaf alam",
        time:new Date().toISOString().slice(0,10),
        message
     }
      setAllData([...allData,data])
  }



  const ReceivingMessageDiv = ({data}) => {
    return <div className="send_message_div">
        <div className="send_message_flex">
         <div className="send_message_profile"><img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" /></div>
            <div className="send_message_text">
                <p>{data.name}</p>
            <h4>{data.message}</h4>
             <h5>{data.time}</h5>
            </div>
        </div>
    </div>
  }
  const SendingMessageDiv = ({data}) => {
    setTimeout(() => {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }, 50);
    return <div style={{
        marginLeft:data.name === "Aausaf alam" ? "auto" : "0",
        marginRight:data.name === "Aausaf alam" ? "0" : "auto", 
    }} className="send_message_div">
    <div className="send_message_flex">
     <div className="send_message_profile"><img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" /></div>
        <div  className="send_message_text">
            <p>{data.name}</p>
        <h4>{data.message}</h4>
         <h5>{data.time}</h5>
        </div>
    </div>
</div>
  }

  return (<div className="discussion_page_main_container">


   <div ref={chatBoxRef} className="discussion_list">
     <div  className="discussion_list_inner_div">
     {
        allData.length > 0 ? allData.map((data)=>{
            return  <SendingMessageDiv data={data}/>
        }) : ""
     }
     </div>
   </div>





    <div className="discussion_input_box">
        <div onClick={()=>{
           document.getElementById("file").click();
          console.log("dflgh")
        }} className="file_box">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#4dce66" d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21H5Zm1-4h12l-3.75-5l-3 4L9 13l-3 4Z"/></svg>
        <input id="file"type="file" style={{
          display:"none"
        }}/>
        </div>
        <div className="input_box"><textarea  value={sendMessageData} onChange={(e)=>{
         setSendMessageData(e.target.value);   
        }} type="text"  placeholder='Type a message'/></div>
        <button onClick={()=>{handlesendData(sendMessageData)}} className="send_box"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="white" d="M2.01 21L23 12L2.01 3L2 10l15 2l-15 2z"/></svg></button>
    </div>
  </div>
  )
}

export default Discussion



