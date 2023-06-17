import axios from "axios";
import React, { useState } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";

export default function DiscussionCard(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [userComment, setuserComment] = useState("");
  console.log(props);


  // handle submit form
  function handleSubmit(e) {
    e.preventDefault();

    let req = {
      author: "unknown",
      comment: userComment,
      id: props.post._id,
    };
    setuserComment("");
    console.log("you clicked the form ", req, props);
    axios
      .post("http://localhost:5000/discussion/addComment", req, 
      {
          headers: {
              "x-access-token": localStorage.getItem("token"),
          } 
      })
      .then((res) => {
        console.log(res);
        console.log("comment added");
        window.location.reload();
      });
  }

  // handle Change
  function handleChange(e) {
    setuserComment(e.target.value);
  }

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="container border border-dark rounded">
      <div className="row">
        <div className="row-md-12">
          <div className="row ">
            <div className=" col card-header">
              <div className="media flex-wrap w-100 align-items-center">
                {" "}
                <p className="fs-3 fw-bold text-center">{props.post.title}</p>
                <div className="media-body ml-3">
                  {" "}
                  <span>{props.post.author}</span>
                  <span className="text-muted small inline-block mx-3">
                    {props.post.time}
                  </span>
                </div>
              </div>
            </div>
            <div className="card-body">
              <p> {props.post.post} </p>
            </div>
            <div className="card-footer">
              <div className="">
                <Button
                  color="primary"
                  onClick={toggle}
                  style={{ marginBottom: "1rem" }}
                >
                  Comments
                </Button>
                <Collapse isOpen={isOpen}>
                  <p className="text-center text-decoration-underline ">
                    Comments({props.post.comments.length})
                  </p>
                  <div>
                    {props.post.comments.map(function (comments) {
                      return (
                        <div className="col bg-white my-2 p-2 rounded">
                          <div></div>
                          <p className="fs-6  my-0 ">
                            {" "}
                            <i
                              class="bi bi-person-circle"
                              aria-hidden="true"
                            ></i>{" "}
                            {comments.author}
                          </p>
                          <p className="text-secondary ">{comments.comment}</p>
                        </div>
                      );
                    })}
                  </div>
                </Collapse>
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        value={userComment}
                        onChange={handleChange}
                        className="form-control required"
                        placeholder="Type Message here..."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <button
                        type="submit"
                        className="px-1 btn btn-outline-success"
                      >
                        Comment <i className="fas fa-paper-plane"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


