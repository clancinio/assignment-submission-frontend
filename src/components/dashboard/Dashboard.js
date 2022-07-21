import React, { useState, useEffect } from "react";
import { useLocalState } from "../../utils/useLocalState";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import httpRequest from "../../services/httpRequestService";

function Dashboard() {
  const navigate = useNavigate();

  // Use custom useState hook to store jwt in local storage
  const [jwt] = useLocalState("", "jwt");

  // store assignments
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    httpRequest("http://localhost:8081/api/assignments", "GET", jwt).then(
      (assignments) => {
        setAssignments(assignments);
      }
    );
  }, []);

  const createAssignment = () => {
    httpRequest("http://localhost:8081/api/assignments", "POST", jwt).then(
      (assignment) => {
        console.log(assignment);
        window.location.href = `/assignments/${assignment.id}`;
      }
    );
  };

  return (
    <Container>
      <Button className="mt-5" size="large" onClick={() => createAssignment()}>
        Create New Assignment
      </Button>
      {assignments ? (
        <Row className="d-flex flex-row gap-5 justify-content-center my-5">
          {assignments.map((assignment) => {
            return (
              <Col lg={4} xl={3} key={assignment.id}>
                <Card style={{ height: "18rem" }} className="shadow rounded">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>Assignment {assignment.id}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {assignment.status}
                    </Card.Subtitle>
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
                      Edit
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <div>
          <h3>No assignemnts available</h3>
        </div>
      )}
    </Container>
  );
}

export default Dashboard;
