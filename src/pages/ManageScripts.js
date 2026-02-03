import React from "react";
import { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Form, Badge, Card } from "react-bootstrap";

function ManageScripts() {
  const [scripts, setScripts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentScript, setCurrentScript] = useState({ title: "", calm: "", confident: "", close: "" });

  const API_URL = process.env.REACT_APP_API_URL_LOCAL || process.env.REACT_APP_API_URL;
  const fetchScripts = React.useCallback(async () => {
    const res = await fetch(`${API_URL}/objections`);
    const data = await res.json();
    setScripts(data);
  }, [API_URL]);

  useEffect(() => { fetchScripts(); }, [fetchScripts]);

  // OPEN MODAL FOR EDIT
  const handleEdit = (script) => {
    setCurrentScript(script);
    setShowModal(true);
  };

  // SAVE UPDATE
  const handleUpdate = async () => {
    await fetch(`${API_URL}/admin/objections/${currentScript._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentScript),
    });
    setShowModal(false);
    fetchScripts();
  };

  // DELETE SCRIPT
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure? This will remove the ACA script permanently.")) {
      await fetch(`${API_URL}/admin/objections/${id}`, { method: "DELETE" });
      fetchScripts();
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-sm border-0 bg-dark text-white p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>📚 Script Library</h2>
          <Badge bg="info">{scripts.length} Total Objections</Badge>
        </div>

        <Table responsive variant="dark" hover className="align-middle">
          <thead>
            <tr>
              <th>Objection Title</th>
              <th>Preview (Calm/ACA 1)</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scripts.map((s) => (
              <tr key={s._id}>
                <td className="fw-bold">{s.title}</td>
                <td className="text-muted small">{s.calm?.substring(0, 50)}...</td>
                <td className="text-end">
                  <Button variant="outline-warning" size="sm" className="me-2" onClick={() => handleEdit(s)}>
                    Edit
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(s._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* EDIT MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton className="bg-dark text-white border-secondary">
          <Modal.Title>Edit: {currentScript.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Objection Title</Form.Label>
              <Form.Control 
                className="bg-secondary text-white border-0"
                value={currentScript.title} 
                onChange={(e) => setCurrentScript({...currentScript, title: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Step 1: Acknowledge (Calm)</Form.Label>
              <Form.Control as="textarea" rows={3} className="bg-secondary text-white border-0"
                value={currentScript.calm} onChange={(e) => setCurrentScript({...currentScript, calm: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Step 2: Check (Confident)</Form.Label>
              <Form.Control as="textarea" rows={3} className="bg-secondary text-white border-0"
                value={currentScript.confident} onChange={(e) => setCurrentScript({...currentScript, confident: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Step 3: Ask (Close)</Form.Label>
              <Form.Control as="textarea" rows={3} className="bg-secondary text-white border-0"
                value={currentScript.close} onChange={(e) => setCurrentScript({...currentScript, close: e.target.value})} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark border-secondary">
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="info" onClick={handleUpdate}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ManageScripts;