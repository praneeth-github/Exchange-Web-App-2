import React, { useState } from "react";

function ResetPassword() {
    const [Comment, setComment] = useState("")
    const [passComment, setpassComment] = useState("")
    const [newpass, setnewPass] = useState("")
    const [reenteredpass, setreenteredPass] = useState("")
    const [flage, setflage] = useState(false)


    // on submit 
    function submitHandler(e) {
        e.preventDefault()
        console.log("password: ", newpass)
        console.log("re entered pass: ", reenteredpass)
        if (newpass === "") {
            setComment("Password can't be empty")
        }
        else if (newpass !== reenteredpass) {
            setpassComment("passwords didn't match!!")
        }
        else {
            setComment("")
            setflage(true)
            setpassComment("")
            setreenteredPass("")
            setnewPass("")
        }
    }

    // on change of the password
    function handlePassword(e) {
        setnewPass(e.target.value)
        console.log(newpass)
        setComment("")
    }

    // on change of the reentered password
    function handleReenteredPassword(e) {
        setreenteredPass(e.target.value)
        console.log(reenteredpass)
        setpassComment("")
    }


    return (
        <div className="container m-5">

            {flage ? <div className="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Hurrey!</strong> Your Password has been set successfully .
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div> : ""}

            <h2 className="text-center  ">Reset your password Here</h2>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">New Password</label>
                    <input type="password" className="form-control" onChange={handlePassword}
                        value={newpass}
                        id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text text-danger">{Comment}</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Re-enter new Password</label>
                    <input type="password" className="form-control" onChange={handleReenteredPassword}
                        value={reenteredpass}
                        id="exampleInputPassword1" />
                    <div id="emailHelp" className="form-text text-danger">{passComment}</div>
                </div>
                <button type="submit" className="btn btn-primary ">Reset Password</button>
            </form>
        </div>
    )

   
}

export default ResetPassword;
