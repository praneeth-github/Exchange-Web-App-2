import React, { useEffect, useState } from 'react'
import RequestItem from './RequestItem'
import Axios from 'axios';

export default function RequestPage() {
    useEffect( ()=>{
            getRequests();
        }, [],
    );
    let [requests, setRequests] = useState([]);
    function getRequests(){
        Axios.get("http://localhost:5000/products/getRequests", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        })
        .then((res)=>{
            console.log(res);
            setRequests(res.data.result);
        }) 
    }
    return (
        <div className="min-height my-5">
        <h1 className="text-center mb-5">Your Requests</h1>
        { requests.length === 0 ? <div className="text-center">
                                        <p className="fs-3">You don't have any requests yet!!</p>
                                        <p className="fs-4">Please wait for users to request your items</p>
                                    </div> : 
        <div className="container py-4 bg-dark rounded">
        { requests.map((item) => {
            return (
                <RequestItem item={item}/>
            );
        }) }
        </div>
        }
        </div>
    )
}
