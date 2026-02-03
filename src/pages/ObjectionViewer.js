import { useState, useEffect } from "react";
import ObjectionDropdown from "../components/ObjectionDropdown";
import ToneButtons from "../components/ToneButtons";
import ScriptDisplay from "../components/ScriptDisplay";
import DiscoveryScript from "./DiscoveryScript";
import { Container, Row, Col, Card } from "react-bootstrap";

function ObjectionViewer() {
  const [objections, setObjections] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [tone, setTone] = useState("calm"); // Default tone
  const [script, setScript] = useState("");

  const API_URL = process.env.REACT_APP_API_URL_LOCAL || process.env.REACT_APP_API_URL;
  // 1. Fetch data from your new MongoDB backend
  useEffect(() => {
    fetch(`${API_URL}/objections`)
      .then((res) => res.json())
      .then((data) => setObjections(data))
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  // 2. Handle selection logic
  const handleSelect = (id) => {
    setSelectedId(id);
    const found = objections.find((obj) => obj._id === id);
    if (found) {
      setScript(found.scripts?.[tone] || "No script available for this tone.");
    }
  };
  // 3. Update script when tone changes
  useEffect(() => {
    const found = objections.find((obj) => obj._id === selectedId);
    if (found) {
      setScript(found.scripts?.[tone] || "No script available.");
    }
  }, [tone, selectedId, objections]);

  return (

        <div style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", minHeight: "100vh", padding: "20px" }}>
          <Container fluid>
            <Row>
              {/* LEFT: OBJECTION HANDLING */}
              <Col lg={7}>
                <div className="mb-4">
                  <h1 className="text-white fw-bold">🛡️ Objection <span className="text-info">Crusher</span></h1>
                </div>
                
                <ObjectionDropdown objections={objections} onSelect={handleSelect} />
                <ToneButtons tone={tone} setTone={setTone} />
                <ScriptDisplay script={script} setScript={setScript} />
                
                {/* AI TOOL HERE */}
              </Col>

              {/* RIGHT: PERSISTENT DISCOVERY SCRIPT */}
              <Col lg={5}>
                <DiscoveryScript />
                
                {/* QUICK TIPS CARD */}
                <Card className="mt-3 bg-secondary text-white p-3 border-0 small">
                  <h6 className="text-warning">💡 Tone Tip</h6>
                  "A calm, caring, confident tone will always outperform the best sales script. Speak to the heart first."
                </Card>
              </Col>
            </Row>
          </Container>
      </div>
  );
}

export default ObjectionViewer;