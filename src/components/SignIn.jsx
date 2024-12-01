import React, { useContext } from "react";
import Navbar from "./Navbar";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    signInUser(email, password)
      .then((result) => {
        console.log(result);

        // lastLogin time store database
        const lastSignInTime = result.user.metadata.lastSignInTime;
        const loginInfo = { email, lastSignInTime };

        fetch(`https://coffe-store-server-seven-smoky.vercel.app/users`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("sign in info update db", data);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="hero bg-base-200 min-h-screen">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-2xl font-semibold text-center mt-8">Sign In Now!</h1>
            <form onSubmit={handleSignIn} className="card-body">
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
                <button className="btn btn-primary">SignIn</button>
              </div>
              <p> Don't Have an Account? <Link to='/signUp' className='text-red-500'>SignUp</Link></p>
            </form>
          </div>
        </div>
    </>
  );
};

export default SignIn;
