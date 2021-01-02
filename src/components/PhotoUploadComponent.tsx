import React from "react";
import { Input, Button, Spinner, Col } from "reactstrap";
import uploadPhoto from "../services/Aws";
import { ManagedUpload } from "aws-sdk/clients/s3";

class PhotoUploadComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            finishedUploading: false,
            finalizingUpload: false,
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
            if (progress.loaded === progress.total) {
                console.log('finishedUploading');
                this.setState({finalizingUpload: true})
            }
        })
        const promise = managedUpload.promise();

        promise.then(
            () => {
                console.log("Successfully uploaded photo.");
                this.setState({uploadPercentProgress: null, finishedUploading: true, finalizingUpload: false, photoUrl});
            },
            (err: any) => {
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
        const {photoUrl, finishedUploading, uploadPercentProgress, finalizingUpload} = this.state;
        const maybePreview = finishedUploading ? (
            <div><img src={photoUrl} width="500" height="375" alt="uploaded preview"></img></div>
        ) : null

        return (
            <Col xl={{size: 6, offset: 3}} lg={{size: 8, offset: 2}} md={{size: 10, offset: 1}} id="photoUploadComponent" className="mt-4">
                <h2>Choose a photo</h2>
                <div className="mb-3">
                    <Input type="file" name="photoupload" id="photoupload" />
                </div>
                <div className="mb-3">
                    {maybePreview}
                </div>
                <div>
                    <Button onClick={this.handleClick}>Upload</Button>
                    {uploadPercentProgress && (
                        <>
                            <Spinner color="primary" className='align-middle ml-2' />
                            <span className='align-baseline ml-2'>{uploadPercentProgress}</span>
                        </>
                    )}
                    {finalizingUpload && (
                        <span className='align-baseline ml-2'>Finalizing upload</span>
                    )}
                </div>
            </Col>
        )
    }
}

export default PhotoUploadComponent;