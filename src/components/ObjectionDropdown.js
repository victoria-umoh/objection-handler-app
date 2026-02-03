import Form from "react-bootstrap/Form";

function ObjectionDropdown({ objections, onSelect }) {
  return (
    <Form.Select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select an objection</option>
      {objections.map((obj) => (
        <option key={obj._id} value={obj._id}>
          {obj.title}
        </option>
      ))}
    </Form.Select>
  );
}

export default ObjectionDropdown;
