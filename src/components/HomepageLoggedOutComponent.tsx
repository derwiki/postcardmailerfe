import React from "react"
import SigninComponent from "./SigninComponent"
import SignupComponent from "./SignupComponent"


class HomepageLoggedOutComponent extends React.Component<any, any> {
    render() {
        console.log('HomepageLoggedOutComponent render')

        return (
           <>
            <SignupComponent />
            <SigninComponent />
           </>
        );
    }
}

export default HomepageLoggedOutComponent;
