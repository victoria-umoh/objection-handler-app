import { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";

function Admin() {
  const [formData, setFormData] = useState({
    title: "",
    calm: "",
    confident: "",
    close: ""
  });
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);

  // Unified change handler to keep code DRY
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!formData.title) return setStatus({ type: "danger", msg: "Title is required!" });

    setLoading(true);
    const API_URL = process.env.REACT_APP_API_URL_LOCAL || process.env.REACT_APP_API_URL;
    try {
      const res = await fetch(`${API_URL}/admin/add-objection`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData) // Flattened to match your backend's ...req.body
      });

      if (res.ok) {
        setStatus({ type: "success", msg: "Objection added successfully!" });
        setFormData({ title: "", calm: "", confident: "", close: "" });
      }
    } catch (err) {
      setStatus({ type: "danger", msg: "Failed to connect to server." });
    } finally {
      setLoading(false);
      // Clear alert after 3 seconds
      setTimeout(() => setStatus({ type: "", msg: "" }), 3000);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <Card className="shadow-sm p-4">
        <h3 className="mb-4 text-center">🛡️ Script Library Management</h3>
        
        {status.msg && <Alert variant={status.type}>{status.msg}</Alert>}

        <Form onSubmit={submit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Objection Title</Form.Label>
            <Form.Control
              name="title"
              placeholder="e.g., 'I need to talk to my spouse'"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Calm Script (Educational/Low Pressure)</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="calm"
              value={formData.calm}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confident Script (Authority/Fact-based)</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="confident"
              value={formData.confident}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Close Script (Direct/Action-oriented)</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="close"
              value={formData.close}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100" disabled={loading}>
            {loading ? "Saving..." : "Save Objection to Database"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Admin;