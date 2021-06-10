import React, { Component, useState } from "react";
import CommentReply from './CommentReply.jsx';


export default function Comment(props) {

  const [replies, setReplies] = useState(null);
  const [inputField, setInputField] = useState(false);

  const seeReplies = () => {
    if (replies !== null) {
      setReplies(null);
      return;
    }
    //setInputField(true);
    console.log(props);

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
          console.log("Replies: ");
          console.log(data);
        setReplies(data);
        });
    };

  const addReply = () => {
    const reply = document.getElementById('replyInput').value
    if(reply === '') return;
    fetch("/comment/commentReply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment_id: props.comment_id,
        reply: reply
      }),
    })
      .then((res) => res.json())
      .then((data) => {
      setReplies(data);
      console.log(replies);
      });
  };


    return (
      <div>
        <div>Username: {props.username}</div>
        <div>Rating: {props.rating}</div>
        <div>Comment: {props.comment}</div>
        <button onClick={seeReplies}>View Replies</button>
        <button onClick={addReply}>Reply</button>
        <input id="replyInput" type="text"/>
      {/* {if (addReply) } */}
        {/* {asdfadf} */}
        <div className='Replies'>

              {replies &&
                replies.map((e) => (
                  <CommentReply
                    reply_id={e.reply_id}
                    current_user={e.user_id}
                    comment_id={e.comment_id}
                    reply={e.reply}
                  />
              ))}
            </div>

        <hr></hr>
      </div>
    );
 


}
