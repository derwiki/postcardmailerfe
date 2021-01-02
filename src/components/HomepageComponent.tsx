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
            addresses: [],
            addressesLoaded: false,
        }
        this.getAddresses = this.getAddresses.bind(this);
        this.loginSuccess = this.loginSuccess.bind(this);
    };

    loginSuccess(resp: any) {
        if (resp.status !== 200) {
            console.log("HomepageComponent loginSuccess resp.status", resp.status)
            this.setState({message: "You are not logged in."});
        } else {
            resp.json().then((addresses: any) => {
                console.log('setState addresses', addresses);
                this.setState({addresses: addresses});
            });
        }
        this.setState({addressesLoaded: true});
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
        const { addresses, addressesLoaded } = this.state;
        const hasAddresses = Object.keys(addresses).length > 0;

        if (!addressesLoaded) {
            return (
                <>
                </>
            )
        }

        return (
           <>
               {hasAddresses ? <HomepageLoggedInComponent addresses={addresses} /> : <HomepageLoggedOutComponent />}
           </>
        );
    }
}

export default HomepageComponent;
