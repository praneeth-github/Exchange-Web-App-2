import React, {useEffect, useState} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Axios from 'axios';



export default function EditProduct() {
    var history = useHistory();
    let location = useLocation();
    const [title, setTitle] = useState("");
    const [desc, setdesc] = useState("");
    const [price, setprice] = useState("");

    function saveChanges(e){
        let url = 'http://localhost:5000/products/saveProductChanges' ;
        Axios.post(url, {
            id : location.state._id,
            title : title === "" ? location.state.title : title,
            desc : desc === "" ? location.state.desc : desc,
            price : price === "" ? location.state.price : price,
        }, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        })
        .then((res)=>{
            console.log(res);
            if(res.status === 200) {
                alert("Changes made Successfully!");
                history.push("/");
            }
            else {
                alert("Some error occured! Try Again");
            }
        }) 
        e.preventDefault();
    }
    



    return (
        <div className="text-center container w-25 rounded bg-dark">
            <div className="form-signin my-5 p-3">
                <form onSubmit={saveChanges}>
                    <h1 className="h3 mb-4 pt-3 fw-normal text-white">Edit Product</h1>
                    <div className="form-floating mt-4">
                        <input type="itemTitle" className="form-control" onChange={(e) => {setTitle(e.target.value)}} defaultValue={location.state.title} placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Provide Title</label>
                    </div>
                    <div className="form-floating mt-4">
                        <input type="text" className="form-control" onChange={(e) => {setdesc(e.target.value)}} defaultValue={location.state.desc} placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Description</label>
                    </div>
                    <div className="form-floating mb-3 mt-4">
                        <input type='text' className="form-control" onChange={(e) => {setprice(e.target.value)}} defaultValue={location.state.price} placeholder="Price" />
                        <label htmlFor="floatingPrice">Price</label>
                    </div>
                    <div className="row">
                        <div className="col-6">
                        <button  className="mt-2 btn-success mb-4 btn btn-primary" type="submit">Save Changes</button>
                        </div>
                        <div className="col-6">
                        <Link to="/">
                        <button className="ms-3 mt-2 btn-danger mb-4 btn btn-primary" type="cancel">Cancel</button>
                        </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
