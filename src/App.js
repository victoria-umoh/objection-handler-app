import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ObjectionViewer from "./pages/ObjectionViewer";
import Admin from "./pages/Admin";
import { Navbar, Nav, Container } from "react-bootstrap";
import ManageScripts from "./pages/ManageScripts";
import AdminDashboard from "./pages/AdminDashboard";
import BulkImporter from "./pages/BulkImporter";
import DiscoveryManager from "./pages/DiscoveryManager";

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">🛡️ Objection Crusher</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
            <Nav.Link as={Link} to="/manage">Manage Scripts</Nav.Link>
            <Nav.Link as={Link} to="/bulk">Bulk Importer</Nav.Link>
            <Nav.Link as={Link} to="/admin_dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/discovery_manager">Discovery Manager</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<ObjectionViewer />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/manage" element={<ManageScripts />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/bulk" element={<BulkImporter />} />
        <Route path="/discovery_manager" element={<DiscoveryManager />} />
      </Routes>
    </Router>
  );
}

export default App;