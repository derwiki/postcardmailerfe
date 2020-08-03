import React from "react";
import { Input, Button } from "reactstrap";
import uploadPhoto from "../services/Aws";
import { ManagedUpload } from "aws-sdk/clients/s3";

class PhotoUploadComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            finishedUploading: false,
            ...props.state
        };
    };

    handleClick(ev: any) {
        console.log('in handleClick');
        ev.preventDefault();
        const { photoUrl, managedUpload } = uploadPhoto();

        managedUpload.on("httpUploadProgress", (progress: ManagedUpload.Progress) => {
            const uploadPercentProgress = `${Math.round(100 * progress.loaded / progress.total)}%`;
            this.setState({uploadPercentProgress});
            if (progress.loaded == progress.total) {
                console.log('finishedUploading');
                setTimeout(() => this.setState({uploadPercentProgress: null, finishedUploading: true, photoUrl}), 500);
            }
        })
        const promise = managedUpload.promise();

        promise.then(
            function() {
                console.log("Successfully uploaded photo.");
            },
            function(err: any) {
                return console.log("There was an error uploading your photo: ", err.message);
            }
        );

        // @ts-ignore
        window.photoUrl = photoUrl;
        console.log(`photoUrl`, photoUrl);
    };

    // this is rendering too soon because photoUrl is set before it's finished uploading
    render() {
        // @ts-ignore
        const {photoUrl, finishedUploading, uploadPercentProgress} = this.state;
        const maybePreview = finishedUploading ? (
            <div><img src={photoUrl} width="500" height="375"></img></div>
        ) : null

        return (
            <div id="photoUploadComponent">
                <div>
                    <Input type="file" name="photoupload" id="photoupload" />
                </div>
                <div>
                    {uploadPercentProgress}
                    {maybePreview}
                </div>
                <div>
                    <Button onClick={this.handleClick} className="mt-3">Upload</Button>
                </div>
            </div>
        )
    }
}

export default PhotoUploadComponent;