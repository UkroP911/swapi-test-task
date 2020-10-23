import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import MainPage from "./pages/MainPage";
import Planet from "./pages/Planet";

function App() {
  return (
    <Container>
      <Router>
          <Route exact path="/" component={MainPage} />
          <Route path="/planets/:id" component={Planet} />
      </Router>
    </Container>
  );
}

export default App;
