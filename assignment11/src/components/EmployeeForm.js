import React, { useState, useEffect } from "react";

const EmployeeForm = ({ addEmployee, updateEmployee, editingEmployee }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Populate form when editing
  useEffect(() => {
    if (editingEmployee) {
      setId(editingEmployee.id);
      setName(editingEmployee.name);
      setEmail(editingEmployee.email);
    }
  }, [editingEmployee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id || !name || !email) {
      alert("All fields are required!");
      return;
    }

    const empData = { id: parseInt(id), name, email };

    if (editingEmployee) {
      updateEmployee(empData);
    } else {
      addEmployee(empData);
    }

    setId("");
    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3">
      <h3>{editingEmployee ? "Edit Employee" : "Add Employee"}</h3>
      <div className="mb-3">
        <label>ID:</label>
        <input
          type="number"
          className="form-control"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          disabled={!!editingEmployee} // Cannot change ID while editing
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

      <button type="submit" className="btn-me-2">
        {editingEmployee ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default EmployeeForm;
