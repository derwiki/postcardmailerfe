import React from "react"
import { Row, Col, Spinner } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import PhotoUploadComponent from "./PhotoUploadComponent";
import SignupNameAddressComponent from "./SignupNameAddressComponent";

class SignupComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {}
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
                      width: 2.25in;
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
                    <div id='message'>Brighten someone's day, send a free postcard at postcardmailer.org</div>
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

        const postcardPreviewPostSuccess = (resp: any) => {
            console.log('postcardPreviewPostSuccess resp', resp);
            resp.json().then((r: any) => {
                console.log('postcardPreviewPostSuccess', r)
                if (r.Failures) {
                    const { Error } = r['Failures'][0];
                    console.log('failure Error', Error);
                    this.setState({previewError: Error, previewRendering: false})
                } else {
                    const { RenderedPdf, FrontThumbnails, BackThumbnails } = r['Successes'][0];
                    console.log('success RenderedPdf', RenderedPdf);
                    const backThumbnail = BackThumbnails.Large;
                    const frontThumbnail = FrontThumbnails.Large;
                    const renderedPdf = RenderedPdf;
                    setTimeout(() => this.setState({ backThumbnail, frontThumbnail, renderedPdf, previewRendering: false, previewError: null }), 1500);
                    console.log('success backThumbnail', backThumbnail);
                    console.log('success frontThumbnail', frontThumbnail);
                }
            })
        }

        const postcardPreviewPost = (request: any) => {
            const host = process.env.REACT_APP_API_HOST;
            const path = '/v1/postcard/preview';
            fetch(`${host}${path}`, {
              credentials: 'include',
              method: 'POST',
              body: JSON.stringify(request),
              headers
            }).then(resp => postcardPreviewPostSuccess(resp))
              .catch(resp => console.error('catch', resp));
        }
        this.setState({previewRendering: true});
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
        console.log('message', message);
        console.log('state', this.state);
        // @ts-ignore
        const { backThumbnail, frontThumbnail, previewError } = this.state;
        const maybePreview = backThumbnail && frontThumbnail ? (
            <>
                <div>
                    <img src={backThumbnail} alt="back thumbnail" className="w-100"></img>
                </div>
                <div>
                    <img src={frontThumbnail} alt="front thumbnail" className="w-100"></img>
                </div>
            </>
        ) : null;
        // @ts-ignore
        const maybePreviewRendering = this.state.previewRendering ? (
            <Spinner color="primary" />
        ) : null;

        const sendIt = backThumbnail && frontThumbnail ? (
            <Button color="primary" size="xl" className="mt-3">Send Now »</Button>
        ) : null;
        const inlineSignup = backThumbnail && frontThumbnail ? (
            <>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="signin-email" onChange={this.handleFormChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="signin-password" onChange={this.handleFormChange}/>
                </FormGroup>
            </>
        ) : null;

        const maybeError = previewError ? (
            <div className="alert alert-danger">
                <div>{previewError.Message}</div>
            </div>
        ) : null;

        return (
            <Form className='w-100' onSubmit={(values) => { this.handleSubmit(values) }} >
                <Row>
                    <Col xl={{size: 6, offset: 3}} lg={{size: 8, offset: 2}} md={{size: 10, offset: 1}} >
                        <h2>Fill out the card</h2>
                    </Col>
                </Row>
                <SignupNameAddressComponent labelPrefix={"Your"} formPrefix={"from"} state={this.state} handleFormChange={this.handleFormChange}/>
                <SignupNameAddressComponent labelPrefix={"Recipient's"} formPrefix={"to"} state={this.state} handleFormChange={this.handleFormChange}/>
                <Row>
                    <PhotoUploadComponent onChange={this.handleFormChange} state={this.state} />
                </Row>
                <Row className="mt-4">
                    <Col xl={{size: 6, offset: 3}} lg={{size: 8, offset: 2}} md={{size: 10, offset: 1}} >
                        <h2>Write a message</h2>
                        <Label for="message">Size reflects printable area on postcard</Label>
                        <Input style={{height: '5in', width: '2.25in'}} type="textarea" name="message" id="message" value={message} onChange={this.handleFormChange}/>
                        <Button color="secondary" size="xl" className="mt-3">Preview »</Button>
                        {maybeError}
                        {maybePreview}
                        {maybePreviewRendering}
                        {inlineSignup}
                        {sendIt}
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default SignupComponent;
