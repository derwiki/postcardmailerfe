import AWS from 'aws-sdk';

const albumBucketName = "assets.postcartmailer.us";
const bucketRegion = "us-east-1";
const IdentityPoolId = "us-east-1:8e01aca0-a304-44de-8e14-41140c731134";

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: albumBucketName }
});

const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

const photoupload = document.getElementById("photoupload");
const uploadPhoto = () => {
    // @ts-ignore
    const { files } = photoupload;
    if (!files.length) {
      return alert("Please choose a file to upload first.");
    }
    const file = files[0];
    const uuid = uuidv4()
    const photoKey = `staging/${uuid}`;
  
    // Use S3 ManagedUpload class as it supports multipart uploads
    var upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: albumBucketName,
        Key: photoKey,
        Body: file,
        ACL: "public-read"
      }
    });
  
    var promise = upload.promise();
  
    promise.then(
      function(data) {
        console.log("Successfully uploaded photo.");
      },
      function(err) {
        return console.log("There was an error uploading your photo: ", err.message);
      }
    );
  }

