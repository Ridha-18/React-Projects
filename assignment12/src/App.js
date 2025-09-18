import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEmployees } from "./redux/employeeSlice"; // <- use setEmployees
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);

  useEffect(() => {
    fetch("/employees.json") // fetch from public folder
      .then((res) => res.json())
      .then((data) => dispatch(setEmployees(data.employees)));
  }, [dispatch]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="container my-5 flex-grow-1">
        <h3 className="text-center mb-4">Employee Directory</h3>

        <div className="row">
          {employees.map((emp) => (
            <div key={emp.id} className="col-md-4 mb-1">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{emp.name}</h5>
                  <p className="card-text">{emp.email}</p>
                  <span className="badge bg-primary">ID: {emp.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
