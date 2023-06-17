import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Filters(props) {
    // var minPrice = 0, maxPrice = 100000;
    const [price, setPrice] = useState(props.maxPrice);
    const [rating, setRating] = useState(0);
    const [location, setLocation] = useState(new Set());

    // var a = ["delhi", "mumbai", "bengaluru"];
    // if(a.find((cities) => {
    //     return cities==="chennai";
    // }))
    //     console.log("found");
    // else
    //     console.log("not found!");

    function setFilters(e) {
        console.log("Price: ", price);
        console.log("Rating: ", rating);
        console.log("Location: ", location);
        props.setfilterLocation(location);
        props.setfilterPrice(price);
        props.setfilterRatings(rating);
        
        e.preventDefault();
    }

    return (
        <div className="container my-5">
            <div className="d-flex flex-column flex-shrink-0 p-3 rounded text-white bg-dark">
            <span className="fs-4 mb-3">Filters</span>
            <form onSubmit={setFilters}>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item bg-dark">
                    <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Price
                    </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                    <label for="customRange1" className="form-label row">
                        <div className="col-6">{props.minPrice}</div>
                        <div className="col-6 text-end">{Math.min(props.maxPrice, Math.max(props.minPrice, price))}</div>
                    </label>
                    <input type="range" defaultValue={props.maxPrice} min={props.minPrice} max={props.maxPrice} onChange = {(e) => {setPrice(e.target.value)}} className="w-100" id="customRange1"/>
                    </div>
                    </div>
                </div>
                <div className="accordion-item bg-dark">
                    <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Seller Rating
                    </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={(e) => {setRating(0)}} />
                                <label className="form-check-label" for="flexRadioDefault1">
                                    All
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={(e) => {setRating(4.5)}}/>
                                <label className="form-check-label" for="flexRadioDefault1">
                                    4.5 stars and above
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={(e) => {setRating(4)}}/>
                                <label className="form-check-label" for="flexRadioDefault1">
                                    4 stars and above
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={(e) => {setRating(3)}}/>
                                <label className="form-check-label" for="flexRadioDefault1">
                                    3 stars and above
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={(e) => {setRating(2)}}/>
                                <label className="form-check-label" for="flexRadioDefault1">
                                    2 stars and above
                                </label>
                            </div> 
                        </div>
                    </div>
                </div>
                <div className="accordion-item bg-dark">
                    <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Location
                    </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className="form-check">
                            <input className="form-check-input" type="checkbox" value=""
                            onChange={
                                (e) => {
                                    if(e.target.checked) {
                                        location.add("delhi");
                                        setLocation(location);
                                    }
                                    else {
                                        location.delete("delhi");
                                        setLocation(location);
                                    }
                                }
                                } id="brand1"/>
                            <label className="form-check-label" for="brand1">
                                Delhi
                            </label>
                            </div>
                            <div className="form-check">
                            <input className="form-check-input" type="checkbox" value=""
                            onChange={
                                (e) => {
                                    if(e.target.checked) {
                                        location.add("mumbai");
                                        setLocation(location);
                                    }
                                    else {
                                        location.delete("mumbai");
                                        setLocation(location);
                                    }
                                }
                                } id="brand2" />
                            <label className="form-check-label" for="brand2">
                                Mumbai
                            </label>
                            </div>
                            <div className="form-check">
                            <input className="form-check-input" type="checkbox" value=""
                            onChange={
                                (e) => {
                                    if(e.target.checked) {
                                        location.add("kolkata");
                                        setLocation(location);
                                    }
                                    else {
                                        location.delete("kolkata");
                                        setLocation(location);
                                    }
                                }
                                } id="brand3" />
                            <label className="form-check-label" for="brand3">
                                Kolkata
                            </label>
                            </div>
                            <div className="form-check">
                            <input className="form-check-input" type="checkbox" value=""
                            onChange={
                                (e) => {
                                    if(e.target.checked) {
                                        location.add("bengaluru");
                                        setLocation(location);
                                    }
                                    else {
                                        location.delete("bengaluru");
                                        setLocation(location);
                                    }
                                }
                                } id="brand4" />
                            <label className="form-check-label" for="brand4">
                                Bengaluru
                            </label>
                            </div>
                            <div className="form-check">
                            <input className="form-check-input" type="checkbox" value=""
                            onChange={
                                (e) => {
                                    if(e.target.checked) {
                                        location.add("chennai");
                                        setLocation(location);
                                    }
                                    else {
                                        location.delete("chennai");
                                        setLocation(location);
                                    }
                                }
                                } id="brand5" />
                            <label className="form-check-label" for="brand5">
                                Chennai
                            </label>
                            </div>
                        </div>
                    </div>
                    </div>
                    <hr />
                    <div className="text-center mt-3">
                        <button className="btn btn-success btn-small" type="submit" >Apply</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}
