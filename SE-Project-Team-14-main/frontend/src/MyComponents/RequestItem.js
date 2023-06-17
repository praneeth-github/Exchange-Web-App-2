import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

export default function RequestItem(props) {

    useEffect( ()=>{
            getProductDetails();
        }, [],
    );
    let [items, setItems] = useState([]);
    let [userDecision, setuserDecision] = useState("");
    function getProductDetails(){
        setuserDecision(props.item.decision);
        let url = 'http://localhost:5000/products/getRequestProduct?oid='+props.item._id;
        Axios.get(url, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        })
        .then((res)=>{
            console.log(res);
            setItems(res.data.result);
        }) 
    }
    function chooseDecision(decision){
        console.log(decision);
            Axios.post("http://localhost:5000/products/chooseDecision", {
                id: props.item._id,
                decision : decision,
            },{headers: {
                "x-access-token": localStorage.getItem("token"),
            }})
            .then((res)=>{
                console.log(res);                
            }) 
            setuserDecision(decision)
        
    }

    return (
        <div className="bg-white rounded mb-4">
            <div className="card">
                <div className="card-header">
                    Request from {props.item.buyer}
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Item Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                        { items.map((product)=>{
                            return <tr>
                               
                                <td>{product.title}</td>
                                <td>{product.desc}</td>
                                <td>{product.price}</td>
                            </tr>

                        }) }
                            
                        </tbody>
                    </table>
                    <div className="d-flex py-2 justify-content-between">
                        <div>
                            <Link to="#"><button onClick={() => {chooseDecision("accepted")}} className="btn btn-sm btn-success" disabled={userDecision !== "pending"}>{userDecision === 'pending'? 'Accept' : userDecision}</button></Link>
                        </div>
                        <div>
                            <Link to="#"><button onClick={() => {chooseDecision("rejected")}} className="btn btn-sm btn-danger"  disabled={userDecision !== "pending"}>{userDecision === 'pending'? 'Reject' : userDecision}</button></Link>
                        </div>
                    </div>



                </div>
            </div>
        </div>

    )
}
