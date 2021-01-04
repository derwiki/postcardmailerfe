import React from "react"
import { Row, Col } from 'reactstrap';
import { Label, Input } from 'reactstrap';

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
        const { addresses } = this.state;

        return (
            <>
                <Row>
                    <Col xl={{size: 6, offset: 3}} lg={{size: 8, offset: 2}} md={{size: 10, offset: 1}}  className='addresses'>
                    <h2>Select recipients</h2>
                        {Object.keys(addresses).map((key: string, idx: number) => {
                            const address = addresses[key];
                            const { AddressLine1, AddressLine2, City, State, Zip } = address;
                            const label = [AddressLine1, AddressLine2, City, State, Zip].filter(item => item).join(', ')
                            return (
                                <div key={key} className='pl-4'>
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
            </>
        );
    }
}

export default AddressesListComponent;
