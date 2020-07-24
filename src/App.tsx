import React from 'react';
import { Container, Row, Col } from 'reactstrap';
// import logo from './logo.svg';
import './App.css';
import SignupComponent from './components/SignupComponent';
import SigninComponent from './components/SigninComponent';
import AboutComponent from './components/AboutComponent';


const App = () => {
  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col className='col px-0'>
            <div id='hero' />
            <h1 className='text-center m-2'>
              Send a Free Postcard Right Now
            </h1>
          </Col>
        </Row>
      </Container>
      <Container>
        <SignupComponent />
        <SigninComponent />
        <AboutComponent />
      </Container>
    </div>
  );
}

export default App;
