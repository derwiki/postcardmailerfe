import React from "react"
import { Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import PhotoUploadComponent from "./PhotoUploadComponent";


class SignupNameAddressComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }


    render() {
        const { labelPrefix, formPrefix } = this.props;
        const { handleFormChange } = this.props;

        return (
            <>
                <Row>
                    <Col className='col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-12 text-left field px-0'>
                        <FormGroup>
                            <Label for="name">{labelPrefix} Name</Label>
                            <Input type="text" name={formPrefix + '_name'} id={formPrefix + '_name'} value={this.state[formPrefix + '_name']} className="form-control" placeholder="Ansel Adams" onChange={handleFormChange} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                <Col className='col-xl-4 offset-xl-3 col-lg-6 offset-lg-2 col-md-6 offset-md-2 col-sm-8 col-8 text-left field pl-0'>
                    <FormGroup>
                        <Label for="name">{labelPrefix} Address</Label>
                        <Input type="text" name={formPrefix + '_address1'} id={formPrefix + '_address1'} value={this.state[formPrefix + '_address1']} className="form-control" onChange={handleFormChange} />
                    </FormGroup>
                </Col>
                <Col className='col-md-2 col-sm-4 col-4 text-left field px-0'>
                    <FormGroup>
                        <Label for="name">Unit/Apt</Label>
                        <Input type="text" name={formPrefix + '_address2'} id={formPrefix + '_address2'} value={this.state[formPrefix + '_address2']} className="form-control" onChange={handleFormChange} />
                    </FormGroup>
                </Col>
                </Row>
                <Row>
                    <Col className='col-xl-3 offset-xl-3 col-lg-4 offset-lg-2 col-md-4 offset-md-2 col-sm-6 col-12 text-left field pl-0'>
                        <FormGroup>
                            <Label for="name">City</Label>
                            <Input type="text" name={formPrefix + '_city'} id={formPrefix + '_city'} value={this.state[formPrefix + '_city']}  className="form-control" onChange={handleFormChange} />
                        </FormGroup>
                    </Col>
                    <Col className='col-md-2 text-left col-sm-4 col-6 field'>
                        <FormGroup>
                            <Label for="state">State</Label>
                            <select name={formPrefix + '_state'} id={formPrefix + '_state'} className="form-control" value={this.state[formPrefix + '_state']} onChange={handleFormChange} >
                                <option value="">Select a US state</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="PR">Puerto Rico</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                        </FormGroup>
                    </Col>
                    <Col className='col-xl-1 col-lg-2 col-md-2 text-left col-sm-2 col-6 field pr-0'>
                        <FormGroup>
                            <Label for="name">Zip</Label>
                            <Input type="text" name={formPrefix + '_postal_code'} id={formPrefix + '_postal_code'} className="form-control" value={this.state[formPrefix + '_postal_code']} onChange={handleFormChange}  />
                        </FormGroup>
                    </Col>
                </Row>
            </>
        );
    }
};

class SignupComponent extends React.Component {
    constructor(props: any) {
        super(props);
        // TODO(derwiki) need to use useState ??
        this.state = {
            email: '',
            password: '',
            to_name: 'Adam Derewecki',
            to_address1: '960 Wisconsin St',
            to_address2: '',
            to_city: 'San Francisco',
            to_state: 'CA',
            to_postal_code: '94107',
            from_name: 'Adam Derewecki',
            from_address1: '960 Wisconsin St',
            from_address2: '',
            from_city: 'San Francisco',
            from_state: 'CA',
            from_postal_code: '94107',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    };

    handleSubmit(event: any) {
        event.preventDefault();
        console.log('Signup state', this.state);
        // @ts-ignore
        const { message } = this.state;
        const request = {
            To: [
                {
                    // @ts-ignore
                    Name: this.state.to_name,
                    // @ts-ignore
                    AddressLine1: this.state.to_address1,
                    // @ts-ignore
                    AddressLine2: this.state.to_address2,
                    // @ts-ignore
                    City: this.state.to_city,
                    // @ts-ignore
                    State: this.state.to_state,
                    // @ts-ignore
                    Zip: this.state.to_postal_code,
                },
            ],
            From: {
                // @ts-ignore
                Name: this.state.from_name,
                // @ts-ignore
                AddressLine1: this.state.from_address1,
                // @ts-ignore
                AddressLine2: this.state.from_address2,
                // @ts-ignore
                City: this.state.from_city,
                // @ts-ignore
                State: this.state.from_state,
                // @ts-ignore
                Zip: this.state.from_postal_code,
            },
            UserId: 1,
            // @ts-ignore
            Back: `<html><body style='width: 1875px; height: 1350px; background: url(${window.photoUrl}); background-size: cover' /></html>`,
            Front: `<html>
            <head>
                <meta charset='UTF-8'>
                <link href='https://fonts.googleapis.com/css?family=Quicksand' rel='stylesheet'>
                <style>
                    *, *:before, *:after {
                      -webkit-box-sizing: border-box;
                      -moz-box-sizing: border-box;
                      box-sizing: border-box;
                    }
                    body {
                      width: 6.25in;
                      height: 4.5in;
                      margin: 0;
                      padding: 0;
                    }
                    #safe-area {
                      position: absolute;
                      width: 5.875in;
                      height: 3.875in;
                      left: 0.1875in;
                      top: 0.1875in;
                    }
                    #present {
                      background-image: url();
                      background-size: 6.25in 1.5in;
                      width:6.25in;
                      height:1.5in;
                    }
                    #message-to-customer {
                      position: absolute;
                      width: 2.0in;
                      font-family: sans-serif;
                      font-size: #{ self.font_size };
                    }
                    #message {
                      position: absolute;
                      left: 2.5in;
                      top: 1.5in;
                      font-family: sans-serif;
                      font-size: 0.12in;
                    }
                    #border {
                      position: absolute;
                      left: 2.25in;
                      top: 1.875in;
                      width: 4.25in;
                      height: 2.5in;
                      border: 1px black dashed;
                      font-family: sans-serif;
                      font-size: 0.12in;
                    }


                </style>
            </head>

            <body>
                <div id='present'> </div>
                <div id='safe-area'>
                    <div id='message-to-customer'>${message}</div>
                    <div id='message'>Brighten someone's day, send a free postcard at postcardmailer.us</div>
                    <div id='border'>&nbsp;</div>
                </div>
            </body>

            </html>`,
        }
        console.log(request);

        const headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "access-control-allow-origin, access-control-allow-headers",
        }

        const postcardPreviewPostSuccess = (response: any) => {
            const respJson = response.json();
            console.log('success', respJson);
            const dmResp = JSON.parse(respJson["0"]);
            console.log('success dmResp', dmResp);
        }

        const postcardPreviewPost = (request: any) => {
            fetch('https://postcardmailerapi.herokuapp.com/v1/postcard/preview', {
              method: 'POST',
              body: JSON.stringify(request),
              headers
            }).then(postcardPreviewPostSuccess)
              .catch(resp => console.error('catch', resp));
        }
        postcardPreviewPost(request);
    }

    handleFormChange(form: any) {
        const {target} = form;
        console.log('form change', target.name, target.value);
        this.setState({[target.name]: target.value});
    }

    render() {
        // @ts-ignore
        const { message } = this.state;

        return (
            <Form className='w-100' onSubmit={(values) => { this.handleSubmit(values) }} >
                <SignupNameAddressComponent labelPrefix={"Your"} formPrefix={"from"} state={this.state} handleFormChange={this.handleFormChange}/>
                <SignupNameAddressComponent labelPrefix={"Recipient's"} formPrefix={"to"} state={this.state} handleFormChange={this.handleFormChange}/>
                {/*
                <Row>
                    <Col className='col-xl-3 offset-xl-3 col-lg-4 offset-lg-2 col-md-4 offset-md-2 text-left pl-0'>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="signup-email" value={email} onChange={this.handleFormChange} />
                        </FormGroup>
                    </Col>
                    <Col className='col-xl-3 col-lg-4 col-md-4 text-left pr-0'>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="signup-password" value={password} onChange={this.handleFormChange}/>
                        </FormGroup>
                    </Col>
                </Row>
                */}
                <Row>
                    <Col className='col-xl-3 offset-xl-3 col-lg-4 offset-lg-2 col-md-4 offset-md-2 text-left pl-0'>
                        <PhotoUploadComponent onChange={this.handleFormChange} />
                    </Col>
                </Row>
                <Row>
                    <Col className='col-xl-3 offset-xl-3 col-lg-4 offset-lg-2 col-md-4 offset-md-2 text-left pl-0'>
                        <Label for="message">Message</Label>
                        <Input type="textarea" name="message" id="message" value={message} onChange={this.handleFormChange}/>
                    </Col>
                </Row>
                <Row>
                    <Col className='col-xl-3 offset-xl-3 col-lg-4 offset-lg-2 col-md-4 offset-md-2 text-left pl-0'>
                        <Button color="secondary" size="xl">Preview »</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default SignupComponent;
