import React from 'react'
import AddEmployee from './components/Employee/AddEmployee/AddEmployee.js'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateEmployee from './components/Employee/UpdateEmployee/UpdateEmployee.js'
import GetEmployee from './components/Employee/GetEmployee/GetEmployee.js';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetEmployee />} />
          <Route path="/update/:id" element={<UpdateEmployee />} />
          <Route path="/create" element={<AddEmployee />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App