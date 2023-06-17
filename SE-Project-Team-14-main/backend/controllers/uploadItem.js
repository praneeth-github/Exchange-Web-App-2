import Product from "../model/products.js";
import User from "../model/users.js";

export let uploadItem = async (req, res) => {
    //console.log(req.body);
    try {
        let id = req.user;
        User.findById(id, (err,user) => {
            if(err){
                console.log(err);
            }else if(user){
                const item = new Product({
                    title: req.body.title,
                    desc: req.body.desc,
                    price: req.body.price,
                    owner: user.username,
                    category: req.body.category,
                    date: Date.now(),
                })
                for(let i=0; i<req.body.imageNames.length; i++) {
                    item.images.push(req.body.imageNames[i]);
                }
                item.save();
                console.log(item);
                return res.status(200).json({msg: item});
            }else{
                console.log("No user exist");
            }
        });
        
    }
    catch (error) {
        console.log(error);
        res.status(404).send("Error");
    }
}

