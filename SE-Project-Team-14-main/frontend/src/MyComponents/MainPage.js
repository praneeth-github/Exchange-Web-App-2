import React, { useState } from 'react'
import ProductList from './ProductList'
import Categories from './Categories'
import Filters from './Filters'
import Sliders from './Sliders'

export default function MainPage(props) {
	let [minPrice, setminPrice] = useState(0);
	let [maxPrice, setmaxPrice] = useState(100000000);
	const [filterPrice, setfilterPrice] = useState(0);
	const [filterRatings, setfilterRatings] = useState(0);
	const [filterLocation, setfilterLocation] = useState(new Set());
	const [category, setcategory] = useState("");
    return (
        <div>
            <div className="container-fluid py-5">
					<div className="row">
						<div className="col-3 sticky-sm-top">
      
							<Categories setcategory = {setcategory} />
							<Filters setfilterPrice = {setfilterPrice} setfilterRatings = {setfilterRatings}
							setfilterLocation = {setfilterLocation} minPrice = {minPrice} maxPrice = {maxPrice} />
						</div>
						<div className="col-9">
							<Sliders />
							<ProductList category = {category} searchText = {props.searchText} filterPrice = {filterPrice}
							 filterRatings = {filterRatings} filterLocation = {filterLocation} setmaxPrice = {setmaxPrice}
							 setminPrice = {setminPrice} />
						</div>
					</div>
				</div>
        </div>
    )
}
