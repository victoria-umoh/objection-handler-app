import { Accordion, Card, Badge } from "react-bootstrap";

function ScriptPreview({ script }) {
  if (!script || !script.phases) return null;

  return (
    <div className="preview-container p-3 rounded" style={{ background: "#1a1a1a", border: "2px dashed #0dcaf0" }}>
      <div className="text-center mb-3">
        <Badge bg="info" className="text-dark">AGENT VIEW PREVIEW</Badge>
      </div>
      
      <Card className="bg-dark text-white border-0 shadow-lg">
        <Card.Body>
          <h5 className="text-info border-bottom border-secondary pb-2">🎙️ {script.name}</h5>
          
          <Accordion defaultActiveKey="0" flush className="dialer-accordion">
            {script.phases.map((phase, idx) => (
              <Accordion.Item eventKey={idx.toString()} key={idx} className="bg-transparent border-secondary">
                <Accordion.Header className="custom-accordion-header">
                  <span className="fw-bold text-info">{idx + 1}. {phase.title}</span>
                </Accordion.Header>
                <Accordion.Body className="small text-light">
                  <p className="mb-3" style={{ whiteSpace: "pre-wrap" }}>{phase.content}</p>
                  
                  {phase.questions && phase.questions.length > 0 && (
                    <div className="bg-black bg-opacity-50 p-2 rounded border-start border-info border-3">
                      {phase.questions.map((q, qIdx) => (
                        <div key={qIdx} className="mb-2">
                          <span className="text-info fw-bold">Q{qIdx + 1}: </span>
                          <span>{q.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ScriptPreview;
