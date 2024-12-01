import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const SignUp = () => {

    const {createUser}=useContext(AuthContext)



  const handleSignUp = (e) => {
    e.preventDefault();
    const from = e.target;
    const name = from.name.value;
    const email = from.email.value;
    const password = from.password.value;
    console.log({ email, password,name });

    createUser(email,password)
    .then(result=>{
        console.log(result.user);
        const creationTime=result.user.metadata.creationTime;



        const newUser={name,email,creationTime}

        // User created then send to database
        fetch('https://coffe-store-server-seven-smoky.vercel.app/users',{
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(newUser)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log('user created and send to database', data);
            if(data.insertedId){
                Swal.fire({
                    title: "success",
                    text: "Update Coffee successfully",
                    icon: "success",
                    confirmButtonText: "Cool",
                  });
            }
        })

    })
    .catch(error=>{
        console.log(error);
    })
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="hero bg-base-200 min-h-screen">

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h2 className="text-2xl font-semibold text-center mt-8"> Sign Up</h2>
          <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                name="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">SignUp</button>
            </div>
            <p>Have An Account ? <Link to='/signIn' className="text-red-500">SignIn</Link></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
