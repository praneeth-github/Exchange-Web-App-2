import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Item() {

    useEffect( () => {
        getOwnItems();
    },[] )

    let [items, setItems] = useState([]);

    function getOwnItems(){
        Axios.get('http://localhost:5000/products/getOwnItems', {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        })
        .then((res)=>{
            let returned_items = res.data.result;
            setItems(returned_items);
            console.log(returned_items);
        }) 
    }
    // function editProduct(id){
    //     let url = 'http://localhost:5000/products/getOwnItems?id=' +id;
    //     Axios.get(url, {
    //         headers: {
    //             "x-access-token": localStorage.getItem("token"),
    //         }
    //     }) 
    //     .then((res)=>{
    //         console.log(res);
    //     }) 

    // }

    return (
        <div>
            <div className="album rounded bg-light">
                <div className="container p-3">

                    
                     {items.length===0 ? <div className="text-center">
                                            <p className="fs-3">You haven't put any item for selling yet!!</p>
                                            <p className="fs-4">To start selling, Click <Link to="/sell">here</Link></p>
                                         </div> :
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                      {items.map((item)=>{
                         let url = "/assets/images/" + item.images[0];
                        return <div className="col">
                            <Link to="#" className="text-decoration-none text-dark">
                            <div className="card shadow-sm ">
                                <img src={url} alt="item" className="card-image"/>

                                <div className="card-body">
                                    <p className="card-text">{ item.desc }</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <Link to={{pathname : "/editProduct", state : item}} type="button"  className="btn btn-sm btn-outline-secondary">Edit</Link>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </div>
                     }) }
                     </div>
                    }
                </div>
            </div>
        </div>
    )
}
