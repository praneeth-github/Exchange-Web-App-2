import React from 'react'

export default function FaqPage() {
    return (
        <div>
            <h1 className="text-center my-5">FAQs</h1>
            <div className="container mb-5">
                <ul class="list-group">
                {/* <li class="list-group-item list-group-item-warning fs-5">Q. Question</li>
                <li class="list-group-item list-group-item-info mb-4">Answer</li> */}
                <li class="list-group-item list-group-item-warning fs-5">Q. How to post an item for sale?</li>
                <li class="list-group-item list-group-item-info mb-4">Login to the website, then use Sell option on header to open the form, fill necessary details and click</li>
                <li class="list-group-item list-group-item-warning fs-5">Q. How to use Discussion Panel?</li>
                <li class="list-group-item list-group-item-info mb-4">The Discussion Panel is available /for all to see and post. You can create a post of your own by clicking on "Post" button on the panel. You can also reply on others post by clicking on "Reply" button and share your views</li>
                <li class="list-group-item list-group-item-warning fs-5">Q. How to negotiate with seller?</li>
                <li class="list-group-item list-group-item-info mb-4">There are two ways to talk to seller. 1. Go to the product page of Item and click on "Chat with Seller" 2. Go to the Chatbox and find the Seller name and text them.</li>
                <li class="list-group-item list-group-item-warning fs-5">Q. How to buy an item?</li>
                <li class="list-group-item list-group-item-info mb-4">Add desired items to your cart. All the products will be grouped according to the owner. Now click on "Make offer", this will send a request to the owner of the product to review the request. If the owner accepts the request then you will be able to proceed to payment. </li>
                <li class="list-group-item list-group-item-warning fs-5">Q. How to review the requests from the buyers?</li>
                <li class="list-group-item list-group-item-info mb-4">Go to Requests page, there you can see all the request from different buyers and the products that they want to buy from you. You can accept or reject the offer request.</li>
                <li class="list-group-item list-group-item-warning fs-5">Q. How to make payments?</li>
                <li class="list-group-item list-group-item-info mb-4">Once the seller has approved the request you can click on "Proceed to buy" in the cart section to make payments. You can choose from various modes of payments and also apply coupon code given by seller for a discount.</li>
                </ul>
            </div>
        </div>
    )
}