import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EmployeeForm from "./components/EmployeeForm";

const API_URL = "http://localhost:3000/employees";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch employees
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setEmployees)
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Add new employee
  const addEmployee = async (emp) => {
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
  const deleteEmployee = (id) =>
    setEmployees((prev) => prev.filter((e) => e.id !== id));

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="container my-5 flex-grow-1">
        {showForm ? (
          <EmployeeForm addEmployee={addEmployee} />
        ) : (
          <>
            <button
              className="btn btn-primary mb-3"
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
                        className="btn btn-danger btn-sm"
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
