import React, { useState } from 'react'
import { button } from 'react-router-dom'

export default function Categories(props) {
    // var myStyles = {
    //     width: "20%",
    // }

    // const [category, setcategory] = useState("");


    return (
        <div className="container">

            <div className="d-flex flex-column rounded flex-shrink-0 p-3 text-white bg-dark">

                <label className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4">Categories</span>
                </label>
                <hr/>
                <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <button className="nav-link text-white" onClick={(e)=>{props.setcategory("")}}>

                    All
                    </button>
                </li>
                <li className="nav-item">
                    <button className="nav-link text-white" onClick={(e)=>{props.setcategory("Electronics")}}>

                    Electronics
                    </button>
                </li>
                <li>

                    <button className="nav-link text-white" onClick={(e)=>{props.setcategory("Books")}}>

                    Books
                    </button>
                </li>
                <li>

                    <button className="nav-link text-white" onClick={(e)=>{props.setcategory("Fashion")}}>

                    Fashion
                    </button>
                </li>
                <li>
                    <button className="nav-link text-white" onClick={(e)=>{props.setcategory("Furniture")}}>
                    
                    Furniture
                    </button>
                </li>
                <li>
                    <button className="nav-link text-white" onClick={(e)=>{props.setcategory("Automobiles")}}>
                    
                    Automobiles
                    </button>
                </li>
                </ul>
                <hr/>
            </div>
        </div>
    )
}
