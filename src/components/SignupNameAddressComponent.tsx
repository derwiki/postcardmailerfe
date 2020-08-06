import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import React from 'react';

class SignupNameAddressComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            previewRendering: false,
            ...props.state,
        }
    }


    render() {
        const { labelPrefix, formPrefix } = this.props;
        const { handleFormChange } = this.props;

        return (
            <>
                <Row>
                    <Col className='col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-12 text-left field px-1'>
                        <FormGroup>
                            <Label for="name">{labelPrefix} Name</Label>
                            <Input type="text" name={formPrefix + '_name'} id={formPrefix + '_name'} value={this.state[formPrefix + '_name']} className="form-control" placeholder="Ansel Adams" onChange={handleFormChange} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                <Col className='col-xl-4 offset-xl-3 col-lg-6 offset-lg-2 col-md-6 offset-md-2 col-sm-8 col-8 text-left field px-1'>
                    <FormGroup>
                        <Label for="name">{labelPrefix} Address</Label>
                        <Input type="text" name={formPrefix + '_address1'} id={formPrefix + '_address1'} value={this.state[formPrefix + '_address1']} className="form-control" onChange={handleFormChange} />
                    </FormGroup>
                </Col>
                <Col className='col-md-2 col-sm-4 col-4 text-left field px-1'>
                    <FormGroup>
                        <Label for="name">Unit/Apt</Label>
                        <Input type="text" name={formPrefix + '_address2'} id={formPrefix + '_address2'} value={this.state[formPrefix + '_address2']} className="form-control" onChange={handleFormChange} />
                    </FormGroup>
                </Col>
                </Row>
                <Row>
                    <Col className='col-xl-3 offset-xl-3 col-lg-4 offset-lg-2 col-md-4 offset-md-2 col-sm-6 col-12 text-left field px-1 w-100'>
                        <FormGroup>
                            <Label for="name">City</Label>
                            <Input type="text" name={formPrefix + '_city'} id={formPrefix + '_city'} value={this.state[formPrefix + '_city']}  className="form-control" onChange={handleFormChange} />
                        </FormGroup>
                    </Col>
                    <Col className='col-md-2 text-left col-sm-4 col-6 field px-1'>
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
                    <Col className='col-xl-1 col-lg-2 col-md-2 text-left col-sm-2 col-6 field px-1'>
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

export default SignupNameAddressComponent;