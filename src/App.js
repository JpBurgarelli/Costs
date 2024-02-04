import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/pages/home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';
import Container from './components/Layouts/Container';
import NavBar from './components/Layouts/NavBar';
import Footer from './components/Layouts/Footer';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Container customClass="min-height">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/projects" element={<Projects />}></Route>
            <Route path="/company" element={<Company />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/newproject" element={<NewProject />}></Route>
            <Route path="/projects" element={<Projects />}></Route>
            <Route path="/project/:id" element={<Project />}></Route>
          </Routes>
        </Container>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
