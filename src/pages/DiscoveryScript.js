import { Accordion, Card, Badge } from "react-bootstrap";

function DiscoveryScript() {
  return (
    <Card className="bg-dark text-white border-info shadow-lg p-3">
      <div className="d-flex justify-content-between">
        <h4 className="text-info">🎙️ Discovery & Handoff</h4>
        <Badge bg="success">Live Call Path</Badge>
      </div>
      <hr className="border-secondary" />
      
      <Accordion defaultActiveKey="0" flush>
        {/* PHASE 1: OPENER */}
        <Accordion.Item eventKey="0" className="bg-transparent text-white">
          <Accordion.Header>1. The Intro & Health Check</Accordion.Header>
          <Accordion.Body>
            <p><strong>Rep:</strong> "The reason for my call is regarding our updated Final Expense plans..."</p>
            <ul className="small text-info">
              <li>Confirm Age (18-80)</li>
              <li>Health Check: Not in hospital? Not terminal? >24 months to live?</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        {/* PHASE 2: DISCOVERY QUESTIONS */}
        <Accordion.Item eventKey="1" className="bg-transparent text-white border-top border-secondary">
          <Accordion.Header>2. Emotional Discovery ❤️</Accordion.Header>
          <Accordion.Body>
            <div className="p-2 border-start border-info mb-3">
              <p className="small mb-1 text-uppercase text-muted">Question #1</p>
              <p>“Is there a special person you’d like to make sure is protected... like your spouse or children? ❤️”</p>
            </div>
            <div className="p-2 border-start border-warning mb-3">
              <p className="small mb-1 text-uppercase text-muted">Question #2</p>
              <p>“Have you thought about whether you’d prefer a traditional burial ⚰️ or cremation 🔥?”</p>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* PHASE 3: HANDOFF */}
        <Accordion.Item eventKey="2" className="bg-transparent text-white border-top border-secondary">
          <Accordion.Header>3. The Handoff (The Transfer)</Accordion.Header>
          <Accordion.Body>
             <p className="bg-info text-black p-2 rounded fw-bold">"I’ve got [First Name] from [Province] on the line. They’re looking to protect their family..."</p>
             <p className="small mt-2">Wait 5 seconds to ensure connection.</p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Card>
  );
}
export default DiscoveryScript;