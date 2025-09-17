import React, { useState } from "react";

const EmployeeForm = ({ addEmployee }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id || !name || !email) {
      alert("All fields are required!");
      return;
    }
    addEmployee({ id: parseInt(id), name, email });
    setId("");
    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3">
      <h3>Add Employee</h3>
      <div className="mb-3">
        <label>ID:</label>
        <input
          type="number"
          className="form-control"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Name:</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Email:</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </form>
  );
};

export default EmployeeForm;
