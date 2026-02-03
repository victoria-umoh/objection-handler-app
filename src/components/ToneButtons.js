import Button from "react-bootstrap/Button";

function ToneButtons({ tone, setTone }) {
  const tones = [
  { id: "calm", label: "Step 1: Acknowledge" },
  { id: "confident", label: "Step 2: Check/Value" },
  { id: "close", label: "Step 3: Ask/Engage" },
];

  return (
    <div className="my-3">
      {tones.map((t) => (
        <Button
          key={t.id}
          variant={tone === t.id ? t.id === "calm" ? "primary" : t.id === "confident" ? "warning" : "success" : t.variant}
          className="me-2"
          onClick={() => setTone(t.id)}
        >
          {t.label}
        </Button>
      ))}
    </div>
  );
}

export default ToneButtons;
