import  Axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';

export default function ProductPageLeft(props) {

    // let query = new URLSearchParams(useLocation().search);
    let base_dir = "/assets/images/";

    // useEffect(()=>{
    //     getDataDB();
    // },[]);

    // let [item, setItems] = useState([]);
    // let [imageNames, setImageNames] = useState([]);

    // function getDataDB(){
    //     let url = 'http://localhost:5000/products/getProductData?' + "id=" +  query.get("id");
    //     Axios.get(url, {
    //         headers: {
    //             "x-access-token": localStorage.getItem("token"),
    //         }
    //     })
    //     .then((res)=>{
    //         console.log(res.data.result);
    //         setItems(res.data.result);
    //         // let url = "/assets/images/"+res.data.result.images[0];
    //         setImageNames(res.data.result.images);
    //     }) 
    // }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <h3 className="col-6">{props.item.title}</h3>
                    <h3 className="col-6 text-end">Seller: {props.item.owner}</h3>
                </div>
                <div className="bg-dark text-center my-3">
                    <img src={base_dir + props.image} height="400px" alt="..."/>
                </div>
                <div>
                    <h2>Price: ₹ {props.item.price}</h2>
                </div>
                <hr />
                <div>
                    <h2 className="my-3">Description:</h2>
                    <div className="container">
                        <p className="fs-4">{props.item.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
