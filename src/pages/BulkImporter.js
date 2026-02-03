import { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

function BulkImporter() {
  const [jsonData, setJsonData] = useState("");
  const [status, setStatus] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL_LOCAL || process.env.REACT_APP_API_URL;
  const handleImport = async () => {
    try {
      const parsedData = JSON.parse(jsonData);
      const res = await fetch(`${API_URL}/admin/bulk-add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });
      const result = await res.json();
      setStatus({ type: "success", msg: result.message });
      setJsonData(""); // Clear on success
    } catch (err) {
      setStatus({ type: "danger", msg: "Invalid JSON format or Server Error." });
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "800px" }}>
      <Card className="p-4 shadow bg-dark text-white border-info">
        <h3>🚀 Bulk Script Importer</h3>
        <p className="text-info small">Paste your JSON array below to populate your database instantly.</p>
        
        {status && <Alert variant={status.type}>{status.msg}</Alert>}

        <Form.Control
          as="textarea"
          rows={12}
          className="bg-secondary text-white border-0 mb-3"
          placeholder='[{"title": "Example", "calm": "Step 1...", "confident": "Step 2...", "close": "Step 3..."}]'
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
        />
        
        <Button variant="info" className="w-100 fw-bold" onClick={handleImport}>
          RUN MASSIVE IMPORT
        </Button>
      </Card>
    </Container>
  );
}

export default BulkImporter;