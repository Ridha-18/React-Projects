import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import logimg from "./images/logimg.jpg"; 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [showForm, setShowForm] = useState(false);     
  const [name, setName] = useState("");               
  const [email, setEmail] = useState("");              
  const [submitted, setSubmitted] = useState(false);   

  
  const handleLoginLogout = () => {
    if (isLoggedIn) {
      
      setIsLoggedIn(false);
      setSubmitted(false);
      setName("");
      setEmail("");
    } else {
      
      setShowForm(true);
    }
  };

  // Submit login form
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowForm(false);
    setSubmitted(true);
  };

  return (
  <div className="d-flex flex-column min-vh-100">

    <Navbar isLoggedIn={isLoggedIn} handleLoginLogout={handleLoginLogout} />

    {/* Main content area */}
    <div className="container my-5 flex-grow-1">
      {!isLoggedIn && !showForm && (
        <p className="text-center">Page is empty. Click Login to continue.</p>
      )}

      {showForm && !isLoggedIn && (
        <div className="row">
          <div className="col-md-6 text-center">
            <img src={logimg} alt="Login" className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h3>Login Form</h3>
            <form onSubmit={handleSubmit}>
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
                Login Now
              </button>
            </form>
          </div>
        </div>
      )}

      {submitted && isLoggedIn && <Welcome name={name} />}
    </div>

    {/* Footer */}
    <Footer />
  </div>
);

};

export default App;
