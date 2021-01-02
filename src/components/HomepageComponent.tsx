import React from "react"
import HomepageLoggedInComponent from './HomepageLoggedInComponent';
import HomepageLoggedOutComponent from './HomepageLoggedOutComponent';

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "access-control-allow-origin, access-control-allow-headers",
}

class HomepageComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            addresses: []
        }
        this.getAddresses = this.getAddresses.bind(this);
        this.loginSuccess = this.loginSuccess.bind(this);
    };

    loginSuccess(resp: any) {
        if (resp.status !== 200) {
            this.setState({message: "You are not logged in."});
        } else {
            resp.json().then((r: any) => {
                console.log('setState addresses', r);
                this.setState({addresses: r, message: ''});
            });
        }
    }

    getAddresses() {
        console.log('AddressesList getAddresses state', this.state);
        const host = process.env.REACT_APP_API_HOST;
        const path = '/v1/addresses';
        fetch(`${host}${path}`, {
            method: 'GET',
            credentials: 'include',
            headers
        }).then(resp => this.loginSuccess(resp))
            .catch(resp => console.error('catch', resp));
    }

    componentWillMount() {
        const addresses = this.getAddresses();
        console.log('componentWillMount addresses', addresses);
    }

    render() {
        console.log('HomepageComponent render')
        const { addresses } = this.state;
        const hasAddresses = Object.keys(addresses).length > 0;

        return (
           <>
               {hasAddresses ? <HomepageLoggedInComponent /> : <HomepageLoggedOutComponent />}
           </>
        );
    }
}

export default HomepageComponent;
