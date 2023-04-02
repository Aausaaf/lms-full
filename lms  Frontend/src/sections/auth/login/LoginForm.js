import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { useUserContext } from 'src/ApiIntegration/User';
import Cookies from "js-cookie";

// ----------------------------------------------------------------------

export default function LoginForm({setSuccessStatus,setErrorStatus}) {

  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const {getLogin} = useUserContext()
  const [showPassword, setShowPassword] = useState(false);
  const [loginData,setLoginData] = useState({
    email:"",
    password:"",
  });

  function fillInLoginForm() {
   const rememberMe = Cookies.get("rememberMe") === "true";
   const email = Cookies.get("email") || "";
   const password = Cookies.get("password") || "";
   return { rememberMe, email, password };
 }


  
  const handleClick = () => {
    console.log(loginData)
    getLogin(loginData,setSuccessStatus,setErrorStatus)

    if (rememberMe) {
      console.log("remember")
      Cookies.set("rememberMe", "true", { expires: 365 });
      Cookies.set("email", loginData.email, { expires: 365 });
      Cookies.set("password", loginData.password, { expires: 365 });
    } else {
      Cookies.remove("rememberMe");
      Cookies.remove("email");
      Cookies.remove("password");
    }
  };

  useEffect(()=>{
    const { rememberMe, email, password } = fillInLoginForm();
    setLoginData({...loginData,email:email});
    setLoginData({...loginData,password:password});
    setRememberMe(rememberMe);
  },[])

  return (
    <>
      <Stack spacing={3}>
        <TextField  value={loginData.email} onChange={(e)=>{
          setLoginData({...loginData,email:e.target.value})
        }} name="email" label="Email address" />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={loginData.password} onChange={(e)=>{
            setLoginData({...loginData,password:e.target.value})
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me"    onChange={(e) => setRememberMe(e.target.checked)} /> <span style={{
          marginRight:"auto"
        }}>Remember me</span>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
