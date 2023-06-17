import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import Axios from "axios";



const app = express();

app.use(cors());

let rooms = new Map();
let room_messages = new Map();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {
   // socket.join("123");
    socket.on("join_room", async (data,user) => {
        // const sockets = await io.in(data).fetchSockets().then((clients) =>{
        //     console.log(clients.length);
        //     io.to(data).emit("check_users", clients.length);
        //     let chats = room_messages.get(data);
        //     if(clients.length === 1 && typeof(chats)!=='undefined'){
        //         sendMessagesToDB(data, chats);    
        //         room_messages.set(room,[]);
        //     }
        // });
        socket.join(data);
        rooms.set(socket.id,data);
        if(!room_messages.has(data))
        room_messages.set(data,[]);
        
        
       // socket.to(data).emit("receive_message", "User joined");
        
        console.log(`User ${socket.id} connected at room ${data}`);
    })
    socket.on("send_message", async (data, room) => {
        console.log(data);
        let temp = room_messages.get(room);
        if(room_messages.has(room)){
            temp.push(data);
        }else{
            temp = [];
            temp.push(data);
        }
        room_messages.set(room,temp);
        //testing
        const sockets = await io.in(room).fetchSockets().then(async (clients) =>{
            console.log(clients.length);
            io.to(room).emit("check_users", clients.length);
            let chats = room_messages.get(room);
            if(clients.length === 1 && typeof(chats)!=='undefined'){
                console.log('Messages added to DB 1');
                sendMessagesToDB(room, chats)  
                room_messages.set(room,[]);   
            }
            console.log(room_messages.get(room));
            socket.to(room).emit("receive_message", data);
        });
        //testing
        
    })
    
    socket.on("disconnect", async () => {
        console.log("User Disconnected", socket.id);
        let room_needed = rooms.get(socket.id);
        console.log(`${socket.id} left the room ${room_needed}`);
        rooms.delete(socket.id);
        socket.leave(room_needed);
        const sockets = await io.in(room_needed).fetchSockets().then(async (clients) =>{
            console.log(clients.length);
            io.to(room_needed).emit("check_users", clients.length);
            let chats = room_messages.get(room_needed);
            if(clients.length === 0 && typeof(chats)!=='undefined'){
                console.log('Messages added to DB 2');
                sendMessagesToDB(room_needed, chats)  
                room_messages.set(room_needed,[]);   
            }
        });

        
    })
})

function sendMessagesToDB(room_needed, chats){
    console.log('Messages added to DB');
    Axios.post("http://localhost:5000/chat/addChats", {
        id: room_needed,
        chats : chats,
    })
    .then((res)=>{
        console.log(res);
        console.log('confirm Messages added to DB');                
    }) 

}

server.listen(3001, () =>{
    console.log("Socket Server running at port 3001");
})
