import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";

function PaymentSuccess() {
  const [rating, setRating] = useState("3");
  // get the state data
  const location = useLocation();
  let history = useHistory();
  let props = location.state.data;

  // items state
  let [items, setItems] = useState([]);
  let [url, seturl] = useState("");
  let [firstTime, setFirstTime] = useState(true);
  let [file, setfile] = useState(false);

  function GetItems() {
    console.log(location.state);
    setItems(props);
    let link = "./../../../backend/public/uploads/" + location.state.order._id + ".pdf";
    seturl(link);
  }

  useEffect(() => {
    GetItems();
    if (firstTime) {
      setFirstTime(false)
      orderSuccess();
    }
  }, []);

  function orderSuccess() {
    let url = 'http://localhost:5000/products/orderSuccess';
    Axios.post(url, {
      order: location.state.order,
      total: location.state.total,
      disprice: location.state.discountTotal,
      method: location.state.method,
    }, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      }
    })
      .then((res) => {
        console.log(res);
      })
  }

  async function generatePDF() {
    let url = 'http://localhost:5000/products/generatePDF';

    await Axios.post(url, {
      order: location.state.order,
      total: location.state.total,
      disprice: location.state.discountTotal,
      method: location.state.method,
      items: items,
    }, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      }
    })
      .then((res) => {
        history.push("/");

        // const file = new Blob([res.data.result.data], { type: "application/pdf" });
        // const fileURL = URL.createObjectURL(file);
        // const pdfWindow = window.open();
        // pdfWindow.location.href = fileURL;             

        console.log(res);

      })

  }

  // function viewPDF(){
  //   let url = 'http://localhost:5000/products/viewPDF?oid='+location.state.order._id;
  //   Axios.get(
  //     url, 
  //     {responseType: 'blob',
  //       headers: {
  //         "x-access-token": localStorage.getItem("token"),
  //     }
  //   } // !!!
  //   ).then((response) => {
  //     window.open(URL.createObjectURL(response.data));
  //   })
  // }

  console.log("data is: ", items);
  console.log("state is; ", location.state);

  let mystyle = {
    "max-width": "50rem",
  };

  return (
    <div className="min-height my-5">
      <div class="card border-dark mx-auto my-5" style={mystyle}>
        <div class="card-header fs-2 text-success text-center">
          Payment Successful <i class="bi bi-check-circle"></i>
        </div>
        <div class="col p-3 mt-5">


          <div className="d-flex justify-content-between">
            <p className="text">Seller</p>
            <p className="text">{location.state.data[0].owner}</p>
          </div>
          <p className="text-secondary fw-bold">Products</p>




          {items.map(function (d) {
            return (

              <div className="d-flex justify-content-between">
                <p className="text">{d.title}</p>
                <p className="text">{d.price}</p>
              </div>

            );
          })}
          <div className="d-flex justify-content-between">
            <p className="text fw-bold">Amount</p>
            <p className="text fw-bold">{location.state.total}</p>
          </div>
          {location.state.discountTotal !== '' ? (<div className="d-flex justify-content-between">
            <p className="text fw-bold">Discount Amount</p>
            <p className="text fw-bold">{location.state.discountTotal}</p>
          </div>) : (<></>)}


          <div className="d-flex justify-content-between">
            <p className="text">Payment Type</p>
            <p className="text">{location.state.method}</p>
          </div>

          <div className="d-flex justify-content-between">
            <p className="text">Transaction ID</p>
            <p className="text">{location.state.order._id}</p>
          </div>
          <div className="row">
            <div className="col-9"><p> Rate the seller </p> </div>
            <div className="col-3">
              <div className="dropdown">
                <button className="btn w-100 btn-info dropdown-toggle" type="button" id="ratingbutton" data-bs-toggle="dropdown" aria-expanded="false">
                  {rating === "" ? "Choose rating" : "Rating: " + rating}
                </button>
                <ul className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton1">
                  <li><div className="dropdown-item" onClick={() => { setRating("1") }} >1</div></li>
                  <li><div className="dropdown-item" onClick={() => { setRating("2") }} >2</div></li>
                  <li><div className="dropdown-item" onClick={() => { setRating("3") }} >3</div></li>
                  <li><div className="dropdown-item" onClick={() => { setRating("4") }} >4</div></li>
                  <li><div className="dropdown-item" onClick={() => { setRating("5") }} >5</div></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col p-3 mt-5">
          <div className="d-flex justify-content-between">

            <Link
              className="fs-6 bg-primary text-white px-5 py-2 rounded-pill text-decoration-none"
              onClick={generatePDF}
              to="/"
            >
              Generate Invoice{" "}
              <i class="bi bi-file-earmark-arrow-down-fill"></i>
            </Link>

            <Link
              className="fs-6  text-white bg-success px-5 py-2 rounded-pill text-decoration-none"
              to="/"
            >
              Continue Shopping <i class="bi bi-bag"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
