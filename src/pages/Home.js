import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import ObjectionDropdown from "../components/ObjectionDropdown";
import ToneButtons from "../components/ToneButtons";
import ScriptDisplay from "../components/ScriptDisplay";

function Home() {
  const [objections, setObjections] = useState([]);
  const [selectedObjection, setSelectedObjection] = useState(null);
  const [tone, setTone] = useState("calm");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL_LOCAL || process.env.REACT_APP_API_URL;
  useEffect(() => {
    fetch(`${API_URL}/objections`)
      .then((res) => res.json())
      .then((data) => {
        setObjections(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching objections:", err);
        setLoading(false);
      });
  }, []);

  const handleSelect = (id) => {
    const found = objections.find((o) => o.id === Number(id));
    setSelectedObjection(found);
    setTone("calm");
    setScript("");
  };

  if (loading) {
    return <Container className="mt-5">Loading objections...</Container>;
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-3">Life Insurance Objection Helper</h2>

      <ObjectionDropdown
        objections={objections}
        onSelect={handleSelect}
      />

      {selectedObjection && (
        <>
          <ToneButtons setTone={setTone} />
          <ScriptDisplay
            script={script || selectedObjection.scripts[tone]}
            objection={selectedObjection.title}
            tone={tone}
            setScript={setScript}
          />
        </>
      )}
    </Container>
  );
}

export default Home;
