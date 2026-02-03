import React, { useState, useEffect, useCallback } from "react";
import { Container, Form, Button, Card, Badge, Modal, Row, Col, Spinner } from "react-bootstrap";
import DiscoveryScriptEditor from "./DiscoveryScript"; // Renamed for clarity

function DiscoveryManager() {
  const [scripts, setScripts] = useState([]);
  const [selectedScript, setSelectedScript] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newScript, setNewScript] = useState({ name: "", description: "" });

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  const fetchScripts = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/discovery-scripts`);
      const data = await res.json();
      setScripts(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => { fetchScripts(); }, [fetchScripts]);

  const handleCreate = async () => {
    if (!newScript.name) return alert("Name is required");
    await fetch(`${API_URL}/api/discovery-scripts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newScript, phases: [] }),
    });
    setShowModal(false);
    setNewScript({ name: "", description: "" });
    fetchScripts();
  };

  const handleUpdate = async (id, updatedContent) => {
    await fetch(`${API_URL}/api/discovery-scripts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedContent),
    });
    fetchScripts();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this script permanently?")) {
      await fetch(`${API_URL}/api/discovery-scripts/${id}`, { method: "DELETE" });
      fetchScripts();
      if (selectedScript?._id === id) setSelectedScript(null);
    }
  };

  const handleSetActive = async (id) => {
    await fetch(`${API_URL}/api/discovery-scripts/${id}/activate`, { method: "PUT" });
    fetchScripts();
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" variant="info" /></div>;

  return (
    <Container className="py-5" style={{ background: "#0b0e14", minHeight: "100vh", color: "#fff" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-info fw-bold">🎙️ Discovery Script Manager</h2>
        <Button variant="info" className="fw-bold" onClick={() => setShowModal(true)}>+ Add New Script</Button>
      </div>

      <Row>
        {scripts.map((script) => (
          <Col lg={12} key={script._id}>
            <Card className="mb-4 bg-dark border-secondary shadow-sm">
              <Card.Header className="d-flex justify-content-between align-items-center bg-black border-secondary py-3">
                <div>
                  <span className="h5 text-info me-3">{script.name}</span>
                  <Badge bg={script.isActive ? "success" : "secondary"}>
                    {script.isActive ? "ACTIVE DIALER SCRIPT" : "INACTIVE"}
                  </Badge>
                </div>
                <div className="d-flex gap-2">
                  <Button variant="outline-info" size="sm" onClick={() => setSelectedScript(script)}>
                    {selectedScript?._id === script._id ? "Close Editor" : "Edit Phases"}
                  </Button>
                  {!script.isActive && (
                    <Button variant="outline-success" size="sm" onClick={() => handleSetActive(script._id)}>Set Active</Button>
                  )}
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(script._id)}>Delete</Button>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="text-muted small mb-3 italic">{script.description || "No description provided."}</div>
                {selectedScript?._id === script._id && (
                  <DiscoveryScriptEditor script={selectedScript} onUpdate={handleUpdate} />
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered contentClassName="bg-dark text-white border-info">
        <Modal.Header closeButton closeVariant="white" className="border-secondary">
          <Modal.Title>Create New Discovery Script</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Script Name (e.g., 'Primary Dialer v2')</Form.Label>
            <Form.Control className="bg-secondary border-0 text-white" value={newScript.name} onChange={e => setNewScript({ ...newScript, name: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Internal Description</Form.Label>
            <Form.Control as="textarea" className="bg-secondary border-0 text-white" value={newScript.description} onChange={e => setNewScript({ ...newScript, description: e.target.value })} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="border-secondary">
          <Button variant="outline-light" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="info" onClick={handleCreate}>Create Script</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DiscoveryManager;