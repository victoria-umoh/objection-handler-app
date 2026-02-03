import { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Form, Button, Card, Badge } from "react-bootstrap";
function AdminDashboard() {
  const [scripts, setScripts] = useState([]);
  const [selectedScript, setSelectedScript] = useState({ title: "", calm: "", confident: "", close: "" });

  useEffect(() => { fetchScripts(); }, []);

  const fetchScripts = async () => {
    const res = await fetch("http://localhost:5000/api/objections");
    const data = await res.json();
    setScripts(data);
  };

  const handleSave = async () => {
    const method = selectedScript._id ? "PUT" : "POST";
    const url = selectedScript._id 
      ? `http://localhost:5000/api/admin/objections/${selectedScript._id}`
      : `http://localhost:5000/api/admin/add-objection`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedScript),
    });
    
    fetchScripts();
    setSelectedScript({ title: "", calm: "", confident: "", close: "" });
  };

  return (
    <Container fluid className="p-4" style={{ background: "#0b0e14", minHeight: "100vh" }}>
      <Row>
        {/* LIST SIDEBAR */}
        <Col md={4}>
          <Card className="bg-dark text-white border-secondary h-100">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span className="fw-bold">Script Library</span>
              <Button size="sm" variant="outline-info" onClick={() => setSelectedScript({ title: "", calm: "", confident: "", close: "" })}>+ New</Button>
            </Card.Header>
            <ListGroup variant="flush" className="overflow-auto" style={{ maxHeight: "80vh" }}>
              {scripts.map(s => (
                <ListGroup.Item 
                  key={s._id}
                  action 
                  className="bg-dark text-white border-secondary small"
                  onClick={() => setSelectedScript(s)}
                  active={selectedScript._id === s._id}
                >
                  {s.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        {/* EDITING AREA */}
        <Col md={8}>
          <Card className="p-4 shadow-lg border-0" style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(10px)", color: "#fff" }}>
            <h3 className="mb-4 text-info">{selectedScript._id ? "Edit Script" : "Create New Script"}</h3>
            
            <Form.Group className="mb-3">
              <Form.Label className="text-uppercase small fw-bold text-white">Objection Title</Form.Label>
              <Form.Control 
                className="bg-dark text-white border-secondary"
                value={selectedScript.title}
                onChange={(e) => setSelectedScript({...selectedScript, title: e.target.value})}
              />
            </Form.Group>

            <Row>
              <Col md={12} className="mb-3">
                <Badge bg="primary" className="mb-2">STEP 1: ACKNOWLEDGE (CALM)</Badge>
                <Form.Control as="textarea" rows={3} className="bg-dark text-white border-secondary"
                  value={selectedScript.calm}
                  onChange={(e) => setSelectedScript({...selectedScript, calm: e.target.value})}
                />
              </Col>
              <Col md={12} className="mb-3">
                <Badge bg="warning" text="dark" className="mb-2">STEP 2: CHECK (CONFIDENT)</Badge>
                <Form.Control as="textarea" rows={3} className="bg-dark text-white border-secondary"
                  value={selectedScript.confident}
                  onChange={(e) => setSelectedScript({...selectedScript, confident: e.target.value})}
                />
              </Col>
              <Col md={12} className="mb-4">
                <Badge bg="success" className="mb-2">STEP 3: ASK (CLOSE)</Badge>
                <Form.Control as="textarea" rows={3} className="bg-dark text-white border-secondary"
                  value={selectedScript.close}
                  onChange={(e) => setSelectedScript({...selectedScript, close: e.target.value})}
                />
              </Col>
            </Row>

            <div className="d-flex gap-2">
              <Button variant="info" className="px-5 fw-bold" onClick={handleSave}>SAVE CHANGES</Button>
              {selectedScript._id && (
                <Button variant="outline-danger" onClick={async () => {
                  if(window.confirm("Delete?")) {
                    await fetch(`http://localhost:5000/api/admin/objections/${selectedScript._id}`, { method: "DELETE" });
                    fetchScripts();
                    setSelectedScript({ title: "", calm: "", confident: "", close: "" });
                  }
                }}>DELETE</Button>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;