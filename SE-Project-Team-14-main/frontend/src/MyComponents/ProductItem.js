import React from "react"

function ProductItem(props) {
    let url = "/assets/images/" + props.imageUrl;
    return (
        <div className="d-flex justify-content-between">
            <div>
                <img className="card-img-top" alt="Product " src={url} style={{ width: "10rem", height: "10rem"}} />
            </div>
            <div>
            <div >{props.name}</div>
            </div>
            <div>
                <div >{props.discription}</div>
            </div>
            <div >
                <p>{props.price}</p>
            </div>
        </div>
    )
}

export default ProductItem