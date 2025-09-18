// src/App.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EmployeeForm from "./components/EmployeeForm";

import { useSelector, useDispatch } from "react-redux";
import { addEmployee, deleteEmployee, editEmployee } from "./redux/employeeSlice";

const App = () => {
  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Add or Edit Employee
  const handleSaveEmployee = (employee) => {
    if (editingEmployee) {
      dispatch(editEmployee(employee));
      setEditingEmployee(null);
    } else {
      dispatch(addEmployee(employee));
    }
    setShowForm(false);
  };

  // Delete employee
  const handleDeleteEmployee = (id) => {
    dispatch(deleteEmployee(id));
  };

  // Edit employee
  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="container my-5 flex-grow-1">
        <div className="text-center mb-4">
          <h3>CRUD OPERATIONS ON EMPLOYEE DATA USING REDUX</h3>
        </div>
        {showForm ? (
          <EmployeeForm
            saveEmployee={handleSaveEmployee}
            initialData={editingEmployee}
          />
        ) : (
          <>
            <button
              className="btn btn-primary mb-3"
              onClick={() => {
                setEditingEmployee(null); // ensure blank form
                setShowForm(true);
              }}
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
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEditEmployee(emp)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteEmployee(emp.id)}
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
