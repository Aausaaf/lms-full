import React from 'react'
import "./PerticularLecture.css"
import { useParams } from 'react-router-dom';
import { Player } from 'video-react';
import { useLectureContext } from 'src/ApiIntegration/lecture';
import parse from 'html-react-parser';


const PerticularLecture = () => {

    
  const {id} = useParams();
   const {lecturesData} = useLectureContext()
  return (<div className="perticular_assignment_page_main_container">
     <div className="perticular_assignment_header">
     <h1> {lecturesData[id]?.title}</h1>
     
     </div>
      <div className="due_date_div">
        <div className="due_block">
            <h4>Created At : </h4>
            <p>{"01/10/23"}</p>
        </div>
        <div className="due_block">
            <h4>Updated At : </h4>
            <p>{"01/10/23"}</p>
        </div>
        
      </div>
      <div className="assignment_details">
      <div className="leacure_video">
      <Player>
      <source src={lecturesData[id]?.videoLink} />
    </Player>
      </div>
      <h2>Description : </h2>
        <p>{parse(lecturesData[id]?.content)}</p>

    
    <div className="summary">
        <br />
        <br />
    <h2>Summary : </h2>
        <p>{`
This product is an extension to previously done ( FakeAPIStore ) problem. wherein you have already completed the part till product rendering on index.html page. Now you need to add more functionality to it
Each product should have an Add to Cart Button. Clicking product will add it to the cart. Show the cart count on top RHS of navbar. ( hint : store cart in local storage )
if item is already present in the cart. show a alert that item is already added
Create a cart.html where the user should be able to see all the products they added to the cart. If a user applies 'masai30' as a coupon code, they get a 30% discount.
Create a checkout.html page, where users should be able to add their address and go to the payments page.
On the payment.html page, users can enter their dummy debit card details and click on 'place order' button.
Once an order is placed, show a confirmation message 'Your order is successfully placed' after 3 seconds.`}</p>
    </div>

      </div>
      
  </div>
  )
}

export default PerticularLecture