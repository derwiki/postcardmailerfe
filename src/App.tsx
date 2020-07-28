import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import SignupComponent from './components/SignupComponent';
import SigninComponent from './components/SigninComponent';
import AboutComponent from './components/AboutComponent';
import PhotoUploadComponent from './components/PhotoUploadComponent';

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "access-control-allow-origin, access-control-allow-headers",
};

const postcardPreviewPost = () => {
  fetch('https://postcardmailerapi.herokuapp.com/v1/postcard/preview', {
    method: 'POST',
    body: JSON.stringify(
      {
        "Front": "<html><body>Front</body></html>",
        "Back": "<html><body>Back</body></html>",
        "To": [
          {
            "Name": "Adam Derewecki",
            "AddressLine1": "960 Wisconsin St",
            "AddressLine2": "",
            "City": "San Francisco",
            "State": "CA",
            "Zip": "94107"
          },
          {
            "Name": "Edie Derewecki",
            "AddressLine1": "609 Cambridge Road",
            "AddressLine2": "",
            "City": "Coshocton",
            "State": "OH",
            "Zip": "43812"
          }
        ],
        "From": {
          "Name": "Adam Derewecki",
          "AddressLine1": "960 Wisconsin St",
          "AddressLine2": "",
          "City": "San Francisco",
          "State": "CA",
          "Zip": "94107"
        }
      }
    ),
    headers
  }).then(response => response.json())
    .then(respJson => console.log('then', respJson))
    .catch(resp => console.error('catch', resp));
}

const App = () => {
  postcardPreviewPost();

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
        <PhotoUploadComponent />
        <SignupComponent />
        <SigninComponent />
        <AboutComponent />
      </Container>
    </div>
  );
}

export default App;
