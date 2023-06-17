import Product from "../model/products.js";
import Chat from "../model/chat.js";
import User from "../model/users.js";
import Order from "../model/order.js";
import pkg from 'bson';
const { ObjectId } = pkg;
//import { ObjectId } from "bson";

export let createChat = async (req,res) => {
    try {
        let pid = req.body.id;
        Product.findById(pid, (err,item) => {
            if(err){
                console.log(err);
            }else{
                let seller = item.owner;
                let id = req.user;
                User.findById(id, (err,user) => {
                    if(err){
                        console.log(err);
                    }else{
                        let buyer = user.username;
                        Chat.findOne({ $or: [{author1:seller, author2:buyer},{author1:buyer, author2:seller}]}, (err,chat) =>{
                            if(err){
                                console.log(err);
                            }else if(chat){
                                return res.status(201).json({auth:true, result: chat});

                            }else{
                                let new_chat = new Chat({
                                    author1: buyer,
                                    author2: seller,
                                });
                                new_chat.save();
                                return res.status(201).json({auth:true, result: new_chat});
                            }
                        })
                    }
                });
                
            }
        }) 

    } catch (error) {
        console.log(error);
        
    }
}

export let getChatList = async (req,res) => {
    try {
        
        let id = req.user;
        User.findById(id, (err,user)=>{
            if(err){
                console.log(err);
            }else{
                Chat.find({$or:[{author1:user.username},{author2: user.username}]}, (err,results) => {
                    if(err){
                        console.log(err);
                    }else{
                        return res.status(201).json({auth:true, result: results, current_user: user.username});
                    }
                })
            }
        })

    } catch (error) {
        console.log(error);
    }
}

export let addChats = async (req,res) => {
    try {
        let id = req.body.id;
        let chats = req.body.chats; 
        if(!Array.isArray(chats)){
            Chat.findById(id,(err,item) => {
                if(err){
                    console.log(err);
                }else{
                    item.chats.push(chats);
                    item.save();
                    return res.status(201).json({auth:true, result: item});
                }
            })
        }else{
            Chat.updateOne({ "_id": ObjectId(id),
              }, {
                $push: {
                  chats: { $each : chats }
                }
              }, (err,res) => {
                  if(err){
                      console.log(err);
                  }else{
                      console.log(res);
                  }
              })
              console.log(req.user);

        }

        
        //Chat.findByIdAndUpdate(id, {})
    } catch (error) {
        console.log(error);        
    }
}

export let getMessagesFromDB = async (req,res) => {
    try {
        
        let id = req.query.id;
        Chat.findById(id, (err,item)=>{
            if(err){
                console.log(err);
            }else{
                return res.status(201).json({auth:true, result: item.chats});
            }
        })

    } catch (error) {
        console.log(error);        
    }
}

export let provideDiscount = async (req,res) => {
    try {

        let id = req.user;
        User.findById(id,(err,user)=>{
            if(err){
                console.log(err);
            }else{
                let seller = user.username;
                let buyer = req.query.a1;
                console.log(seller, buyer);
                Order.findOne({seller : seller, buyer : buyer}, (err,found) => {
                    if(err){
                        console.log(err);
                    }else if(found){
                        return res.status(201).json({auth:true, result: found});
                    }else{
                        return res.status(201).json({auth:false, msg: "You are restricted to create coupon!!"});
                    }
                })
            }
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

export let createCoupon = async (req,res) => {
    try {

        let oid = req.body.oid;
        let coupon = req.body.coupon;
        let price = req.body.price;

        Order.findById(oid,(err,order) => {
            if(err){
                console.log(err);
            }else{
                let discount = {
                    coupon : coupon,
                    price : price,
                }
                order.discountCoupon = discount;
                order.save();
                return res.status(201).json({auth:true, result: order});
            }
        })
        
    } catch (error) {
        console.log(error);
    }
}