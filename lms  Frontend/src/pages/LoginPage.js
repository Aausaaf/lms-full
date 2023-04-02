import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';
import Loder from './Loader/Loder';
import { useUserContext } from 'src/ApiIntegration/User';
import { useState } from 'react';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 550,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));


export const Success_pop_up = styled('div')(({ theme }) => ({
  paddingInline: "2rem",
    height: "4rem",
    position: "absolute",
    top: "4rem",
    right: "2rem",
    background: "#D9FFDA",
boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
borderRadius: "5px",
borderLeft:" 5px solid #7ddf81",
display: "flex",
alignItems: "center",
justifyContent: "center",
zIndex:"100"

}));

export const Error_pop_up = styled('div')(({ theme }) => ({
  paddingInline: "2rem",
    height: "4rem",
    position: "absolute",
    top: "4rem",
    right: "2rem",
    background: "#FFE6E6",
boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
borderRadius: "5px",
borderLeft:" 5px solid #f05e5e",
display: "flex",
alignItems: "center",
justifyContent: "center",
zIndex:"100"
}));


// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const {showLoader} = useUserContext()
  const [successStatus,setSuccessStatus] = useState(false)
  const [errorStatus,setErrorStatus] = useState("")
 const [error,setError] = useState(false)


 const SuccessPopUp = () => {
  return <Success_pop_up >
      <p style={{
        color:"#008C0E"
      }}>You have successfully Login</p>
  </Success_pop_up>
}

const ErrorPopUp = () => {
  return <Error_pop_up >
      <p style={{
        color:"red"
      }}>{errorStatus}</p>
  </Error_pop_up>
}


if(successStatus)
{
  setTimeout(()=>{
     setSuccessStatus(false)
  },1500)
}



if(errorStatus.length > 0)
{
  setTimeout(()=>{
      setErrorStatus("")
  },1500)
}



  return (
    <>
      <Helmet>
        <title> Login | TG</title>
      </Helmet>

      <StyledRoot>
        {
          showLoader && <Loder/>
        }
         {
       successStatus&&<SuccessPopUp/>
          }
        {
    errorStatus.length > 0 &&<ErrorPopUp/>
          }
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome to TG LMS
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to LMS
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              {/* Don’t have an account? {''} */}
              {/* <Link variant="subtitle2">Get started</Link> */}
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>

              <Button disabled fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button disabled fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <LoginForm  setSuccessStatus={setSuccessStatus} setErrorStatus={setErrorStatus}/>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
