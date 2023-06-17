import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router';
import Axios from 'axios';

export default function ProductPageRight(props) {

    let [cartFlag, setCartFlag] = useState(false);
    let [user, setUser] = useState("");
   // let query = new URLSearchParams(useLocation().search);
    let history = useHistory();
    let base_dir = "/assets/images/";

    useEffect(()=>{
       checkCart();
    })
    function checkCart(){
        let url = 'http://localhost:5000/products/checkCart?id='+props.item._id+'&seller='+props.item.owner;
        Axios.get(url, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        })
            .then((res) => {
                setCartFlag(res.data.result);  
                setUser(res.data.current_user);              
            })
    }

    function addToCart() {
        
        let id = props.item._id;
        Axios.post("http://localhost:5000/products/addToCart", {
            id: id,
            
        },{headers: {
            "x-access-token": localStorage.getItem("token"),
        }})
        .then((res)=>{
            console.log(res);
        }) 
        setCartFlag(!cartFlag);
      
        
    }

    function createChat(){
        
        let id = props.item._id;
        Axios.post("http://localhost:5000/chat/createChat", {
            id: id,
        },{headers: {
            "x-access-token": localStorage.getItem("token"),
        }})
        .then((res)=>{
            console.log(res);
            history.push("/chatbox");                 
        }) 
        
    }

    return (
        <div>
            <div className="container">
                <div className="mb-5">
                    <h3>All Photos</h3>
                    <div className="row my-3 ">
                        {
                            props.item.images.map((image) => {
                                return (<img src={base_dir + image} alt="..." className="col-6 my-1" height="100px" onClick={(e) => {props.setImage(image)}} />)
                            })
                        }
                        
                        {/*<img src={base_dir + props.images[0]} alt="..." className="col-4 my-1 grid-image" />
                         <img src="/assets/images/iphone8-front.jpg" alt="..." className="col-4 my-1 grid-image" />
                        <img src="/assets/images/iphone-8-back.jpg" alt="..." className="col-4 my-1 grid-image" />
                        <img src="/assets/images/iphone8_1.jpg" alt="..." className="col-4 my-1 grid-image" />
                        <img src="/assets/images/phone1.jpg" alt="..." className="col-4 my-1 grid-image" />
                        <img src="/assets/images/phone2.jpg" alt="..." className="col-4 my-1 grid-image" />
                        <img src="/assets/images/phone3.jpg" alt="..." className="col-4 my-1 grid-image" />
                        <img src="/assets/images/phone4.jpg" alt="..." className="col-4 my-1 grid-image" /> */}
                    </div>
                </div>
                <hr />
                <div className="container text-center">
                    <div>
                        <Link to="/chatbox">
                        { user !== props.item.owner ?  
                        <button className="btn btn-primary mx-5 my-3 px-5 py-2" onClick={createChat}>Chat With Seller</button> :
                        <button className="btn btn-primary mx-5 my-3 px-5 py-2" disabled>Chat With Seller</button> }
                       
                        </Link>
                    </div>
                    <div>
                    { user !== props.item.owner ? (!cartFlag ? 
                        <button className="btn btn-success mx-5 my-3 px-5 py-2" onClick={addToCart}>Add to Cart</button>
                        :  
                        <button className="btn btn-success mx-5 my-3 px-5 py-2" disabled>Added to Cart</button>) : 
                        (<button className="btn btn-success mx-5 my-3 px-5 py-2" disabled>Add to Cart</button>) }
                    {/* { !cartFlag ? 
                        <button className="btn btn-success mx-5 my-3 px-5 py-2" onClick={addToCart}>Add to Cart</button>
                        :  
                        <button className="btn btn-success mx-5 my-3 px-5 py-2" disabled>Added to Cart</button>
                         } */}
                        
                    </div>
                </div>
                <hr />
            </div>
        </div>
    )
}
