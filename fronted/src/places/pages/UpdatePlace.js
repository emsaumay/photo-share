import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Input from "../../shared/Components/FormElements/Input";
import Button from "../../shared/Components/FormElements/Button";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./PlaceForm.css";
import ErrorModal from "../../shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/Components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";

const UpdatePlace = () => {
  const auth = useContext(AuthContext)
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [place, setPlace] = useState(null);

  const Navigate = useNavigate();

  const userId = useParams().userId;
  const placeId = useParams().placeId;
  // const place = UserData[parseInt(userId[1]) - 1].places[placeId]

  const [formState, InputHandler, setFormValue] = useForm(
    {
      Caption: {
        value: "",
        isValid: false,
      },
      Location: {
        value: "",
        isValid: false,
      },
    },
    false
  );


  useEffect(() => {
    const getPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
        );
        setPlace(responseData.place);
        setFormValue(
          {
            Caption: {
              value: responseData.place.caption,
              isValid: true,
            },
            Location: {
              value: responseData.place.name,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        console.log(err);
      }
    };
    getPlace();
  }, [sendRequest, placeId, setFormValue])

  


  const submitHandler = async (event) => {
    event.preventDefault();
    try{
      await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
      "PATCH",
        JSON.stringify({
          name: formState.inputs.Location.value,
          caption: formState.inputs.Caption.value
        }),{
          "Content-Type" : "application/json",
          Authorization: "Bearer " + auth.token
        }
      )
      Navigate(`/${userId}/place`)
    }
    catch(err){
      console.log(err)
    }
  };


  // console.log(userId)
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && 
        <div style={{margin: "auto"}}>
          <LoadingSpinner asOverlay />
        </div>
        }
      {!isLoading && place && (
        <form className="place-form" onSubmit={submitHandler}>
          <Input
            id="Location"
            element="input"
            type="text"
            label="Location"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please provide a correct location."
            onInput={InputHandler}
            value={formState.inputs.Location.value}
            valid={formState.inputs.Location.isValid}
          />
          <Input
            id="Caption"
            element="textarea"
            label="Caption"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please provide a correct caption."
            onInput={InputHandler}
            value={formState.inputs.Caption.value}
            valid={formState.inputs.Caption.isValid}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Update Place
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;
