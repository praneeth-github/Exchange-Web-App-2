import {Link} from 'react-router-dom'
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


function Upi() {
    // get the state data
  const location = useLocation();
  let props = location.state.data;
  location.state.method="UPI"

  // items state 
  let [items, setItems] = useState([]);

  function GetItems() {
    setItems(props);
  }

  useEffect(() => {
    GetItems();
  }, []);

  console.log("data is: ", items)
  console.log("UPI State: ", location.state)

    return (
        <div className="conainer px-5 my-5 min-height">
            <h4 className="text-left lg">Payment</h4>
            <h2 className="text-center fw-bold">Enter UPI Details</h2>
            <div className="px-5">

                <div className="row my-3">
                    <div className="d-flex justify-content-center">

                        <div class="form-group w-50 center py-5">
                            <label for="exampleInputEmail1">UPI ID</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="johndev@axisbank" />

                        </div>
                    </div>
                   
                </div>
                
            </div>
            <div class="d-flex justify-content-between">
                <Link className="fs-6 bg-primary text-dark px-5 py-2 rounded-pill text-decoration-none" to="/cart">Back to cart</Link>
                <Link
          className="fs-6  text-white bg-success px-5 py-2 rounded-pill text-decoration-none"
          to={{
            pathname: "/paymentsuccess",
            state: location.state,
          }}
        >
          Proceed
        </Link>
            </div>

        </div>
    );
}

export default Upi