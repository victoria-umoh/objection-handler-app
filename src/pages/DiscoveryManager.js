import { useState, useEffect } from "react";
import { Container, Form, Button, Card, Row, Col, Badge } from "react-bootstrap";

function DiscoveryManager() {
  const [phases, setPhases] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL_LOCAL || process.env.REACT_APP_API_URL;
  useEffect(() => {
    fetch(`${API_URL}/objections?category=discovery`)
      .then(res => res.json())
      .then(data => {
        setPhases(data);
        setLoading(false);
      });
  }, []);

  const handleUpdate = async (id, updatedContent) => {
    await fetch(`${API_URL}/admin/objections/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedContent),
    });
    alert("Phase Updated!");
  };

  return (
    <Container className="py-5" style={{ background: "#0b0e14", minHeight: "100vh", color: "#fff" }}>
      <h2 className="text-info mb-4">🎙️ Main Script & Discovery Manager</h2>
      
      {phases.map((phase, index) => (
        <Card key={phase._id} className="mb-4 bg-dark border-secondary shadow">
          <Card.Header className="d-flex justify-content-between bg-black text-info border-secondary">
            <span className="fw-bold">PHASE {index + 1}: {phase.title}</span>
            <Badge bg="info">Discovery Path</Badge>
          </Card.Header>
          <Card.Body>
            <Form.Group>
              <Form.Label className="text-muted small">Script Text</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={5} 
                className="bg-dark text-white border-secondary mb-3"
                defaultValue={phase.content}
                onBlur={(e) => handleUpdate(phase._id, { content: e.target.value })}
              />
            </Form.Group>
            <div className="text-end">
              <Button variant="outline-info" size="sm">Update Phase Content</Button>
            </div>
          </Card.Body>
        </Card>
      ))}

      {/* QUICK TIPS CRUD */}
      <Card className="bg-info text-dark p-3 fw-bold">
        💡 Note: Changes here update the right-hand sidebar of the Dialer View instantly.
      </Card>
    </Container>
  );
}