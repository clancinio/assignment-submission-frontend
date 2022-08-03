import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import httpRequest from "../../services/httpRequestService";
import { useUser } from "../user-context/UserContext";

function CommentSection(props) {
  const { assignmentId } = props;
  const user = useUser();

  const emptyComment = {
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

  function submitComment() {
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
    });
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
            value={comment.text}
          ></textarea>
        </Col>
      </Row>
      <Button onClick={() => submitComment()}>Post Comment</Button>
      <div className="mt-5">
        {comments.map((comment) => (
          <div>
            <h5>{comment.createdBy.username}</h5>
            <p>{comment.commentText}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default CommentSection;
