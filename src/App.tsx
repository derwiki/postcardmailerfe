import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import SignupComponent from './components/SignupComponent';
import SigninComponent from './components/SigninComponent';
import AboutComponent from './components/AboutComponent';

const API_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "access-control-allow-origin, access-control-allow-headers",
};

const fetchTest = () => {
  fetch('https://postcardmailerapi.herokuapp.com/v1/signup', {
    method: 'POST',
    body: JSON.stringify({
      'email': 'a@der.wiki',
      'password': 'hunter2'
    }),
    headers: API_HEADERS
  }).then(response => response.json())
    .then(respJson => console.log('then', respJson))
    .catch(resp => console.error('catch', resp));
}

const App = () => {
  fetchTest();

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
