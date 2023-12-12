import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Mercadoria from "./components/pages/Mercadoria/Mercadoria";
import Entrada from "./components/pages/Entrada/Entrada";
import Saida from "./components/pages/Saida/Saida";
import Container from "./components/layout/Container/Container";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import Inicio from "./components/pages/Inicio/Inicio";

function App() {
  return (
    <Router>
      <Navbar />

      <Container customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Inicio />} />
          <Route exact path="/mercadoria" element={<Mercadoria />} />
          <Route exact path="/entrada" element={<Entrada />} />
          <Route exact path="/saida" element={<Saida />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
