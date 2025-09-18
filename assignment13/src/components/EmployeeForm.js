import React, { useState, useEffect } from "react";

const EmployeeForm = ({ saveEmployee, initialData }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Pre-fill form if editing
  useEffect(() => {
    if (initialData) {
      setId(initialData.id);
      setName(initialData.name);
      setEmail(initialData.email);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveEmployee({ id: Number(id), name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>ID</label>
        <input
          type="number"
          className="form-control"
          value={id}
          onChange={(e) => setId(e.target.value)}
          disabled={!!initialData} // prevent changing ID while editing
          required
        />
      </div>
      <div className="mb-3">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-success">
        {initialData ? "Update Employee" : "Add Employee"}
      </button>
    </form>
  );
};

export default EmployeeForm;
