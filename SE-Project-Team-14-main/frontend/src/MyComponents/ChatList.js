import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ChatList(props) {
    
    let chatList = props.chatList;

    function joinRoom(room,author){
        let socket = props.socket;
        socket.emit("join_room",room,author);
    }

    return (
        <div className="container-fluid my-5">
            <h2>Chats</h2>
            <div className="list-group contacts overflow-auto">
            {chatList.map((chat) =>{
                let author = chat.author1 === props.user ? chat.author2 : chat.author1;
                return <Link to="#" onClick={() => {props.setChat(chat)}} className="list-group-item list-group-item-action" >
                    <div className="d-flex w-100 justify-content-between" onClick={() => {joinRoom(chat._id,author)}}>
                    <h5  className="mb-2">{author}</h5>
                    <small></small>
                    </div>
                    <p className="ms-2 mb-1">Tap to chat</p>
                </Link>
            })}

            </div>
        </div>
    )
}
