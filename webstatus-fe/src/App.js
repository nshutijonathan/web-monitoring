import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container } from "react-bootstrap";
import Websites from "./components/Websites";

function App() {
  return (
    <Container className="py-4">
      <Websites />
    </Container>
  );
}

export default App;