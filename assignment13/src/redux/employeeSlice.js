// src/redux/employeeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, name: "Alice", email: "alice@gmail.com" },
  { id: 2, name: "Bob", email: "bob@gmail.com" },
  { id: 3, name: "Charlie", email: "charlie@gmail.com" },
  { id: 4, name: "David", email: "david@gmail.com" },
  { id: 5, name: "Eva", email: "eva@gmail.com" },
  { id: 6, name: "Ridha", email: "ridhahakeem@gmail.com" },
];

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      const newEmployee = action.payload;

      // Check uniqueness
      if (
        state.some((emp) => emp.id === newEmployee.id) ||
        state.some((emp) => emp.email === newEmployee.email)
      ) {
        alert("ID and Email must be unique!");
        return;
      }

      state.push(newEmployee);
    },

    deleteEmployee: (state, action) => {
      return state.filter((emp) => emp.id !== action.payload);
    },

    editEmployee: (state, action) => {
      const updatedEmp = action.payload;
      const index = state.findIndex((emp) => emp.id === updatedEmp.id);
      if (index !== -1) {
        state[index] = updatedEmp; // replace old with new
      }
    },
  },
});

export const { addEmployee, deleteEmployee , editEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
