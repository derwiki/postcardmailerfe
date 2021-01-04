import React from "react"
import { Row, Col, Spinner } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class PostcardPreviewComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {addresses: props.addresses}
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.getSelectedRecipients = this.getSelectedRecipients.bind(this);
    };

    // ideally this is not here.. violates principle of single responsibility
    getSelectedRecipients() {
        const recipients = [];
        const checked = document.querySelectorAll('.addresses input[type=checkbox]:checked')
        for (var key in Object.keys(checked)) {
            const input = checked[key];
            recipients.push(
            // @ts-ignore
            this.state.addresses[parseInt(input.value, 10)]
            )
        }
        return recipients;
    }

    handleSubmit(event: any) {
        event.preventDefault();
        console.log("PostcardPreviewComponent state", this.state)
        console.log("PostcardPreviewComponent getSelectedRecipients", this.getSelectedRecipients())
        // @ts-ignore
        const { message } = this.state;
        const recipients = this.getSelectedRecipients();
        console.log("HACK: using recipients[0]", recipients[0]);
        const recipient = recipients[0];
        const request = {
            To: recipients,
            From: recipient,
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
                    setTimeout(() => this.setState({ backThumbnail, frontThumbnail, renderedPdf, previewRendering: false }), 1500);
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
                    <img src={backThumbnail} alt="back thumbnail"></img>
                </div>
                <div>
                    <img src={frontThumbnail} alt="front thumbnail"></img>
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

        const maybeError = previewError ? (
            <div className="alert alert-danger">
                <div>{previewError.Message}</div>
            </div>
        ) : null;

        return (
            <>
                <Form className='w-100 mt-4' onSubmit={(values) => { this.handleSubmit(values) }} >
                    <Row>
                        <Col xl={{size: 6, offset: 3}} lg={{size: 8, offset: 2}} md={{size: 10, offset: 1}} >
                            <h2>Write a message</h2>
                            <Label for="message">Size reflects printable area on postcard</Label>
                            {/*
                            // @ts-ignore */}
                            <Input style={{height: '5in', width: '2.25in'}} type="textarea" name="message" id="message" value={message} onChange={this.handleFormChange}/>
                            <Button color="secondary" size="xl" className="mt-3">Preview »</Button>
                            {maybeError}
                            {maybePreview}
                            {maybePreviewRendering}
                        </Col>
                    </Row>
                </Form>
                {sendIt}
            </>
        );
    }
}

export default PostcardPreviewComponent;