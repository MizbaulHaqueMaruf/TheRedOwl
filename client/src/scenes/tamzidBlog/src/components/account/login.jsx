
import { TextField, Button, styled, Typography} from '@mui/material';
//import iutImage from './images/iut.png';
import {useState, useContext} from 'react';
import { API } from '../../service/api';
import { DataContext } from '../../constants/context/DataProvider';
import { useNavigate } from 'react-router-dom';
import './../css/csspart.css';


const Error= styled(Typography)`
    font-size:10px;
    color: #ff6161;
    line-height:0;
    margin-top: 10px;
    font-weight: 600;
`



const signupInitialValues=
{
    firstname:'',
    lastname:'',
    email:'',
    password:'',
    confirm_password:''    
}
const loginInitialValues=
{
    email:'',
    password:''
}


const Login = () =>{
    const [account, toggleAccount]=useState('login');
    const [signup,setSignup]= useState(signupInitialValues);
    const [error, setError]= useState();
    const [login, setLogin]=useState(loginInitialValues);
    const { setAccount }= useContext(DataContext); 

    const navigate= useNavigate();

    const toggleSignup = () =>
    {
        account ==='signup' ? toggleAccount('login') : toggleAccount('signup');
    }
    const onInputChange=(e)=>
    {
        setSignup({...signup,[e.target.name]: e.target.value});
    }
    const signupUser=async() => 
    {
        let response=await API.userSignup(signup);
        if(response.isSuccess){
            setError('');
            setSignup(signupInitialValues);
            toggleAccount('login')
        }else{
            setError('Something went wrong! Please try again');
        }
    }
    const onValueChange=(e)=>{
        setLogin({...login,[e.target.name]: e.target.value})
    }

   const loginUser=async()=>{
        let response = await API.userLogin(login);
        if(response.isSuccess){
            setError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

            setAccount({firstname: response.data.firstname, email:response.data.email});
            navigate('/');
        }else{
            setError('Something went wrong! Please try again');
        }
    }
    //   <img src={iutImage} alt="IUT Logo" style={{ display: "block", margin: "auto" }} />
   // <p></p>
    return(
        
        <div>
            
         
            {
            account==='login'?
            <div>
            <div className={"login_container"}>
                <div className={"login_form_container"}>
                    <div className={"left"}>
                       
                            <h1>Login to Your Account</h1>
                            <TextField variant='standard' type='text' value={login.email} onChange={(e) => onValueChange(e)}name='email' required label="Enter E-mail" className={"input"}/>
                            <TextField variant='standard' type="password" value={login.password}onChange={(e) => onValueChange(e)}name="password" required label="Enter Password" className={"input"}/>
                            {error && <Error>{error}</Error>}
                            <button variant='container'onClick={()=> loginUser()} className={"green_btn"} >Login</button>
                        

                    </div>
                    <div className={"right"}>
                        <h1>New Here?</h1>
                        <button onClick={()=> toggleSignup()} variant='outlined'className={"white_btn"}>Create a new account</button> 
                    </div>

                </div>

            </div>       
                
        </div>
            :
                <div className={"signup_container"}>
                    <div className={"signup_form_container"}>
                        <div className={"sleft"}>
                            <h1>Already have an Account?</h1>
                            <button onClick={()=> toggleSignup()} variant='outlined' className={"white_btn"}>Login</button>
                        </div>
                        <div className={"sright"}>
                            <h1>Create Account</h1>
                            <TextField variant='standard' placeholder='Enter First Name' onChange={(e) => onInputChange(e)} name='firstname'className={"input"} />
                        <TextField variant='standard' placeholder='Enter Last Name' onChange={(e) => onInputChange(e)} name='lastname' className={"input"}/>
                        <TextField variant='standard' placeholder='Enter E-mail' type="email" onChange={(e) => onInputChange(e)} name='email'className={"input"}/>
                        <TextField variant='standard' placeholder='Enter Password' type="password" onChange={(e) => onInputChange(e)} name='password' className={"input"}/>
                        <TextField variant='standard' placeholder='Confirm Password' type="password" onChange={(e) => onInputChange(e)} name='confirm_password' className={"input"}/> 
                        {error && <Error>{error}</Error>}
                        <button variant='container' onClick={()=>signupUser()} className={"green_btn"}>Sign Up</button>                

                        </div>
                    </div>
                    
                    
                </div>
            }
        </div>
            
      
        )
        
}
export default Login;