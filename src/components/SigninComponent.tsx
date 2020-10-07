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
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.loginSuccess = this.loginSuccess.bind(this);
    };

    loginSuccess(resp: any) {
        console.log(resp);
    }

    handleSubmit(event: any) {
        event.preventDefault();
        console.log('Signin state', this.state);
        fetch('http://localhost:5000/v1/signin', {
            method: 'POST',
            body: JSON.stringify(this.state),
            credentials: 'include',
            headers
        }).then(resp => this.loginSuccess(resp))
            .catch(resp => console.error('catch', resp));
    }

    handleFormChange(event: any) {
        const { target } = event;
        console.log('form change', target.name, target.value);
        this.setState({[target.name]: target.value});
    }


    render() {
        // @ts-ignore
        const { email, password } = this.state;

        return (
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
            </Form>
        );
    }
}

export default SigninComponent;
