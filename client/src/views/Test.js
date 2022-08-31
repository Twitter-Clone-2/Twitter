import React, { useState, useEffect } from "react";
import { Storage } from "aws-amplify";

const Test = () => {
  const [images, setImages] = useState([]);

  async function fetchImages() {
    let imageKeys = await Storage.list("");
    console.log("Imagekey1 :", imageKeys);
    // imageKeys = await Promise.all(
    //   imageKeys.map(async (k) => {
    //     const signedUrl = await Storage.get(k.key);
    //     return signedUrl;
    //   })
    // );

    imageKeys = await Promise.all(
      imageKeys.map(async (k) => {
        console.log(k.key == "ProfilePic.png");
        if (k.key == "ProfilePic.png") {
          console.log("this line hiy");
          const signedUrl = await Storage.get(k.key);
          setImages([signedUrl]);
          return signedUrl;
        }
      })
    );
    console.log("Imagekey2 :", imageKeys);
    // setImages(imageKeys);
  }
  useEffect(() => {
    fetchImages();
  }, []);

  async function onChange(e) {
    const file = e.target.files[0];
    const result = await Storage.put(file.name, file);
    console.log("Result : ", result);
    fetchImages();
  }
  return (
    <div>
      <h1> Storage Test</h1>
      <input type="file" onChange={onChange} />
      {images.map((image, i) => {
        return (
          <img
            src={image}
            key={i}
            style={{ width: 300, height: 400, marginBottom: 20 }}
          />
        );
      })}
    </div>
  );
};

export default Test;
