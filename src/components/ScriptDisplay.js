import { useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

function ScriptDisplay({ script, objection, tone, setScript }) {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL_LOCAL || process.env.REACT_APP_API_URL;
  const generateAI = async () => {
    if (!objection) return alert("Select an objection first!");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/generate-script`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ objection, tone })
      });
      const data = await res.json();
      setScript(data.script);
    } catch (err) {
      console.error("AI Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border rounded p-4 mt-3 bg-light shadow-sm">
      <h6 className="text-muted small mb-2">REBUTTAL SCRIPT</h6>
      <p className="lead">{script || "Select an objection to see the script..."}</p>

      <div className="mt-3">
        <Button size="sm" variant="outline-dark" className="me-2" onClick={handleCopy} disabled={!script}>
          {copied ? "✅ Copied!" : "Copy Script"}
        </Button>

        <Button size="sm" variant="secondary" onClick={generateAI} disabled={loading || !objection}>
          {loading ? <Spinner as="span" animation="border" size="sm" /> : "Generate AI Version"}
        </Button>
      </div>
    </div>
  );
}
export default ScriptDisplay;