import React, { Component } from "react";




export default function CommentReply(props) {

    return (
      <div>
        <div>Username: {props.username}</div>
        <div>Reply: {props.reply}</div>
        <button onClick={delReply}>X</button>
        <hr></hr>
      </div>
    );
  }