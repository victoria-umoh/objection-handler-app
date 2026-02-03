import React, { useState, useEffect } from "react";
import { Accordion, Card, Button, Form, Row, Col, Stack } from "react-bootstrap";
import ScriptPreview from "./ScriptPreview";  

function DiscoveryScriptEditor({ script, onUpdate }) {
  // Local state for editing. Re-syncs if the parent changes 'script'
  const [localScript, setLocalScript] = useState(null);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    if (script) setLocalScript(JSON.parse(JSON.stringify(script)));
  }, [script]);

  if (!localScript) return null;

  const updatePhase = (idx, field, value) => {
    const updatedPhases = [...localScript.phases];
    updatedPhases[idx][field] = value;
    setLocalScript({ ...localScript, phases: updatedPhases });
  };

  const addQuestion = (pIdx) => {
    const updatedPhases = [...localScript.phases];
    updatedPhases[pIdx].questions.push({
      number: updatedPhases[pIdx].questions.length + 1,
      text: "",
      category: "Discovery"
    });
    setLocalScript({ ...localScript, phases: updatedPhases });
  };

  const addPhase = () => {
    setLocalScript({
      ...localScript,
      phases: [...localScript.phases, { title: "New Phase", order: localScript.phases.length, content: "", questions: [] }]
    });
  };

  return (
    <Card className="bg-black border-info shadow-lg p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="text-info mb-0">Phase Configurator</h5>
        <div className="btn-group">
          <Button 
            variant={!isPreview ? "info" : "outline-info"} 
            size="sm" 
            onClick={() => setIsPreview(false)}
          >
            Editor
          </Button>
          <Button 
            variant={isPreview ? "info" : "outline-info"} 
            size="sm" 
            onClick={() => setIsPreview(true)}
          >
            Preview
          </Button>
        </div>
      </div>

    {/* CONDITIONAL RENDERING */}
    {isPreview ? (
      <ScriptPreview script={localScript} />
    ) : (
      <>
        {/* Your existing Accordion and Phase Logic here */}
        <Button variant="outline-info" size="sm" onClick={addPhase} className="mb-3 w-100">
          + Add New Phase
        </Button>
        {/* ... existing map logic ... */}
      </>
    )}

    <div className="d-grid mt-4">
      <Button variant="success" className="fw-bold py-2" onClick={() => onUpdate(localScript._id, localScript)}>
        💾 Sync Changes to Server
      </Button>
    </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="text-info mb-0">Phase Configurator</h5>
        <Button variant="outline-info" size="sm" onClick={addPhase}>+ Add New Phase</Button>
      </div>

      <Accordion flush className="mb-4">
        {localScript.phases.map((phase, pIdx) => (
          <Accordion.Item eventKey={pIdx.toString()} key={pIdx} className="bg-transparent text-white border-bottom border-secondary">
            <Accordion.Header className="bg-dark text-info">
              {pIdx + 1}. {phase.title || "Untitled Phase"}
            </Accordion.Header>
            <Accordion.Body className="bg-dark">
              <Row className="g-3">
                <Col md={12}>
                  <Form.Label className="small text-muted">Phase Title</Form.Label>
                  <Form.Control className="bg-secondary border-0 text-white" value={phase.title} onChange={e => updatePhase(pIdx, "title", e.target.value)} />
                </Col>
                <Col md={12}>
                  <Form.Label className="small text-muted">Core Script Text (The "What to Say")</Form.Label>
                  <Form.Control as="textarea" rows={3} className="bg-secondary border-0 text-white" value={phase.content} onChange={e => updatePhase(pIdx, "content", e.target.value)} />
                </Col>
                
                <Col md={12}>
                  <div className="d-flex justify-content-between align-items-center mb-2 mt-3">
                    <Form.Label className="small text-info mb-0">Discovery Questions</Form.Label>
                    <Button variant="link" className="text-info p-0 text-decoration-none" onClick={() => addQuestion(pIdx)}>+ Add Question</Button>
                  </div>
                  <Stack gap={2}>
                    {phase.questions.map((q, qIdx) => (
                      <Row key={qIdx} className="g-2 align-items-center">
                        <Col xs={1}><span className="text-muted">#{qIdx + 1}</span></Col>
                        <Col>
                          <Form.Control size="sm" className="bg-dark text-white border-secondary" placeholder="Ask about family/burial..." value={q.text} 
                            onChange={e => {
                                const newPhases = [...localScript.phases];
                                newPhases[pIdx].questions[qIdx].text = e.target.value;
                                setLocalScript({...localScript, phases: newPhases});
                            }} 
                          />
                        </Col>
                        <Col xs="auto">
                          <Button variant="outline-danger" size="sm" onClick={() => {
                             const newPhases = [...localScript.phases];
                             newPhases[pIdx].questions.splice(qIdx, 1);
                             setLocalScript({...localScript, phases: newPhases});
                          }}>×</Button>
                        </Col>
                      </Row>
                    ))}
                  </Stack>
                </Col>
              </Row>
              <div className="text-end mt-3">
                <Button variant="outline-danger" size="sm" onClick={() => {
                  const filtered = localScript.phases.filter((_, i) => i !== pIdx);
                  setLocalScript({...localScript, phases: filtered});
                }}>Remove This Phase</Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <div className="d-grid">
        <Button variant="success" className="fw-bold py-2" onClick={() => onUpdate(localScript._id, localScript)}>
          💾 Sync Changes to Server
        </Button>
      </div>
    </Card>
  );
}

export default DiscoveryScriptEditor;