import React from "react"
import { Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "access-control-allow-origin, access-control-allow-headers",
}

class AddressesListComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            addresses: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loginSuccess = this.loginSuccess.bind(this);
    };

    loginSuccess(resp: any) {
        if (resp.status !== 200) {
            this.setState({message: "You are not logged in."});
        } else {
            resp.json().then((r: any) => {
                this.setState({addresses: r, message: ''});
            });
        }
    }

    handleSubmit(event: any) {
        event.preventDefault();
        console.log('Signin state', this.state);
        const host = process.env.REACT_APP_API_HOST;
        const path = '/v1/addresses';
        fetch(`${host}${path}`, {
            method: 'GET',
            credentials: 'include',
            headers
        }).then(resp => this.loginSuccess(resp))
            .catch(resp => console.error('catch', resp));
    }

    render() {
        const { addresses, message } = this.state;

        return (
            <Form className='w-100 pt-5' onSubmit={(values) => { this.handleSubmit(values) }}>
                <Row>
                    <Col className='text-center pb-3'>Show Addresses</Col>
                </Row>
                {Object.keys(addresses).length > 0 && (
                    <Row>
                        <Col className='text-center'>
                            {JSON.stringify(addresses)}
                        </Col>
                    </Row>
                )}
                {message?.length > 0 && (
                    <Row>
                        <Col className='text-center'>
                            {message}
                        </Col>
                    </Row>
                )}
                <Row>
                    <Col className='col-xl-3 offset-xl-3 col-lg-4 offset-lg-2 col-md-4 offset-md-2 text-left px-1'>
                        <Button color="secondary" size="xl">Show Addresses »</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default AddressesListComponent;
