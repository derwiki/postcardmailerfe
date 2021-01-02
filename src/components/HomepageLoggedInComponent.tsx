import React from "react"
import AddressesListComponent from "./AddressesListComponent"


class HomepageLoggedInComponent extends React.Component<any, any> {
    render() {
        console.log('HomepageLoggedInComponent render')

        return (
            <>
                <AddressesListComponent />
            </>
        );
    }
}

export default HomepageLoggedInComponent;
