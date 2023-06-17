import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title: String,
    desc: String,
    price: Number,
    owner: String,
    images: Array,
    category: String,
    date: Date,
    onSale : {
        type : Boolean,
        default : true,
    }
});

const Product = mongoose.model('Product', productSchema);
export default Product;