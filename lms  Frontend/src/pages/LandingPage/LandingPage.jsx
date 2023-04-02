import React, { useState } from 'react'
// import Header from '../../layouts/dashboard/header'

import "./LandingPage.css"
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Button } from '@mui/material';
// utils
import { bgBlur } from '../../utils/cssStyles';
// components
import Iconify from '../../components/iconify';
//
import Searchbar from '../../layouts/dashboard/header/Searchbar';
import AccountPopover from '../../layouts/dashboard/header/AccountPopover';
import LanguagePopover from '../../layouts/dashboard/header/LanguagePopover';
import NotificationsPopover from '../../layouts/dashboard/header/NotificationsPopover';
import Logo from '../../components/logo'
import { Role } from '../../env';
import AddCourses from '../AddCourses/AddCourses';
import { useCourseContext } from 'src/ApiIntegration/courses';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

const NAV_WIDTH = 0;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
const CartLowLengthCart = ({data}) => {
  const navigate = useNavigate()
    return  <div onClick={()=>{
      navigate("/dashboard/app")
      localStorage.setItem("course",JSON.stringify(data._id));
    }}  className="course_list_item_list">
      <div className="course_list_item_banner_list">
          <img src={data.image} alt="" />
      </div>
      <div className="course_list_item_details_list">
          <h2>{data.price} ₹</h2>
          <h1>{data.name}</h1>
           <div className="course_list_item_star_list">
           <img src="https://img.icons8.com/tiny-color/18/null/star.png" alt=''/>
           <img src="https://img.icons8.com/tiny-color/18/null/star.png" alt=''/>
           <img src="https://img.icons8.com/tiny-color/18/null/star.png" alt=''/>
           <img src="https://img.icons8.com/tiny-color/18/null/star.png" alt=''/>
           <img src="https://img.icons8.com/metro/18/red/star.png" alt=''/>
           </div>
           <h4>({"0"} Reviews)</h4>
            <div className="course_list_item_border_list">
         &nbsp;
            </div>
            <div className="course_list_item_time">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
  width="20" height="20"
  viewBox="0 0 50 50">
  <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 37.039062 10.990234 A 1.0001 1.0001 0 0 0 36.265625 11.322266 L 26.183594 22.244141 A 3 3 0 0 0 25 22 A 3 3 0 0 0 22 25 A 3 3 0 0 0 25 28 A 3 3 0 0 0 25.5 27.958984 L 29.125 34.486328 A 1.0010694 1.0010694 0 1 0 30.875 33.513672 L 27.246094 26.984375 A 3 3 0 0 0 28 25 A 3 3 0 0 0 27.652344 23.599609 L 37.734375 12.677734 A 1.0001 1.0001 0 0 0 37.039062 10.990234 z">ekr</path>
  </svg>
  <h5> {data.duration}</h5>
            </div>
      </div>
  </div>
   }



   const RecommendedCoursesCart = ({data}) => {
    const navigate = useNavigate()
      return  <div onClick={()=>{
        navigate("/")
      }}  className="course_list_item_list">
        <div className="course_list_item_banner_list">
            <img src={data} alt="" />
        </div>
        <div className="course_list_item_details_list">
            <h2>1200 ₹</h2>
            <h1>{"React Basic we Devlopment with a hands on project"}</h1>
             <div className="course_list_item_star_list">
             <img src="https://img.icons8.com/tiny-color/18/null/star.png" alt=''/>
             <img src="https://img.icons8.com/tiny-color/18/null/star.png" alt=''/>
             <img src="https://img.icons8.com/tiny-color/18/null/star.png" alt=''/>
             <img src="https://img.icons8.com/tiny-color/18/null/star.png" alt=''/>
             <img src="https://img.icons8.com/metro/18/red/star.png" alt=''/>
             </div>
             <h4>({"0"} Reviews)</h4>
              <div className="course_list_item_border_list">
           &nbsp;
              </div>
              <div className="course_list_item_time">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
    width="20" height="20"
    viewBox="0 0 50 50">
    <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 37.039062 10.990234 A 1.0001 1.0001 0 0 0 36.265625 11.322266 L 26.183594 22.244141 A 3 3 0 0 0 25 22 A 3 3 0 0 0 22 25 A 3 3 0 0 0 25 28 A 3 3 0 0 0 25.5 27.958984 L 29.125 34.486328 A 1.0010694 1.0010694 0 1 0 30.875 33.513672 L 27.246094 26.984375 A 3 3 0 0 0 28 25 A 3 3 0 0 0 27.652344 23.599609 L 37.734375 12.677734 A 1.0001 1.0001 0 0 0 37.039062 10.990234 z">ekr</path>
    </svg>
    <h5> 10 Hours 20 Minutes</h5>
              </div>
        </div>
    </div>
     }


 function Header({ onOpenNav }) {
  return (
    <StyledRoot>
         <Logo
          sx={{
            position: 'fixed',
             top: { xs: 16, sm: 24, md: 20 },
          
            left: { xs: 16, sm: 24, md: 40 },
          }}/>
      <StyledToolbar>
        &nbsp;        &nbsp;        &nbsp;        &nbsp;        &nbsp;        &nbsp;        &nbsp;        &nbsp;
        &nbsp;        &nbsp;        &nbsp;        &nbsp;        &nbsp;        &nbsp;
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          {/* <Iconify icon="eva:menu-2-fill" /> */}
        </IconButton>

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {/* <LanguagePopover /> */}
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}

const LandingPage = () => {
  

  const [showAddCourse,setShowAddCourse] = useState(false)
  const {getCourseData,coursesData} = useCourseContext()
 
  useEffect(()=>{
    getCourseData()
  },[])

  return (<div className="landing_page_main_container">

           <Header onOpenNav={() => true} />
           <div className="banner">
           <div className="banner_inner_cotainer">
           <div className="banner_left_side_div">
   <h2>Threat <span>Guardians</span></h2>
   <h1>Learn Professional Skills
& Become Job Ready</h1>
<div className="description">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo earum dolorem ipsam, mollitia ipsum itaque molestias libero, tempore, nulla debitis ratione magnam eligendi nemo nostrum incidunt animi voluptatibus minus? Molestias!</p>
</div>
<button>Explore Courses</button>
</div>
<div className="banner_right_side_div">
    <img src="./assets/images/covers/banner.jpg" alt="df" />
    </div>
           </div>
           </div>
           <div className="course_list">
            <div className="course_headerr">
               {
                Role === "student" ? <h2>Enrolled Courses</h2> : <div className="header_course">
                   <h2>Courses</h2>
                   <Button onClick={()=>{
                    setShowAddCourse(true)
          }} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
          Add Course
        </Button> 
                </div>
               }
                <div className="bottom_border">&nbsp;</div>
            </div>
            <div className="courses_body_list">
              {
          coursesData.map((data)=>{
                  return  <CartLowLengthCart data={data} />
                })
              }
            </div>
           </div>


          {
            Role === "student" ?  <div className="course_list">
            <div className="course_headerr">
                <h2>Recommended Courses</h2>
                <div className="bottom_border">&nbsp;</div>
            </div>
            <div className="courses_body_list">
              {
                ["https://www.filepicker.io/api/file/SVFQZQAyRpqJ31f6LNGe","https://storage.gra.cloud.ovh.net/v1/AUTH_5159edadfde2413fb43128c1fef06fbf/zerofiltre-object-container/sharedModule.png",
                "https://www.analyticssteps.com/backend/media/thumbnail/6109690/8935577_1640940844_what%20is%20web%203Artboard%201.jpg"
               ].map((data)=>{
                  return  <RecommendedCoursesCart data={data} />
                })
              }
            </div>
           </div> : ""
          }



           <div className="landing_footer">
          <a href=""> <i className="fa fa-linkedin" aria-hidden="true"></i></a>
         <a href="">  <i className="fa fa-twitter" aria-hidden="true"></i></a>
          <a href=""> <i className="fa fa-instagram" aria-hidden="true"></i></a>
           <a href=""><i className="fa fa-facebook-f"></i></a>
           </div>
           {
            showAddCourse &&  <AddCourses setShowAddCourse={setShowAddCourse}/>
           }
  </div>
  )
}

export default LandingPage


// ["https://www.filepicker.io/api/file/SVFQZQAyRpqJ31f6LNGe","https://storage.gra.cloud.ovh.net/v1/AUTH_5159edadfde2413fb43128c1fef06fbf/zerofiltre-object-container/sharedModule.png",
// "https://www.analyticssteps.com/backend/media/thumbnail/6109690/8935577_1640940844_what%20is%20web%203Artboard%201.jpg"
// ,"https://www.datasciencecentral.com/wp-content/uploads/2021/10/9430449274.png","https://the-guild.dev/blog-assets/graphqxl-language/thumbnail.png","https://mllj2j8xvfl0.i.optimole.com/cb:pJlS~36fbd/w:auto/h:auto/q:90/f:avif/https://themeisle.com/blog/wp-content/uploads/2020/05/wordpress-language.jpg","https://i.ytimg.com/vi/gZ1PK7TrcPA/maxresdefault.jpg"]