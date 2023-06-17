import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

function ForgotPassword() {
  const [comment, setComment] = useState("");
  const [email, setemail] = useState("");
  const [validated, setvalidated] = useState(false);

  // on submit handler
  function submitHandler(e) {
    e.preventDefault();
    console.log("emial: ", email);
    console.log("comment: ", comment);
    if (email === "") {
      setComment("email is required");
    } else {
      //1. verify the email in the database
      // 2. redirect
      //   also send the email to the next component
      setvalidated(true)
    }
  }

  function emailHandler(e) {
    setemail(e.target.value);
    setComment("");
  }

  return (
    <div className="container d-flex flex-column">
      <div className="row align-items-center justify-content-center my-5">
        <div className="col-lg-5 col-md-8">
          <div className="card shadow">
            <div className="card-body p-6">
              <div className="mb-4">
                <h1 className="mb-1 fw-bold">Forgot Password</h1>
                <p>Fill the form to reset your password.</p>
              </div>
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label for="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter Your Email "
                    required=""
                    value={email}
                    onChange={emailHandler}
                  />
                  <small className="text-danger">{comment}</small>
                </div>
                <div className="mb-3 d-grid">
                  {/* <Link to="/resetpassword"> */}
                  <button type="submit" className="btn btn-primary">
                    Reset Password
                  </button>
                  {/* </Link> */}
                </div>
                <div className="text-danger"></div>
              </form>
              {validated ? (
                <Redirect
                  to={{
                    pathname: "/resetpassword",
                    state: email,
                  }}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
