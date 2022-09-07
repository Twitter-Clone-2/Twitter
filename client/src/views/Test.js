import React, { useState } from "react";
import AWS from "aws-sdk";

const S3_BUCKET = "twitter-clone-picture-storage";
const REGION = "us-west-1";

AWS.config.update({
  accessKeyId: "AKIAWUDQ5NFXQXAX6DN7",
  secretAccessKey: "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",
});
const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const Test = () => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = (file) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    };
    console.log(params);
    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  async function findImg() {
    // const params = {
    //   Bucket: S3_BUCKET,
    //   Key: "coffee.jpg",
    // };
    // myBucket.getObject(params, function (err, data) {
    //   if (err) console.log(err, err.stack);
    //   else console.log(data);
    // });
    let TEST = process.env.REACT_APP_TEST;
    console.log(TEST);
  }
  return (
    <div>
      <div>Native SDK File Upload Progress is {progress}%</div>
      <input type="file" onChange={handleFileInput} />
      <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
      <button onClick={findImg}>Find Img</button>
      <img src="https://twitter-clone-picture-storage.s3.us-west-1.amazonaws.com/beach.jpg" />
    </div>
  );
};

export default Test;
