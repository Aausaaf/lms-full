import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import LandingPage from './pages/LandingPage/LandingPage';
import Assignment  from './pages/Assignment';
import Projects  from './pages/project';
import Lecture  from './pages/Leacture';
import Quiz  from './pages/Quiz';
import Discussion from './pages/discussion/discussion';
import PerticularAssignment from './pages/PerticularAssignment/PerticularAssignment';
import PerticularQuiz from './pages/PerticularQuiz/PerticularQuiz';
import Grade from './pages/grade/Grade';
import Syllabus from './pages/syllabus/Syllabus';
import Modules from './pages/modules/Modules';
import AddAssignment from './sections/@dashboard/aasignment/AddAssignment/AddAssignment';
import AddQuiz from './sections/@dashboard/quiz/AddQuiz/AddQuiz';
import PerticularLecture from './pages/PerticularLeacture/PerticularLecture';
import AddLeacture from './sections/@dashboard/leacture/AddLeacture/AddLeacture';
import AddNewUserPopUp from './pages/AddUser/AddUser';
import AddProject from './sections/@dashboard/projects/AddProject/AddProject';
import { useUserContext } from './ApiIntegration/User';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function Router() {

  const navigate = useNavigate()
  const {getLoggedIn} = useUserContext()
  useEffect(()=>{ 
    if(localStorage.getItem('UserToken'))
    {
     getLoggedIn()
    }
    else
    {
     navigate("/login")
    }
},[])
 
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: false },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'assignment', element: <Assignment/> },
        {path: 'discussions', element:<Discussion/>},
        { path: 'quiz', element: <Quiz/> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'perticularassignment/:id', element: <PerticularAssignment /> },
        {path: "perticularquiz/:id" , element: <PerticularQuiz/> },
        { path:"grade" , element: <Grade /> },
        { path: "syllabus", element: <Syllabus /> },
        { path:"modules", element: <Modules /> },
        {path:"addassignment", element: <AddAssignment/>},
        {path:"addquiz" , element: <AddQuiz/>},
        { path: 'lecture', element: <Lecture/> },
        { path: 'perticularlecture/:id', element: <PerticularLecture /> },
        {path:"addlecture", element: <AddLeacture/>},
        {path:"adduser", element: <AddNewUserPopUp/>},
        {path:"projects", element: <Projects/>},
        {path:"addproject", element: <AddProject />}
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: false },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: '/',
      element: <LandingPage/>,
    }
  ]);

  return routes;
}
