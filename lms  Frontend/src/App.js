import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import Loder from './pages/Loader/Loder';
import { UserProvider, useUserContext } from './ApiIntegration/User';
import { CourseProvider } from './ApiIntegration/courses';
import { LectureProvider } from './ApiIntegration/lecture';
import { AssignmentProvider } from './ApiIntegration/assignment';
import { QuizProvider } from './ApiIntegration/quiz';
import { GradeProvider } from './ApiIntegration/grade';
import { SyllabusProvider } from './ApiIntegration/syllabus';

// ----------------------------------------------------------------------

export default function App() {

  
  

  return ( 
    <>
  
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
        <UserProvider>
      <CourseProvider>
      <LectureProvider>
      <AssignmentProvider>
     <QuizProvider>
    <GradeProvider>
   <SyllabusProvider>
   <Router />
   </SyllabusProvider>
    </GradeProvider>
     </QuizProvider>
      </AssignmentProvider>
      </LectureProvider>
      </CourseProvider>
        </UserProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
    </>
    
  );
}
