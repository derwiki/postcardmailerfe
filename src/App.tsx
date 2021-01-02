import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import NavbarComponent from './components/NavbarComponent';
import AboutComponent from './components/AboutComponent';
import HomepageComponent from './components/HomepageComponent';


const App = () => {
  return (
      <div className="App">
        <NavbarComponent toggle={() => true} />
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
          <HomepageComponent />
          <AboutComponent />
        </Container>
      </div>
  );
}

export default App;
