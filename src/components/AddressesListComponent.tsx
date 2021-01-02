import React from "react"
import { Row, Col } from 'reactstrap';
import { Button, Form, Label, Input } from 'reactstrap';

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "access-control-allow-origin, access-control-allow-headers",
}

class AddressesListComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        console.log("AddressesListComponent this.state", this.state);
        console.log("AddressesListComponent props", props);
        this.state = {
            addresses: props.addresses
        }
        this.onAddressesSubmit = this.onAddressesSubmit.bind(this);
    };

    onAddressesSubmit(event: any) {
        event.preventDefault();
        const recipients = this.getSelectedRecipients()
        console.log("recipients", recipients)
    }

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

    render() {
        const { addresses, message } = this.state;
        const hasMessage = message?.length > 0;
        const recipients = this.getSelectedRecipients();
        const hasRecipients = recipients?.length > 0;

        return (
            <>
                <Row>
                    <Col className='text-center addresses'>
                    <h2>Select recipients</h2>
                        {Object.keys(addresses).map((key: string, idx: number) => {
                            const address = addresses[key];
                            const { AddressLine1, AddressLine2, City, State, Zip } = address;
                            const label = [AddressLine1, AddressLine2, City, State, Zip].filter(item => item).join(', ')
                            return (
                                <div key={key}>
                                    <Label check>
                                        <Input type="checkbox" value={key} />{' '}
                                        {address.Name} &nbsp;
                                        <span className="text-muted">{label}</span>
                                    </Label>
                                </div>
                            )
                        })}
                    </Col>
                </Row>
                <Row>
                    <Col className='text-center'>
                        <div> Selected </div>
                        {hasRecipients && recipients.map(recipient => {
                            return (
                                <div>{recipient.Name}</div>
                            )
                        })}
                    </Col>
                </Row>
                <Row>
                    <Col className='text-center'>
                        <Input type="submit" />
                    </Col>
                </Row>
            </>
        );
    }
}

export default AddressesListComponent;
