import mongoose from "mongoose";

const invoiceSchema = mongoose.Schema({
    buyer: String,
    seller: String,
    receipts: Array,    
});

const Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice;