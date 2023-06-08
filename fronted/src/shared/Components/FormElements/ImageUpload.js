import React, { useRef } from "react";
import Button from "./Button";

import "./ImageUpload.css";

const ImageUpload = (props) => {
  const imagePickerRef = useRef();

  const imagePickedHandler = event => {
    console.log(event.target)
  }

  const pickImageHandler = () => {
    imagePickerRef.current.click();
  }

  return (
    <div className="form-control">
      <input
        type="file"
        id={props.id}
        style={{ display: "none" }}
        accept=".jpeg,.jpg,.png"
        onChange={imagePickedHandler}
        ref={imagePickerRef}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          <img src="" alt="Preview" />
        </div>
        {/* type = button to avoid accidental form submissions */}
        <Button type="button" onClick={pickImageHandler}>Pick Image</Button>
      </div>
      
    </div>
  );
};

export default ImageUpload;
