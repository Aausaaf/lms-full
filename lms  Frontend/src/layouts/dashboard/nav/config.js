// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Home',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
   title:"lecture",
   path: "/dashboard/lecture",
   icon : icon('ic_lecture'),
  },

  {
    title: 'assignment',
    path: '/dashboard/assignment',
    icon: icon('ic_assignment'),
    
  },
  {
    title: 'quiz',
    path: '/dashboard/quiz',
    icon: icon('ic_quiz'),
    
  },
  {
    title: 'Discussion',
    path: '/dashboard/discussions',
    icon: icon('ic_discussion'),
    
  },
  {
    title:"Grade",
    path: '/dashboard/grade',
    icon: icon('ic_grade'),
  },
  {
    title: "Syllabus",
    path: '/dashboard/syllabus',
    icon : icon('ic_syllabus'),
   },
   {
   title:"Modules",
   path: '/dashboard/modules',
   icon : icon('ic_modules'),
   },
   {
     title : "Projects",
     path: "/dashboard/projects",
     icon : icon('ic_projects'),
   },

  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
