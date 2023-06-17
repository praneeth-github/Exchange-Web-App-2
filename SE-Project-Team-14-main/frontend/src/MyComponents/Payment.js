import PaymentOption from "./PaymentOption";
import { Link } from "react-router-dom";

function Payment() {
  return (
    <div className="m-5">
      <p className="fs-2">Payment</p>
      <p className="mx-5">choose the payment option</p>
      <div className="d-sm-flex justify-content-center flex-wrap my-5">
        
        <PaymentOption title="Debit Card" goto="debitcard" />
        <PaymentOption title="Credit Card" goto="creditcard" />
        <PaymentOption title="Internet Banking" goto="internetbanking" />
        <PaymentOption title="UPI" goto="upi" />
      </div>
      <div className="d-flex justify-content-between">
        <Link
          className="fs-6 bg-primary text-white px-3  py-2 rounded-pill text-decoration-none"
          to="/cart"
        >
          <i class="bi bi-arrow-left"></i>
          Back to cart
        </Link>
        {/* <Link
          className="fs-6  text-white bg-success px-5 py-2 rounded-pill text-decoration-none"
          to="/checkout"
        >
          Proceed
        </Link> */}
      </div>
    </div>
  );
}

export default Payment;
