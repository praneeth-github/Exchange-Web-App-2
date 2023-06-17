import React from 'react'
import UserDetails from './UserDetails'
import UserSellItems from './UserSellItems'
import PrevOrders from './PrevOrders'

export default function ProfilePage() {
    return (
        <>
            <div className="container-fluid py-5">
                <div className="row">
                    <div className="col-3">
                        <UserDetails/>
                    </div>
                    <div className="col-9">
                        <UserSellItems />
                        <PrevOrders />
                    </div>
                </div>
            </div>
        </>
    )
}