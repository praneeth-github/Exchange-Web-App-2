import Axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import DisplaySeller from "./DisplaySellers";

export default function Cart() {

    useEffect(()=>{
        getCartDetails();
    },[]);

    let [orders, setOrders] = useState([]);

    function getCartDetails(){
        Axios.get("http://localhost:5000/products/viewCart", {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                }
            })
            .then((res)=>{
                console.log("res is ",res.data.result);
                setOrders(res.data.result);
                console.log("ordrs are: ", orders)
            }) 
    }



    return (
        <div className="col my-5 container min-height">
            <h1 className="text-center fs-5"> <img src="/assets/images/cart.png" alt="Cart-logo"/></h1>
            
                    { orders.length === 0 ? <div className="text-center">
                                            <p className="fs-3">You haven't put any item in your cart yet!!</p>
                                            <p className="fs-4">To start shopping, Click <Link to="/">here</Link></p>
                                         </div> : 
                    <div className="Cart bg-primary rounded">
                        <div className="row m-2">
                        {
                        orders.map(function (d) {
                        return (
                            <div className="row p-3 rounded">
                                <DisplaySeller order={d} seller={d.seller}  status={d.decision} id={d._id} />
                            </div>
                        )
                    })}
                </div>
            </div>
                }
        </div>
    );

}