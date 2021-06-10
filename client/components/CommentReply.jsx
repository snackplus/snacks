import React, { Component } from "react";


export default function CommentReply(props) {

    return (
    <div className='Reply'>
      <div>
        <div>Username: {props.username}</div>
        <div>Reply: {props.reply}</div>
        <div>Reply_Id: {props.reply_id}</div>
        <button>X</button>
        <hr></hr>
      </div>
    </div>
    );
  }