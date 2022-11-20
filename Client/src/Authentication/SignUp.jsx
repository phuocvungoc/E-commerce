import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import AuthAPI from "../API/AuthAPI";

SignUp.propTypes = {};

function SignUp(props) {
  const [err, setErr] = useState("");

  const handlerSignUp = async (e) => {
    try {
      e.preventDefault();
      const user = {
        fullname: e.target.fullname.value,
        email: e.target.email.value,
        password: e.target.password.value,
        confirmPassword: e.target.confirmPassword.value,
        phone: e.target.phone.value,
      };
      await AuthAPI.postSignUp(user);
      window.location.href = "/signin";
    } catch (error) {
      setErr(error.response.data);
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
          <span className="login100-form-title p-b-33">Sign Up</span>
          <div className="d-flex justify-content-center pb-5">
            {err && <span className="text-danger">{err}</span>}
          </div>
          <form type="submit" onSubmit={handlerSignUp}>
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                name="fullname"
                id="fullname"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>

            <div className="wrap-input100 rs1 validate-input">
              <input
                className="input100"
                name="email"
                id="email"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="wrap-input100 rs1 validate-input">
              <input
                className="input100"
                name="password"
                id="password"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="wrap-input100 rs1 validate-input">
              <input
                className="input100"
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                required
              />
            </div>

            <div className="wrap-input100 rs1 validate-input">
              <input
                className="input100"
                name="phone"
                id="phone"
                type="text"
                placeholder="Phone"
                required
              />
            </div>

            <div className="container-login100-form-btn m-t-20">
              <button className="login100-form-btn" type="submit">
                Sign Up
              </button>
            </div>
          </form>
          <div className="text-center p-t-45 p-b-4">
            <span className="txt1">Login?</span>
            &nbsp;
            <Link to="/signin" className="txt2 hov1">
              Click
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
