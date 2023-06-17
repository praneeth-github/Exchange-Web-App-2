import User from "../model/users.js";
import jwt from "jsonwebtoken";

export let registerUser = async (req,res) => {
    try {
        let email = req.body.email;
        let username = req.body.username;
        let password = req.body.password;
        let cpassword = req.body.cpassword;
        //console.log(req.body);

        if(cpassword == password){
            User.findOne({email: email}).then((user)=>{
                if(user){
                    return res.status(201).json({auth:false,msg:"email already exists!!"});
                }else{
                    User.findOne({username : username}, (err,found)=>{
                        if(err){
                            console.log(err);
                        }else if(found){
                            return res.status(201).json({auth:false,msg:"username already exists!!"});
                        }else{
                            const user = new User({
                                email: email,
                                username: username,
                            });
                            user.password = user.generateHash(password);
                            user.save();
                            console.log(user);
                            const id = user._id;
                            const token = jwt.sign({id},"jwtSecret");
                            req.session.user = user;
                            return res.status(200).json({result: user, auth: true, token: token});

                        }
                    })
                    
                }
            });     
        }else{
            console.log("Passwords not matching");
            return res.status(201).json({auth: false, msg : "Passwords are not matching!!"});
        }
        
    } catch (error) {
        console.log(error);
        res.status(404).send('Error');        
    }
}

export let loginUser = async (req,res) => {
    try {
        let email = req.body.email;
        User.findOne({email: email}).then((result)=>{        
            if(result){
                if(!result.validPassword(req.body.password)) {
                    console.log('Incorrect password');
                    res.status(201).json({auth:false, msg: "Incorrect password"});
                  } else {
                      console.log(result);
                      const id = result._id;
                      const token = jwt.sign({id},"jwtSecret");
                      req.session.user = result;


                    return res.status(200).json({result: result, auth: true, token: token});
                  }
            }else{
                return res.status(201).json({auth:false, msg:"email doesn't exists!!"});
            }

        }).catch((err)=>console.log(err));
        
    } catch (error) {
        console.log(error);
        res.status(404).json({auth: false});        
    }
}

export let getUserData = async (req,res) => {
    let id = req.user;
    User.findById(id, (err,user) => {
        if(err){
            res.status(404).json({auth:true, msg:"user doesn't exist"});
        }else{
            res.status(201).json({auth:true, result: user});
        }
    });
}

export let getUserByUsername = async (req, res) => {
    // console.log(req.query);
    let username = req.body.username;
    User.findOne({username: username}).then((result) => {
        if(result) {
            res.status(200).json({result: result});
        }
        else {
            res.status(400).json({msg: "user doesn't exist"});
        }
    });
}

export let saveChanges = async (req,res) => {
    try {
        console.log(req.body);
        let name = req.body.name;
        let phone = req.body.phone;
        let city = req.body.city;
        let id = req.user;
        User.findByIdAndUpdate(id, { name: name, phone : phone, locationUrl : city },
                            function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            res.status(200).json({auth: true, result: docs});
            console.log("Updated User : ", docs);
        }
});

    } catch (error) {
        console.log(error);
        
    }
}

export let getPrevOrders = async (req,res) =>{
    try {

        let id = req.user;
        User.findById(id, (err,user)=>{
            if(err){
                console.log(err);
            }else{
                console.log(user);
                return res.status(200).json({auth: true, result: user.previousOrder});
            }
        })
        
    } catch (error) {
        console.log(error);
        
    }
}