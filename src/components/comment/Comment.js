import React from "react";
import "./comment.css";

function Comment(props) {
  const {
    id,
    username,
    commentText,
    createdDate,
    emitEditComment,
    emitDeleteComment,
  } = props;

  return (
    <div className="shadow rounded p-3 mb-3 comment">
      <div className="d-flex gap-5" style={{ fontWeight: "bold" }}>
        <div>{`${username}`}</div>
        <>
          <div
            onClick={() => emitEditComment(id)}
            style={{ cursor: "pointer", color: "blue" }}
          >
            edit
          </div>
          <div
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => emitDeleteComment(id)}
          >
            delete
          </div>
        </>
      </div>
      <small class="text-muted">{createdDate}</small>
      <p>{commentText}</p>
    </div>
  );
}

export default Comment;
