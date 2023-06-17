import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import ChatList from './ChatList'
import MessageBox from './MessageBox'

export default function ChatBox(props) {

    let [username, setUsername] = useState("");
    let [chatList, setChatList] = useState([]);
    let [choosenChat, setChoosenChat] = useState({});
    let [showBox, setShowBox] = useState(false);
    useEffect(()=>{
        getChatList();
        console.log(choosenChat);
    },[])

    function getChatList(){
        Axios.get("http://localhost:5000/chat/getChatList", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        })
        .then((res)=>{
            console.log(res);  
            setUsername(res.data.current_user);    
            setChatList(res.data.result);          
        }) 
    }

    function chatChoose(chat){
        console.log(chat);
        setChoosenChat(chat);
        setShowBox(!showBox);
    }

    return (
        <div>
            <h1 className="text-center my-5">Chat Box</h1>
            <div className="container my-5 body-background">
                <div className="row shadow-md">
                    <div className="col-5" >
                        <ChatList socket={props.socket} chatList={chatList} user={username} setChat={chatChoose}/>
                    </div>
                    <div className="col-7">
                    {showBox ? <MessageBox socket={props.socket} sender={choosenChat} user={username} /> : <></>}
                        
                    </div>
                </div>
            </div>
        {/* <div className="container">
            <div className="row chat-window col-xs-5 col-md-3" id="chat_window_1">
                <div className="col-xs-12 col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-heading top-bar">
                            <div className="col-md-8 col-xs-8">
                                <h3 className="panel-title"><span className="glyphicon glyphicon-comment"></span> Chat - Miguel</h3>
                            </div>
                            <div className="col-md-4 col-xs-4">
                                <Link to="#"><span id="minim_chat_window" className="glyphicon glyphicon-minus icon_minim"></span></Link>
                                <Link to="#"><span className="glyphicon glyphicon-remove icon_close" data-id="chat_window_1"></span></Link>
                            </div>
                        </div>
                        <div className="panel-body msg_container_base">
                            <div className="row msg_container base_sent">
                                <div className="col-md-10 col-xs-10">
                                    <div className="messages msg_sent">
                                        <p>that mongodb thing looks good, huh?
                                        tiny master db, and huge document store</p>
                                        <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
                                    </div>
                                </div>
                                <div className="col-md-2 col-xs-2 avatar">
                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" className=" img-responsive "/>
                                </div>
                            </div>
                            <div className="row msg_container base_receive">
                                <div className="col-md-2 col-xs-2 avatar">
                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" className=" img-responsive "/>
                                </div>
                                <div className="col-md-10 col-xs-10">
                                    <div className="messages msg_receive">
                                        <p>that mongodb thing looks good, huh?
                                        tiny master db, and huge document store</p>
                                        <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
                                    </div>
                                </div>
                            </div>
                            <div className="row msg_container base_receive">
                                <div className="col-md-2 col-xs-2 avatar">
                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" className=" img-responsive "/>
                                </div>
                                <div className="col-xs-10 col-md-10">
                                    <div className="messages msg_receive">
                                        <p>that mongodb thing looks good, huh?
                                        tiny master db, and huge document store</p>
                                        <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
                                    </div>
                                </div>
                            </div>
                            <div className="row msg_container base_sent">
                                <div className="col-xs-10 col-md-10">
                                    <div className="messages msg_sent">
                                        <p>that mongodb thing looks good, huh?
                                        tiny master db, and huge document store</p>
                                        <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
                                    </div>
                                </div>
                                <div className="col-md-2 col-xs-2 avatar">
                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" className=" img-responsive "/>
                                </div>
                            </div>
                            <div className="row msg_container base_receive">
                                <div className="col-md-2 col-xs-2 avatar">
                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" className=" img-responsive "/>
                                </div>
                                <div className="col-xs-10 col-md-10">
                                    <div className="messages msg_receive">
                                        <p>that mongodb thing looks good, huh?
                                        tiny master db, and huge document store</p>
                                        <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
                                    </div>
                                </div>
                            </div>
                            <div className="row msg_container base_sent">
                                <div className="col-md-10 col-xs-10 ">
                                    <div className="messages msg_sent">
                                        <p>that mongodb thing looks good, huh?
                                        tiny master db, and huge document store</p>
                                        <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
                                    </div>
                                </div>
                                <div className="col-md-2 col-xs-2 avatar">
                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" className=" img-responsive "/>
                                </div>
                            </div>
                        </div>
                        <div className="panel-footer">
                            <div className="input-group">
                                <input id="btn-input" type="text" className="form-control input-sm chat_input" placeholder="Write your message here..." />
                                <span className="input-group-btn">
                                <button className="btn btn-primary btn-sm" id="btn-chat">Send</button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="btn-group dropup">
                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                    <span className="glyphicon glyphicon-cog"></span>
                    <span className="sr-only">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu" role="menu">
                    <li><Link to="#" id="new_chat"><span className="glyphicon glyphicon-plus"></span> Novo</Link></li>
                    <li><Link to="#"><span className="glyphicon glyphicon-list"></span> Ver outras</Link></li>
                    <li><Link to="#"><span className="glyphicon glyphicon-remove"></span> Fechar Tudo</Link></li>
                    <li className="divider"></li>
                    <li><Link to="#"><span className="glyphicon glyphicon-eye-close"></span> Invisivel</Link></li>
                </ul>
            </div>
        </div> */}

        </div>
    )
}
