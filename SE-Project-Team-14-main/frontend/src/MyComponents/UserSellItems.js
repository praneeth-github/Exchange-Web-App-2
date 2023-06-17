import React from 'react'
import Item from './Item'

export default function UserSellItems() {
    return (
        <div className="container rounded bg-dark pt-3">
            <div >
                <h2 className="container row text-white">My Items</h2>
                <br/>
                <Item/>
                <br/>
                
            </div>
        </div>
    )
}