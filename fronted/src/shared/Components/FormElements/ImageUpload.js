import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState()
  const [imagePreviewUrl, setImagePreviewUrl] = useState()
  const [isValid, setIsValid] = useState(false)

  const imagePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImagePreviewUrl(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }, [file])

  const imagePickedHandler = event => {

    let pickedFile;
    let fileIsValid = isValid;

    if(event.target.files && event.target.files.length === 1){
      pickedFile = event.target.files[0]
      setFile(pickedFile) 
      setIsValid(true)
      fileIsValid = true
    }
    else{
      setIsValid(false)
      fileIsValid = false
    
    }
    if (file) {
      fileIsValid = true
    }
    // We initialise a new fileIsValid variable and passing it down to the onInput
    // Because the state change of isValid doesn't take place immediately
    props.onInput(props.id, pickedFile, fileIsValid)
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
          {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" />}
          {!imagePreviewUrl && <p>Please pick an image.</p>}
        </div>
        {/* type = button to avoid accidental form submissions */}
        <Button type="button" onClick={pickImageHandler}>Pick Image</Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
