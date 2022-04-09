import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import upload from "../../assets/upload.png";
// import { ACCESS_TOKEN_NAME, API_BASE_URL } from "../../constants/apiConstants";
import Axios from "axios";
import {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../../services/firebase";

function Home(props) {
  useEffect(() => {
    Axios.get("http://localhost:7777/users/images")
      .then(function (response) {
        setPhotos([...photos, ...response.data]);
        console.log("response", response.data);
        // if(response.status !== 200){
        //   redirectToLogin()
        // }
      })
      .catch(function (error) {
        console.log("HomePage", error.response);
        // redirectToLogin();
      });
  }, []);
  const [image, setImage] = useState(null);
  const [photos, setPhotos] = useState([]);
  const baseUrl = "http://localhost:7777/users/upload";
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (image != null) {
      console.log("upload Start");
      const logoRef = ref(storage, `Upload/${Date.now()}`);
      await uploadBytes(logoRef, image).then(async (snap) => {
        await getDownloadURL(logoRef).then((url) => {
          console.log(url);

          setPhotos([...photos, { file: url }]);
          Axios.post(baseUrl, {
            file: url,
          })
            .then((response) => {
              console.log("response", response);
              setImage(null);
            })
            .catch((error) => {
              console.log("error", error);
            });
        });
      });
    }
  };

  console.log("photos", photos);

  return (
    <>
      <form>
        <label className="image" for="Upload">
          <img
            src={image ? URL.createObjectURL(image) : upload}
            alt="Avatar "
            className="image"
            id="coverImg"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "contain",
              margin: "1rem",
            }}
          />
        </label>
        <input
          type="file"
          id="Upload"
          label="Image"
          name="file"
          style={{ display: "none" }}
          accept=".jpeg, .png, .jpg"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <button
          className="btn "
          style={{ background: "#0be03d", color: "white" }}
          onClick={(e) => handleFileUpload(e)}
        >
          {image ? "Upload Image " : "<-- Select Image"}
        </button>
      </form>
      <div style={{ width: "100vh" }}>
        <h1
          style={{
            background: "#2b2e2c",
            color: "white",
            alignContent: "center",
            padding: "0.5rem",
            margin: "2rem",
            borderRadius: "10px",
          }}
        >
          Images
        </h1>
        {photos && photos.length > 0 ? (
          photos.map((photo) => (
            <img
              key={photo.file}
              style={{ width: "200px", height: "150px", padding: "1rem" }}
              src={photo.file}
              alt="Img"
            />
          ))
        ) : (
          <>
            <h3 style={{ background: "#eee", borderRadius: "10px" }}>
              No image uploaded yet
            </h3>
            <small>You can Add Images by clicking the upload icon!</small>
          </>
        )}
      </div>
    </>
  );
}

export default withRouter(Home);
