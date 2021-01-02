import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import SignupComponent from './components/SignupComponent';
import SigninComponent from './components/SigninComponent';
import NavbarComponent from './components/NavbarComponent';
import AboutComponent from './components/AboutComponent';
import HomepageComponent from './components/HomepageComponent';
import AddressesListComponent from './components/AddressesListComponent';
import UserContext from './components/UserComponent';

const user = {
  signedIn: false,
}

const initialState = {
  isAuthenticated: false,
};
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{state, dispatch}}>
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
    </UserContext.Provider>
  );
}

export default App;
