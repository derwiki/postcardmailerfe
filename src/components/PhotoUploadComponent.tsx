import React from "react";
import { Input, Button } from "reactstrap";
import uploadPhoto from "../services/Aws";

class PhotoUploadComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    };

    handleClick(ev: any) {
        console.log('in handleClick');
        ev.preventDefault();
        const photoUrl = uploadPhoto();
        // @ts-ignore
        window.photoUrl = photoUrl;
        console.log(`photoUrl`, photoUrl);
    };

    render() {
        return (
            <>
                <Input type="file" name="photoupload" id="photoupload" />
                <Button onClick={this.handleClick} >Upload</Button>
            </>
        )
    }
}

export default PhotoUploadComponent;