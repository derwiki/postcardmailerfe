import React from "react"
import AddressesListComponent from "./AddressesListComponent"
import AboutComponent from "./AboutComponent"
import PhotoUploadComponent from "./PhotoUploadComponent";


class HomepageLoggedInComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            addresses: props.addresses,
        }
    };

    render() {
        console.log('HomepageLoggedInComponent render')

        return (
            <>
                <AddressesListComponent addresses={this.state.addresses} />
                <PhotoUploadComponent />
                <AboutComponent />
            </>
        );
    }
}

export default HomepageLoggedInComponent;
