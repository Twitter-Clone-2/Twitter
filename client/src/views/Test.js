import React, { useState, useEffect } from "react";
import { Storage } from "aws-amplify";

const Test = () => {
  const [images, setImages] = useState([]);

  async function fetchImages() {
    let imageKeys = await Storage.list("");
    console.log("Imagekey1 :", imageKeys);
    imageKeys = await Promise.all(
      imageKeys.map(async (k) => {
        const signedUrl = await Storage.get(k.key);
        return signedUrl;
      })
    );

    // imageKeys = await Promise.all(
    //   imageKeys.map(async (k) => {
    //     console.log(k.key == "ProfilePic.png");
    //     if (k.key == "ProfilePic.png") {
    //       console.log("this line hiy");
    //       const signedUrl = await Storage.get(k.key);
    //       setImages([signedUrl]);
    //       return signedUrl;
    //     }
    //   })
    // );
    console.log("Imagekey2 :", imageKeys);
    setImages(imageKeys);
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
      <img src="https://twitterstorage4b6f61c8b3684776abc9ddeb3cc06e64122756-prod.s3.us-east-1.amazonaws.com/public/1_1661990805250_Jan6.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAWUDQ5NFXS2XFRS5J%2F20220901%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220901T000646Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIChgLkhVewV%2Fv80NWCs3sEmXkKZyOpLkzCEHDBOoV5ePAiAxjk3dlTBZd2LvwGwaACDMrb4UmZjmviG%2BqVuCbL9dFSqSBghpEAAaDDQ1NTUwMzM0MTkzNSIMUPGDvcbOGaB0KoHBKu8FKk7mc5wTKFo0RRcLe2ppipt8opdg7O47Jy5t1QRH0BibMnjP68BKiFO16hRdOvDgbBUTCwlR89jZTTKpe4FMNjOm0lqPZUtn1%2BukGv6T8e0BB3T%2Fno1UCFFR%2B1VrfIRn%2BJWxWj5SoRol1f29l88y6ylUbn4QaMfL6o6PzgTcmNgSZHvbLghePSU4XRJVnOXmLpBrvQNDPYE9eo0gu4M2%2BQH6Vby%2B6redi7JjEcDVJPKcZL4jzNQ6ZhK05gA8NC7Qe%2BlmWk%2FfmGCNyYAms5BWKRo%2FOohjZc4OEIqu5ZRj1C1F5RRnAo%2BbBrmUFNODvzk1wRnRP81K77yW1v3JdTigGBxK4OgYefO9G28uk5Z9EvMBDeju%2FxM8kuvPhwSX6x%2BPxc%2FFD590Sai1yRf3lShmTbHEZIS7wqE147ALfikiHPFaWgUvH5Bb1Ze%2FVnLcwN8rVkJ8gdDal721rlsXx%2F7mgombfa61uptUPXWKESMirJtuZsn04Qtjpg%2BTZWOKQSG6Qlz8cDz6IEQeEqMO6pwc9yQ5tZI%2BEeaMvqSVKv2%2Fg4mZGH%2FjuAuC5mVmGQbW9pd%2FZyWrlwSfcUWy3vXXUVhpe8SM9XzFXJsbiIF266yXMT7Kv3na%2B%2BY4ozKbp%2BOgXUOIOvVFo4IXXjjfKrBNRoWU1SQJRhmEYl8qNajdMgtDWjcPh3FK1tGnoh9E8nczwhc9hUU9RQurZ0ADshsMVsMWUi1kzmGbZg6es%2FoYNheUMME4XqE3sVf5qUGGQWSyz89eTjDd9roGeP1We%2FJ3rthksOk8KY38qR7jcz2ozxvqShBGj1NqB4hvJmIf6a0X9UIQDDrRHv1KeVmiCyXxrUd4o2dQt08l4Gqb7uRmXf6rqPFfQ1c6oMx%2B63foQtlojH2gUvsHfCOBcXOjSewzIcRBf9vKSnQpHRlTUx54ebQme7NybDuLDdtDkeUm4E6PQIVqf%2B9VYw5H8UBAdsw%2B5%2BfsZfzqSMZPtnmdyiV3fu6iqDCT77%2BYBjqIAv1SEalkVxAvT%2Bulvua%2BXIaACDWBWjGC1re55jzdoHRVTCeWec%2B2cibpgj%2FZjpzaplTlETu3jQS5zdVf8SfwAT9RGmKSP7IhwuPHb0tt8LvXW1HlQ%2FoH95nbvgYD2UlpvTSuq3hGBEZoepEDSQUJ0MMBbS3cmELmloMnoW9VqAY5VvykXRBxIb7FqtbKrg7nGX74YQ%2BPEUjoCjWo2iliC20HKyBfuQPZSC7JF5pA5OQRPHMxrJSL1ucsHy0VCHw9LdGCPjZawD7Wq4G9HtXUsqUVsWL6qx5bdE88duq7rF18OY%2BdxgQ5yvZe%2FpzdHnrCrL0ELRONiv7Npm9tlicUIcDo3OJWjVib6g%3D%3D&X-Amz-Signature=d7c6b8338d2dda073991f26b604591875d5a79f65cbcbb1fb8f5e9070ca9ecdf&X-Amz-SignedHeaders=host&x-amz-user-agent=aws-sdk-js%2F3.6.1%20os%2FWindows%2FNT_10.0%20lang%2Fjs%20md%2Fbrowser%2FChrome_104.0.0.0%20api%2Fs3%2F3.6.1%20aws-amplify%2F4.7.1_js&x-id=GetObject" />
    </div>
  );
};

export default Test;
