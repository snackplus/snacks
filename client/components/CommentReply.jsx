import React, { Component } from "react";


export default function CommentReply(props) {

    return (
    <div className='Reply'>
      <div>
        <div>Username: {props.current_user}</div>
        <div>Reply: {props.reply}</div>
        {/* <button id={props.reply_id}>Delete</button> */}
        <hr></hr>
      </div>
    </div>
    );
  }