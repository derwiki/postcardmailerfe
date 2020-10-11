import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import SignupComponent from './components/SignupComponent';
import SigninComponent from './components/SigninComponent';
import AboutComponent from './components/AboutComponent';
import AddressesListComponent from './components/AddressesListComponent';

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "access-control-allow-origin, access-control-allow-headers",
};


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
        <AddressesListComponent />
        <AboutComponent />
      </Container>
    </div>
  );
}

export default App;
