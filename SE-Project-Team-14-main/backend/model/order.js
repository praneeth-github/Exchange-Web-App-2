import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    buyer: String,
    seller: String,
    items: Array,
    decision : {
        type : String,
        default : "Request",
    },
    discountCoupon : Object,
});

const Order = mongoose.model('Order', orderSchema);
export default Order;