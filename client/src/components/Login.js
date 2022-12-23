import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import "../App.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import courseContext from '../context/CourseContext';
import logo from "../yuva_logo2.png";

const Login = (props) => {
    const navigate = useNavigate();
    const context = useContext(courseContext);
    const {fromLogin, setFromLogin} = context;

    const [credentials, setCredentials] = useState({email: "", password: ""});
    const host = 'http://localhost:5000';

    const handleSubmit = async (e)=>{
        
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        // console.log('email: ', credentials.email);
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            // toast.success("Logged in successfully", {
            //     position: 'top-center',
            //     autoClose: 1000
            // });
            setFromLogin(true);
            navigate("/profile");
                
        
            // props.showAlert("Logged in succesfully", "success");
            // Checking if user is admin or not
            fetch(`${host}/api/auth/getuser`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            })
            .then((response) => response.json())
            .then((data) => {
                // console.log('USER IS:', data);
                // if(data.role==='admin'){
                //     setIsAdmin(true);
                // }
                // Navbar.forceUpdate();
                localStorage.setItem('user_id', data._id);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            window.location.reload();
            

        }
        else{
            toast.error("Invalid credentials", {
                position: 'top-center',
                autoClose: 2000
            });
            console.log("Please enter valid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }


  return (
    <div>
  <section>
  {/* <div className="container-fluid h-custom my-5"> */}
    <div className=" pv " style={{display: "flex" , marginTop: "100px"}}>
      <div className="col-md-9 col-lg-6 col-xl-5 left">
        <img src={logo} style={{ borderRadius: "45px"}}
          className="img-fluid" alt="Sample image"/>
      </div>

      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 logindiv right">
        <form className='my-4' style={{padding:"20px" , paddingTop:"70px"}}>
            <h3 style={{marginBottom: "27px", fontSize: "1.5em"}}>Sign in</h3>
          
          <div className="form-outline mb-4" >
          <input type="email"  style={{borderRadius:"0px" , fontSize:"25px"}}
          className="form-control form-control-lg"  id="floatingInput" name='email' placeholder="Username" value={credentials.email} onChange={onChange}/>
            {/* <label className="form-label" htmlFor="floatingInput">Email</label> */}
          </div>

          <div className="form-outline mb-3">

            <input type="password" style={{borderRadius:"0px", fontSize:"25px"}} className="form-control form-control-lg" id="floatingPassword" name='password' placeholder="Password" value={credentials.password} onChange={onChange}/>
            {/* <label className="form-label" htmlFor="floatingPassword">Password</label> */}
          </div>

          {/* <div className="d-flex justify-content-between align-items-center">
            
            <Link  className="text-body" to="/signup">Forgot password?</Link>
          </div> */}

          <div className="text-center text-lg-start mt-4 pt-2">
            <button style={{borderRadius:"0px" ,width:"150px" , fontSize:"25px"}} 
            type="button" className="btn btn-success btn-lg" onClick={handleSubmit}
              >Login</button>
            {/* <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/signup"
                className="link-danger">Register</Link></p> */}
          </div>

        </form>
      </div>
    </div>
  {/* </div> */}
 
</section>
    <ToastContainer/>

    </div>
  )
}

export default Login