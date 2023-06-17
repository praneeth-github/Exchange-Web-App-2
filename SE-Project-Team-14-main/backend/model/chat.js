import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    author1: String,
    author2: String,
    chats: Array,
    
});

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;