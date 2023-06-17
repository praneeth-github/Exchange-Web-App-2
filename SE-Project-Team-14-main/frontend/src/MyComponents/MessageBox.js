import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';


export default function MessageBox(props) {
    

    let [mess, setMess] = useState("");
    let [sender, setSender] = useState();
    let [messages, setMessages] = useState([]);
    let [errmsg, seterrmsg] = useState("");
    let [messagesFromDB, setMessagesFromDB] = useState([]);
    let [showcoup, setshowcoup] = useState(false);
    let [coup, setcoup] = useState("");
    let [firstTime, setFirstTime] = useState(true)

    let history = useHistory();
    function sendMessage(){
        let data = {
            author: props.user,
            mess : mess,
        }
        let room = props.sender._id;
        let socket = props.socket;
        let message = {
            sender : props.user,
            text : mess,
        }
        let update_messages = [...messages,message];
        setMessages(update_messages);
        setMess("");
        socket.emit("send_message", data, room);
        
    }
    useEffect( () => {
        getMessage(messages);
        console.log(firstTime);
        if(firstTime){
            getMessagesFromDB();
            setFirstTime(false);
        }
    }, [messages] );

    function getMessagesFromDB(){
        let url = "http://localhost:5000/chat/getMessagesFromDB?id=" + props.sender._id;
        Axios.get(url, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        })
        .then((res)=>{
            console.log(res);  
            setMessagesFromDB(res.data.result);        
        }) 
    }

    function getMessage(messages){
        setSender(props.sender);
        let socket = props.socket;
        socket.on("receive_message", (data) => {
            console.log(data);
            let message = {
                sender : props.user === props.sender.author1 ? props.sender.author2 : props.sender.author1,
                text : data.mess,
            }
            let update_messages = [...messages,message];
            setMessages(update_messages);
        })
    }

    function sendCoupon(){
        let data = {
            author: props.user,
            mess : coup,
        }
        let room = props.sender._id;
        let socket = props.socket;
        let message = {
            sender : props.user,
            text : coup,
        }
        let update_messages = [...messages,message];
        setMessages(update_messages);
        setMess("");
        socket.emit("send_message", data, room);
    }

    function createCoupon(){
        let sender = props.user === props.sender.author1 ? props.sender.author2 : props.sender.author1;
        let url = "http://localhost:5000/chat/provideDiscount?a1=" + sender;
        Axios.get(url, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        })
        .then((res)=>{
            console.log(res); 
            if(!res.data.auth){
                seterrmsg(res.data.msg);
            }else{
                let dis = res.data.result.discountCoupon;
                if(typeof(dis)!=='undefined'){
                    setshowcoup(true);
                    setcoup(res.data.result.discountCoupon["coupon"]);
                }else{
                    history.push({
                        pathname: '/generateCoupon',
                        state: res.data.result,
                      });
                }
                
            }       
        }) 
    }

    return (
        <div className="my-5 me-3">
            <div className="container">
                { sender ? <h2>{sender.author1 !== props.user ? sender.author1 : sender.author2}</h2>:<h2>Author</h2> }
            </div>
            <div className="container bg-light py-3 message-box overflow-auto">
            {  messagesFromDB.map((message) => {
                if(message.author !== props.user){
                    return  <h4 className="">{message.mess}</h4>
                }else{
                    return <h4 className="text-end my-3 ">{message.mess}</h4>
                }
            })}
            {messages.map((message) => {
                if(message.sender !== props.user){
                    return  <h4 className="">{message.text}</h4>
                }else{
                    return <h4 className="text-end my-3 ">{message.text}</h4>
                }
            })}
                {/* <h4 className="text-end my-3 ">Message1</h4>
                <h4 className="">Reply1</h4>
                <h4 className="text-end my-3 ">Message2</h4>
                <h4 className="">Reply2</h4> */}
            </div>
            <div className="row my-2 text-center">
                <div className="col-2">
                { showcoup ? (<button  onClick={sendCoupon} className="btn btn-sm my-1 px-3 btn-success">Send Coupon</button>) : 
                (<button type="submit" onClick={createCoupon} className="btn btn-sm my-1 px-3 btn-danger">Create Coupon</button>) }
                </div>
                <form className="col-8">
                    {/* <input  type="text" name="message" id="msg_1" placeholder="Type message here..." className="col-12"/> */}
                    <div className="input-group">
                    {/* <span className="input-group-text">With textarea</span> */}
                    <textarea className="form-control" onChange={(e)=>{ setMess(e.target.value) }} aria-label="With textarea"/>
                    </div>
                </form>
                <div className="col-2">
                <button type="submit" onClick={sendMessage} className="btn btn-lg my-1 px-4 btn-success">Send</button>
                
                </div>
                { errmsg !== "" ? <div className="alert alert-danger alert-dismissible fade show">
                        <strong>Error!</strong> {errmsg} </div> : <></> }
                
            </div>
        </div>
    )
}
