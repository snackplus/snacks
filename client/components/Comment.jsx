import React, { Component } from "react";

export default function Comment(props) {
  return (
    <div>
      <div>==========</div>
      <div>Username: {props.username}</div>
      <div>Rating: {props.rating}</div>
      <div>Comment: {props.comment}</div>
    </div>
  );
}
