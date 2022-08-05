import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import httpRequest from "../../services/httpRequestService";
import { useUser } from "../user-context/UserContext";
import Comment from "../comment/Comment";

function CommentSection(props) {
  const { assignmentId } = props;
  const user = useUser();

  const emptyComment = {
    id: null,
    commentText: "",
    assignmentId: assignmentId != null ? parseInt(assignmentId) : null,
    user: user.jwt,
  };

  const [comment, setComment] = useState(emptyComment);
  const [comments, setComments] = useState([]);

  function updateComment(value) {
    const commentCopy = { ...comment };
    commentCopy.commentText = value;
    setComment(commentCopy);
  }

  function handleEditComment(commentId) {
    const i = comments.findIndex((comment) => comment.id === commentId);
    console.log("In handleEditComment", commentId);
    console.log(comment);
    const commentCopy = {
      id: comments[i].id,
      commentText: comments[i].commentText,
      assignmentId: assignmentId != null ? parseInt(assignmentId) : null,
      user: user.jwt,
    };
    setComment(commentCopy);
  }

  function handleDeleteComment(commentId) {
    // TODO: send DELETE request to server
    console.log("In handleDeleteComment", commentId);
    // ajax(`/api/comments/${commentId}`, "delete", user.jwt).then((msg) => {
    //   const commentsCopy = [...comments];
    //   const i = commentsCopy.findIndex((comment) => comment.id === commentId);
    //   commentsCopy.splice(i, 1);
    //   formatComments(commentsCopy);
    // });
  }

  function submitComment() {
    if (comment.id) {
      httpRequest(
        "http://localhost:8081/api/comments",
        "put",
        user.jwt,
        comment
      ).then((data) => {
        console.log(data);
        const commentsCopy = [...comments];
        const i = commentsCopy.findIndex((comment) => comment.id === data.id);
        commentsCopy[i] = data;
        setComments(commentsCopy);
        setComment(emptyComment);
      });
    } else {
      httpRequest(
        "http://localhost:8081/api/comments",
        "post",
        user.jwt,
        comment
      ).then((data) => {
        console.log(data);
        const commentsCopy = [...comments];
        commentsCopy.push(data);
        setComments(commentsCopy);
        setComment(emptyComment);
      });
    }
  }

  useEffect(() => {
    httpRequest(
      `http://localhost:8081/api/comments/${assignmentId}`,
      "get",
      user.jwt,
      null
    ).then((data) => {
      console.log("COMMENTS");
      console.log(data);
      setComments(data);
    });
  }, []);

  return (
    <>
      <div className="mt-5">
        <h4>Comments</h4>
      </div>
      <Row>
        <Col lg="8" md="10" sm="12">
          <textarea
            style={{ width: "100%", borderRadius: "0.25em" }}
            onChange={(e) => updateComment(e.target.value)}
            value={comment.commentText}
          ></textarea>
        </Col>
      </Row>
      <Button onClick={() => submitComment()}>Post Comment</Button>
      <div className="mt-5">
        {comments.map((comment) => (
          <Comment
            id={comment.id}
            username={comment.createdBy.username}
            commentText={comment.commentText}
            createdDate={comment.createdDate}
            emitDeleteComment={handleDeleteComment}
            emitEditComment={handleEditComment}
          />
        ))}
      </div>
    </>
  );
}

export default CommentSection;
