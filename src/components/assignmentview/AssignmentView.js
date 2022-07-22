import React, { useEffect, useState } from "react";
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

function AssignmentView() {
  // Use custom useState hook to store jwt in local storage
  const [jwt] = useLocalState("", "jwt");
  // store assignments
  const [assignment, setAssignment] = useState({
    gitHubUrl: "",
    branch: "",
  });
  // Assignment Enums
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  // Get ASsignment id from url param
  const { assignmentId } = useParams();

  useEffect(() => {
    httpRequest(
      `http://localhost:8081/api/assignments/${assignmentId}`,
      "GET",
      jwt
    ).then((assignmentResponse) => {
      console.log(assignmentResponse);
      let assignment = assignmentResponse.assignment;
      let assignmentEnumList = assignmentResponse.assignmentEnumList;

      if (assignment.branch === null) {
        assignment.branch = "";
      }
      if (assignment.gitHubUrl === null) {
        assignment.gitHubUrl = "";
      }
      setAssignment(assignment);
      setAssignmentEnums(assignmentEnumList);
    });
  }, []);

  const updateAssignment = (prop, value) => {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);
    console.log(assignment);
  };

  const save = () => {
    httpRequest(
      `http://localhost:8081/api/assignments/${assignmentId}`,
      "PUT",
      jwt,
      assignment
    ).then((assignmentData) => {
      setAssignment(assignmentData);
    });
  };

  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center mb-5">
        <Col>
          <h1 className="m-0">Assignment {assignment.id}</h1>
        </Col>
        <Col className="d-flex justify-content-center">
          <Badge bg="secondary" style={{ fontSize: "1em" }}>
            {assignment.status}
          </Badge>
        </Col>
      </Row>

      {assignment ? (
        <>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Assignment Number:
            </Form.Label>
            <Col sm="10" className="d-flex align-items-center">
              <DropdownButton
                id="dropdown-basic-button"
                title="Dropdown button"
              >
                {assignmentEnums.map((assignmentEnum) => {
                  return (
                    <Dropdown.Item>
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

          <Button size="large" onClick={() => save()}>
            Submit Assignment
          </Button>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default AssignmentView;
