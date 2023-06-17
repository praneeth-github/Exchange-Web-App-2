import React, {useEffect, useState} from 'react'
import { Link, useHistory, useLocation } from "react-router-dom";
import Axios from "axios";

export default function Coupon() {
    let history = useHistory();
    const location = useLocation();
    const [coupon, setCoupon] = useState("");
    const [price, setprice] = useState("");
    let [oid, setoid] = useState(()=>{
        return location.state._id;
    });
    let [genCoup, setgencoup] = useState(false);
    const login = (e) => {
        Axios.post("http://localhost:5000/chat/createCoupon", {
            oid : oid,
            coupon : coupon,
            price : price,
        }, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        })
        .then((res)=>{
            console.log(res);
            history.push("/chatbox");
            // if(res.data.auth){
            //     localStorage.setItem("token", res.data.token);
            //     history.push('/');
            //     window.location.reload();
            // }else{
            //     seterrmsg(res.data.msg);
            // }
        }) 
        e.preventDefault();       
    };

    function generateCoupon(e){
        
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 6; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
        }
        setCoupon(result);
        setgencoup(true);
        e.preventDefault();
    }

    return (
        <div className="text-center container w-25 rounded bg-dark">
            <div className="form-signin my-5 p-3">
                <form onSubmit={login}>
                    <h1 className="h3 pt-3 mb-5 fw-normal text-white">Provide Discount</h1>
                    <div className="form-floating">
                        <input 
                        type="text" 
                        className="form-control" id="floatingInput"
                        placeholder="name@example.com" value={oid}  disabled/>
                        <label htmlFor="floatingInput">Order ID : </label>
                    </div>
                    <div className="form-floating mt-5">
                        <input type="text" 
                        className="form-control" 
                        id="floatingPassword"
                        placeholder="Password" value={location.state.buyer} disabled/>
                        <label htmlFor="floatingPassword">To Buyer : </label>
                    </div>
                    <div className="form-floating mt-5">
                        <input type="text" 
                        className="form-control" 
                        id="floatingPassword"
                        onChange={(e)=> {
                            setprice(e.target.value);
                        }} 
                        placeholder="Password" />
                        <label htmlFor="floatingPassword">Final Value : </label>
                    </div>
                    { genCoup ? (<div className="form-floating mt-5">
                        <input type="text" 
                        className="form-control" 
                        id="floatingPassword"
                        placeholder="Password" value={coupon} disabled/>
                        <label htmlFor="floatingPassword">Coupon : </label>
                    </div>) : (<></>)}
                    <button className="w-50 mt-5 mb-5 btn btn-warning"  onClick={generateCoupon} >Generate Coupon</button>
                    <button className="w-50 mt-5 mb-5 btn btn-primary" type="submit" disabled={!genCoup}>Add Coupon</button>
                </form>
            </div>
        </div>

    );
}
