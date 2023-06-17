import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import files from "./../../../backend/public/uploads";

export default function PrevOrders() {

    

    useEffect(()=>{
        getPrevOrders();
    },[]);
    let [orders, setOrders] = useState([]);

    function getPrevOrders(){
        Axios.get("http://localhost:5000/profile/getPrevOrders", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        })
        .then((res)=>{
            console.log(res);
            setOrders(res.data.result);
        }) 
    }

    function openPDF(id){
        // let fileName = files + id + ".pdf";
        // window.open(fileName);
        let url = "http://localhost:5000/products/viewPDF?oid="+id;
        Axios.get(url, {
            responseType: "blob",
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        })
        .then((res)=>{
            console.log(res);
            const file = new Blob([res.data], { type: "application/pdf" });
              const fileURL = URL.createObjectURL(file);
              window.open(fileURL);
        }) 
        .catch((err)=>{
            console.log(err);
        })

    }

    return (
        <div className="container rounded mt-5 bg-dark py-3">
            <div>
                <h2 className="container row text-white mb-3">Order Archives</h2>
                <div className="container text-white">
                { orders.map((order)=>{
                    let link = "./../../../backend/public/uploads/"+order.orderID+".pdf";
                    return <div className="row my-2">
                        <div className="col order-first">
                            Transaction ID: {order.orderID} 
                        </div>
                        <div className="col order-last">
                            <Link to="#" onClick={() => {openPDF(order.orderID)}} className="text-white" > Download receipt </Link>
                        </div>
                    </div>
                }) }
                    
                    {/* <div className="row my-2">
                        <div className="col order-first">
                            Order no. 2321
                        </div>
                        <div className="col">
                            Date - 00/00/0000
                        </div>
                        <div className="col order-last">
                            <Link to="#" className="text-white"> Download receipt </Link>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="col order-first">
                            Order no. 3111
                        </div>
                        <div className="col">
                            Date - 00/00/0000
                        </div>
                        <div className="col order-last">
                            <Link to="#" className="text-white"> Download receipt </Link>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}