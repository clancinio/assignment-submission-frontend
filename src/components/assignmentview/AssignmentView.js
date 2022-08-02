import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useParams } from "react-router-dom";
import httpRequest from "../../services/httpRequestService";
import { useLocalState } from "../../utils/useLocalState";
import StatusBadge from "../statusbadge/StatusBadge";
import { useUser } from "../user-context/UserContext";

function AssignmentView() {
  const user = useUser();
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

  const save = (status) => {
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
      user.jwt,
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
      user.jwt
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
              <StatusBadge text={assignment.status} />
            </Col>
          </Row>

          <>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Assignment Number:
              </Form.Label>
              <Col sm="10" className="d-flex align-items-center">
                <DropdownButton
                  id="dropdown-basic-button"
                  varient="secondary"
                  title={
                    assignment.number
                      ? `Assignment ${assignment.number}`
                      : `Select an Assignment`
                  }
                  onSelect={(selectedElement) => {
                    console.log(selectedElement);
                    updateAssignment("number", selectedElement);
                  }}
                >
                  {assignmentEnums.map((assignmentEnum, index) => {
                    return (
                      <Dropdown.Item
                        key={index}
                        eventKey={assignmentEnum.assignmentNum}
                      >
                        {assignmentEnum.assignmentNum}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                GitHub URL:
              </Form.Label>
              <Col sm="10">
                <Form.Control
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
                  type="text"
                  placeholder="main"
                  value={assignment.branch}
                  onChange={(e) => {
                    updateAssignment("branch", e.target.value);
                  }}
                />
              </Col>
            </Form.Group>

            {assignment.status === "Completed" ? (
              <>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Review URL:
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      readOnly
                      disabled
                      type="text"
                      placeholder="main"
                      value={assignment.codeReviewVideoUrl}
                    />
                  </Col>
                </Form.Group>
                <Button
                  size="large"
                  variant="secondary"
                  onClick={() => {
                    navigate(`/dashboard`);
                  }}
                >
                  Back
                </Button>
              </>
            ) : assignment.status === "Pending Submission" ? (
              <div className="d-flex gap-2">
                <Button
                  size="large"
                  onClick={() => {
                    save("Submitted");
                  }}
                >
                  Submit
                </Button>
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
            ) : (
              <div className="d-flex gap-2">
                <Button
                  size="large"
                  onClick={() => {
                    save("Resubmitted");
                  }}
                >
                  Resubmit
                </Button>
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
            )}
          </>
        </>
      ) : (
        <div>Loading</div>
      )}
    </Container>
  );
}

export default AssignmentView;
