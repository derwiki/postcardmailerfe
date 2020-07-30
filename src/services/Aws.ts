import AWS from 'aws-sdk';

const albumBucketName = "assets.postcardmailer.us";
const bucketRegion = "us-east-1";
const IdentityPoolId = "us-east-1:8e01aca0-a304-44de-8e14-41140c731134";

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

/*
const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: albumBucketName }
});
*/

const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // eslint-disable-next-line no-mixed-operators
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}
const extensionToMimeType: { [extension: string]: string} = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'jpe': 'image/jpeg',
    'tif': 'image/tiff',
    'tiff': 'image/tiff',
    'png': 'image/png'
}

const uploadPhoto = () => {
    // @ts-ignore
    const photoupload = document.getElementById("photoupload");
    // @ts-ignore
    const files  = photoupload.files;
    if (!files.length) {
      return alert("Please choose a file to upload first.");
    }
    const file = files[0];
    const { name } = file;
    const suffix = name.split('.').pop().toLowerCase();
    const uuid = uuidv4();
    const photoKey = `staging/${uuid}.${suffix}`;
    // TODO(derwiki) either change this to
    //const photoUrl = `http://assets.postcardmailer.us/${photoKey}`
    const photoUrl = `https://s3.amazonaws.com/assets.postcardmailer.us/${photoKey}`
  
    // Use S3 ManagedUpload class as it supports multipart uploads
    console.log("uploading file");
    const params = {
        Bucket: albumBucketName,
        Key: photoKey,
        Body: file,
        ACL: "public-read",
        ContentType: extensionToMimeType[suffix]
    };
    console.log('params', params);
    const upload = new AWS.S3.ManagedUpload({ params });
    const promise = upload.promise();
  
    promise.then(
      function(data) {
        console.log("Successfully uploaded photo.");
      },
      function(err) {
        return console.log("There was an error uploading your photo: ", err.message);
      }
    );
    return photoUrl;
  }

export default uploadPhoto;