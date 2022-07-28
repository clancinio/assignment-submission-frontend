import React, { useState, useEffect } from "react";
import { useLocalState } from "../../utils/useLocalState";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import NavBar from "../navbar/NavBar";
import httpRequest from "../../services/httpRequestService";

function CodeReviewerDashboard() {
  const navigate = useNavigate();

  // Use custom useState hook to store jwt in local storage
  const [jwt] = useLocalState("", "jwt");

  // store assignments
  const [assignments, setAssignments] = useState([]);

  function claimAssignment(assignment) {
    const requestBody = { ...assignment };
    httpRequest(
      `http://localhost:8081/api/assignments/claim`,
      "PUT",
      jwt,
      requestBody
    ).then((updatedAssignment) => {
      console.log(updatedAssignment);
      // Update date the view for the assignment that changed
      const assignmentsCopy = [...assignments];
      const i = assignmentsCopy.findIndex((a) => a.id === assignment.id);
      assignmentsCopy[i] = updatedAssignment;
      setAssignments(assignmentsCopy);
    });
  }

  function review(assignment) {
    navigate(`/assignments/${assignment.id}`);
  }

  useEffect(() => {
    httpRequest("http://localhost:8081/api/assignments", "GET", jwt).then(
      (assignments) => {
        setAssignments(assignments);
      }
    );
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <Row>
          <Col>
            <h1 className="my-3">Code Reviewer Dashboard</h1>
          </Col>
        </Row>
        <div className="assignment--section in-review">
          <h3>Assignments in Review</h3>
          {assignments.length > 0 ? (
            <Row className="d-flex flex-row gap-5 justify-content-center my-5">
              {assignments
                .filter((a) => a.status === "In Review")
                .map((assignment) => {
                  return (
                    <Col lg={4} xl={3} key={assignment.id}>
                      <Card
                        style={{ height: "18rem" }}
                        className="shadow rounded"
                      >
                        <Card.Body className="d-flex flex-column">
                          <Card.Title>
                            Assignment {assignment.number}
                          </Card.Title>
                          <div className="d-flex align-items-start">
                            <Badge
                              pill
                              className="mb-2"
                              style={{ fontSize: "1em" }}
                            >
                              {assignment.status}
                            </Badge>
                          </div>

                          <Card.Text>
                            <p>GitHubURL: {assignment.gitHubUrl}</p>
                            <p>Branch: {assignment.branch}</p>
                          </Card.Text>
                          <Button
                            variant="secondary"
                            className="mt-auto p-2"
                            onClick={() => {
                              review(assignment);
                            }}
                          >
                            Review
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          ) : (
            <Row>
              <Col className="my-3">
                <h5 className="text-muted">
                  There are no assignments available for review
                </h5>
              </Col>
            </Row>
          )}
        </div>
        <div className="assignment--section submitted">
          <h3>Submitted Assignments</h3>
          {assignments.length > 0 ? (
            <Row className="d-flex flex-row gap-5 justify-content-center my-5">
              {assignments
                .filter((a) => a.status === "Submitted")
                .map((assignment) => {
                  return (
                    <Col lg={4} xl={3} key={assignment.id}>
                      <Card
                        style={{ height: "18rem" }}
                        className="shadow rounded"
                      >
                        <Card.Body className="d-flex flex-column">
                          <Card.Title>
                            Assignment {assignment.number}
                          </Card.Title>
                          <div className="d-flex align-items-start">
                            <Badge
                              pill
                              className="mb-2"
                              style={{ fontSize: "1em" }}
                            >
                              {assignment.status}
                            </Badge>
                          </div>

                          <Card.Text>
                            <p>GitHubURL: {assignment.gitHubUrl}</p>
                            <p>Branch: {assignment.branch}</p>
                          </Card.Text>
                          <Button
                            variant="secondary"
                            className="mt-auto p-2"
                            onClick={() => {
                              claimAssignment(assignment);
                            }}
                          >
                            Claim
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          ) : (
            <Row>
              <Col className="my-3">
                <h3 className="text-muted">
                  You are not reviewing any assignments
                </h3>
              </Col>
            </Row>
          )}
        </div>
        <div className="assignment--section needs-update">
          <h3>Needs update</h3>
          {assignments.length > 0 ? (
            <Row className="d-flex flex-row gap-5 justify-content-center my-5">
              {assignments
                .filter((a) => a.status === "Needs Update")
                .map((assignment) => {
                  return (
                    <Col lg={4} xl={3} key={assignment.id}>
                      <Card
                        style={{ height: "18rem" }}
                        className="shadow rounded"
                      >
                        <Card.Body className="d-flex flex-column">
                          <Card.Title>
                            Assignment {assignment.number}
                          </Card.Title>
                          <div className="d-flex align-items-start">
                            <Badge
                              pill
                              className="mb-2"
                              style={{ fontSize: "1em" }}
                            >
                              {assignment.status}
                            </Badge>
                          </div>

                          <Card.Text>
                            <p>GitHubURL: {assignment.gitHubUrl}</p>
                            <p>Branch: {assignment.branch}</p>
                          </Card.Text>
                          <Button
                            variant="secondary"
                            className="mt-auto p-2"
                            onClick={() => {
                              navigate(`/assignments/${assignment.id}`);
                            }}
                          >
                            View
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          ) : (
            <Row>
              <Col className="my-3">
                <h5 className="text-muted">No assignments for updateing</h5>
              </Col>
            </Row>
          )}
        </div>
      </Container>
    </>
  );
}

export default CodeReviewerDashboard;
