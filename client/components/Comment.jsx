import React, { Component } from "react";
import CommentReply from './CommentReply.jsx'

export default function Comment(props) {

  const [replies, setReplies] = useState(null);
  const [inputField, setInputField] = useState(false);



const getUsername = () => {
  fetch("/comment/getReply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comment_id: props.comment_id
    }),
  })
    .then((res) => res.json())
    .then((data) => {
    setReplies(data);
    });
};


const seeReplies = () => {

  setInputField(true);

    fetch("/comment/getReply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment_id: props.comment_id
      }),
    })
      .then((res) => res.json())
      .then((data) => {
      setReplies(data);
      });
  };

const addReply = () => {



  fetch("/comment/commentReply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comment_id: props.comment_id,
      // reply:
    }),
  })
    .then((res) => res.json())
    .then((data) => {
     setReplies(data);
    });
};

  return (
    <div>
      <div>Username: {props.username}</div>
      <div>Rating: {props.rating}</div>
      <div>Comment: {props.comment}</div>
      <button onClick={seeReply}>View Replies</button>
      <button onClick={addReply}>Reply</button>
      {/* <input type="text"/> */}

      <div className='Replies'>

            {inputField && replies &&
              replies.map((e) => (
                <CommentReply
                  current_user={e.user_id}
                  comment_id={e.comment_id}
                />
              ))}
          </div>

      <hr></hr>
    </div>
  );
}
