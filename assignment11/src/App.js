import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EmployeeForm from "./components/EmployeeForm";

const API_URL = "http://localhost:3000/employees";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null); // New

  // Fetch employees
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setEmployees)
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Add new employee
const addEmployee = async (emp) => {
  emp.id = Number(emp.id); // force numeric ID

  if (employees.find((e) => e.id === emp.id || e.email === emp.email)) {
    return alert("ID and Email must be unique!");
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emp),
    });
    const saved = await res.json();
    setEmployees((prev) => [...prev, saved]);
    setShowForm(false);
  } catch (err) {
    console.error("Add error:", err);
  }
};

  // Delete employee
  const deleteEmployee = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  } catch (err) {
    console.error("Delete error:", err);
  }
};
  // Start editing
  const editEmployee = (emp) => {
    setEditingEmployee(emp);
    setShowForm(true);
  };

  // Update employee
  const updateEmployee = async (updatedEmp) => {
  updatedEmp.id = Number(updatedEmp.id); // normalize ID

  try {
    const res = await fetch(`${API_URL}/${updatedEmp.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEmp),
    });

    const saved = await res.json(); // get latest from server

    setEmployees((prev) =>
      prev.map((e) => (e.id === saved.id ? saved : e))
    );
    setEditingEmployee(null);
    setShowForm(false);
  } catch (err) {
    console.error("Update error:", err);
  }

};
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="container my-5 flex-grow-1">
        {showForm ? (
          <EmployeeForm
            addEmployee={addEmployee}
            updateEmployee={updateEmployee}
            editingEmployee={editingEmployee}
          />
        ) : (
          <>
            <button
              className="btn-mb-3"
              onClick={() => setShowForm(true)}
            >
              Add Employee
            </button>

            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(({ id, name, email }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>
                      <button
                        className="btn-sm me-2"
                        onClick={() => editEmployee({ id, name, email })}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-sm"
                        onClick={() => deleteEmployee(id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default App;
