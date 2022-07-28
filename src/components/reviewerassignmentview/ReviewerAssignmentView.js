import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useParams } from "react-router-dom";
import httpRequest from "../../services/httpRequestService";
import { useLocalState } from "../../utils/useLocalState";

function ReviewerAssignmentView() {
  // Use custom useState hook to store jwt in local storage
  const [jwt] = useLocalState("", "jwt");
  // store assignments
  const [assignment, setAssignment] = useState({
    gitHubUrl: "",
    branch: "",
    number: null,
    status: "",
    codeReviewVideoUrl: "",
  });

  // Assignment  Enums
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  // Assignment Status Enums
  const [assignmentStatusEnums, setAssignmentStatusEnums] = useState([]);
  // Get ASsignment id from url param
  const { assignmentId } = useParams();
  // Use Ref
  const currentAssignmentState = useRef(assignment);
  // useNavigate
  const navigate = useNavigate();

  function updateAssignment(prop, value) {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);
    console.log(assignment);
  }

  const saveReview = (status) => {
    if (status && assignment.status != status) {
      updateAssignment("status", status);
    } else {
      persist();
    }
  };

  const persist = () => {
    httpRequest(
      `http://localhost:8081/api/assignments/${assignmentId}`,
      "PUT",
      jwt,
      assignment
    ).then((assignmentData) => {
      setAssignment(assignmentData);
    });
  };

  useEffect(() => {
    if (currentAssignmentState.current.status !== assignment.status) {
      persist();
    }
    currentAssignmentState.current = assignment;
  }, [assignment]);

  useEffect(() => {
    httpRequest(
      `http://localhost:8081/api/assignments/${assignmentId}`,
      "GET",
      jwt
    ).then((assignmentResponse) => {
      console.log("RES:");
      console.log(assignmentResponse);
      let assignment = assignmentResponse.assignment;
      let assignmentEnumList = assignmentResponse.assignmentEnumList;
      let assignmentStatusEnumList =
        assignmentResponse.assignmentStatusEnumList;

      if (assignment.branch === null) {
        assignment.branch = "";
      }
      if (assignment.gitHubUrl === null) {
        assignment.gitHubUrl = "";
      }
      setAssignment(assignment);
      setAssignmentEnums(assignmentEnumList);
      setAssignmentStatusEnums(assignmentStatusEnumList);
    });
  }, []);

  return (
    <Container className="mt-5">
      {assignment ? (
        <>
          <Row className="d-flex align-items-center mb-5">
            <Col>
              <h1 className="m-0">Assignment {assignment.number}</h1>
            </Col>
            <Col className="d-flex justify-content-center mb-2">
              <Badge style={{ fontSize: "1em" }}>{assignment.status}</Badge>
            </Col>
          </Row>

          <>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                GitHub URL:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  readOnly
                  disabled
                  type="url"
                  value={assignment.gitHubUrl}
                  placeholder="www.github.com/your-url"
                  onChange={(e) => {
                    updateAssignment("gitHubUrl", e.target.value);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Branch:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  readOnly
                  disabled
                  type="text"
                  placeholder="main"
                  value={assignment.branch}
                  onChange={(e) => {
                    updateAssignment("branch", e.target.value);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Video Review URL:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="codeReviewVideoUrl"
                  value={assignment.codeReviewVideoUrl}
                  onChange={(e) => {
                    updateAssignment("codeReviewVideoUrl", e.target.value);
                  }}
                />
              </Col>
            </Form.Group>

            <div className="d-flex gap-2">
              {assignment.status === "Completed" ? (
                <Button
                  variant={"secondary"}
                  size="large"
                  onClick={() => {
                    saveReview(assignmentStatusEnums[2].status);
                  }}
                >
                  Re-Claim
                </Button>
              ) : (
                <Button
                  size="large"
                  onClick={() => {
                    saveReview(assignmentStatusEnums[4].status);
                  }}
                >
                  Add Review
                </Button>
              )}
              {assignment.status === "Needs Update" ? (
                <Button
                  variant={"secondary"}
                  size="large"
                  onClick={() => {
                    saveReview(assignmentStatusEnums[2].status);
                  }}
                >
                  Re-Claim
                </Button>
              ) : (
                <Button
                  variant={"danger"}
                  size="large"
                  onClick={() => {
                    saveReview(assignmentStatusEnums[3].status);
                  }}
                >
                  Needs Update
                </Button>
              )}

              <Button
                size="large"
                variant="secondary"
                onClick={() => {
                  navigate(`/dashboard`);
                }}
              >
                Back
              </Button>
            </div>
          </>
        </>
      ) : (
        <div>Loading</div>
      )}
    </Container>
  );
}

export default ReviewerAssignmentView;
