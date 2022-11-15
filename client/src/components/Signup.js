import {React, useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = () => {

    const [credentials, setCredentials] = useState({name:"", email: "", phone:"", password: "", cpassword: ""}) 
    let navigate = useNavigate();
    const host = 'http://localhost:5000';


    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password, phone}=credentials;
        if(name.length<3){
            alert('Name must be atleast 3 characters long');
            return;
        }
        if((phone[0]!=='6' && phone[0]!=='7' &&phone[0]!=='8' &&phone[0]!=='9' ) || phone.length!=10){
            alert('Invalid phone number');
            return;
        }
        const response = await fetch(`${host}/api/auth/createuser`, {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password, phone})
        });
        const json = await response.json()
        if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            localStorage.setItem('user_id', json.user_id);
            navigate("/courses");
            console.log("Account created successfully");
            // props.showAlert("Account created succesfully", "success");
            window.location.reload()
        }
        else{
            // props.showAlert("Invalid details", "danger");
            alert("Please enter valid details")
            // console.log("Some error");
        }

        
        
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div>
        <section className="vh-100" style={{backgroundColor: "#eee"}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: "25px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form className="mx-1 mx-md-4">

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c1" className="form-control"  name='name' onChange={onChange} minLength={3}/>
                      <label className="form-label" htmlFor="form3Example1c1">Your Name</label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fa-solid fa-phone my-auto"></i>     
                      <div className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" className="form-control"  name='phone' onChange={onChange}/>

                      <label className="form-label" htmlFor="form3Example1c">Phone</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c2" className="form-control" name='email' onChange={onChange}/>
                      <label className="form-label" htmlFor="form3Example3c2">Your Email</label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example3c2" className="form-control" name='dob' onChange={onChange}/>
                      <label className="form-label" htmlFor="form3Example3c2">Date of birth (in the form 00/00/0000)</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" className="form-control" name='password' onChange={onChange}/>
                      <label className="form-label" htmlFor="form3Example4c" >Password</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4cd" className="form-control" />
                      <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                    </div>
                  </div>

                  

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit}>Register</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="sample"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Signup