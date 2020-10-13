import React from "react"
import { Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "access-control-allow-origin, access-control-allow-headers",
}

class SigninComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            message: '',
            signedIn: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.loginSuccess = this.loginSuccess.bind(this);
        this.handleSignout = this.handleSignout.bind(this);
    };

    loginSuccess(resp: any) {
        console.log(`Status ${resp.status}, resp`, resp);
        if (resp.status !== 200) {
            this.setState({signedIn: false, message: 'There was a problem logging in. Please check your email and password and try again.'})
        } else {
            this.setState({signedIn: true, message: 'Logged in successfully!'})
        }
    }

    handleSubmit(event: any) {
        event.preventDefault();
        console.log('Signin state', this.state);
        const host = process.env.REACT_APP_API_HOST;
        const path = '/v1/signin';
        const url = `${host}${path}`;
        console.log('signin fetch', url);
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(this.state),
            credentials: 'include',
            referrerPolicy: 'origin-when-cross-origin',
            headers
        }).then(resp => this.loginSuccess(resp))
            .catch(resp => console.error('catch', resp));
    }

    handleFormChange(event: any) {
        const { target } = event;
        console.log('form change', target.name, target.value);
        this.setState({[target.name]: target.value});
    }

    handleSignout(event: any) {

    }


    render() {
        // @ts-ignore
        const { email, password, message, signedIn } = this.state;

        return (
            <>
                <Form className='w-100 pt-5' onSubmit={(values) => { this.handleSubmit(values) }}>
                    <Row>
                        <Col className='text-center pb-3'>Already have an account?</Col>
                    </Row>
                    <Row>
                        <Col className='col-xl-3 offset-xl-3 col-lg-4 offset-lg-2 col-md-4 offset-md-2 text-left px-1'>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="signin-email" value={email} onChange={this.handleFormChange}/>
                            </FormGroup>
                        </Col>
                        <Col className='col-xl-3 col-lg-4 col-md-4 text-left px-1'>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="signin-password" value={password} onChange={this.handleFormChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='col-xl-3 offset-xl-3 col-lg-4 offset-lg-2 col-md-4 offset-md-2 text-left px-1'>
                            <Button color="secondary" size="xl">Sign in »</Button>
                        </Col>
                    </Row>
                    {message && (
                        <Row>
                            <Col className="text-center">
                                {message}
                            </Col>
                        </Row>
                    )}
                </Form>
                {signedIn && (
                    <Row>
                        <Col className="text-center">
                            <Form className='w-100 pt-5' onSubmit={(values) => { this.handleSignout(values) }}>
                                <Col className='col-xl-3 offset-xl-3 col-lg-4 offset-lg-2 col-md-4 offset-md-2 text-left px-1'>
                                    <Button color="secondary" size="xl">Sign out »</Button>
                                </Col>
                            </Form>
                        </Col>
                    </Row>
                )}
            </>
        );
    }
}

export default SigninComponent;
