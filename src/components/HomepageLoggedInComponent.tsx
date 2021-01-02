import React from "react"
import AddressesListComponent from "./AddressesListComponent"
import AboutComponent from "./AboutComponent"
import PhotoUploadComponent from "./PhotoUploadComponent";
import PostcardPreviewComponent from "./PostcardPreviewComponent";


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
                <PostcardPreviewComponent addresses={this.state.addresses} />
                <AboutComponent />
            </>
        );
    }
}

export default HomepageLoggedInComponent;
