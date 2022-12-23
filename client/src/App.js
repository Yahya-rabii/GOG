import React from "react";

import Register from "./pages/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Cards from "./pages/Cards";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Cards />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
