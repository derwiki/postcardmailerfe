import React from "react"
import SigninComponent from "./SigninComponent"
import SignupComponent from "./SignupComponent"
import AboutComponent from "./AboutComponent"


class HomepageLoggedOutComponent extends React.Component<any, any> {
    render() {
        console.log('HomepageLoggedOutComponent render')

        return (
           <>
            <SignupComponent />
            <SigninComponent />
            <AboutComponent />
           </>
        );
    }
}

export default HomepageLoggedOutComponent;
