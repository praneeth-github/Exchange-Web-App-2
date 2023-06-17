import Discuss from "../model/discussPanel.js";
import User from "../model/users.js";

// view Discussion 
export function viewDiscussion(req, res) {
  try {
    let user_id = req.user;
    Discuss.find((err, result) => {
      if (err) {
        console.log(err);
        res.send({ auth: true, msg: "Some problem is there!! " });
      } else {
        res.send(result);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

// add comment to a post
export function addComment(req, res) {
  try {
    let d = new Date();
    console.log(req.body);
    d = d.toTimeString();
    let id = req.user;
    User.findById(id, (err,user) => {
      if(err){
        console.log(err);
      }else if(user){
        Discuss.findById({ _id: req.body.id }, (err, discuss) => {
          if (err) {
            console.error(err);
          } else {
            let newComment = {
              author: user.username,
              comment: req.body.comment,
            };
            discuss.comments.push(newComment);
          }
    
          discuss.save(function (err, result) {
            if (err) throw err;
            else console.log(result);
          });
        });
    
        // send the response
        res.send("succefully inserted");

      }else{
        console.log("No user found");
      }
    });
    
  } catch (e) {
    console.log(e);
  }
}

// add a new post handler
export function addPost(req, res) {
  try {
      let id = req.user;
      User.findById(id, (err,user) => {
        if(err){
          console.log(err);
        }else if(user){
          let d = new Date();
          d = d.toTimeString();
          let myarray = new Array();
          let query = {
            author: user.username,
            title: req.body.title,
            post: req.body.discription,
            comments: myarray,
            time: d,
          };
          let addedPost = new Discuss(query);
          console.log(addedPost);
          addedPost.save(function (err, data) {
            if (err) throw err;
            else res.send(data);
          });
          console.log(query);

        }else{
          console.log("no user found");
        }
      })
    
  } catch (e) {
    console.error(e);
  }
}