import React, { useContext } from "react";
import {useNavigate} from "react-router-dom"
import Button from "../../shared/Components/FormElements/Button";
import Input from "../../shared/Components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import "./PlaceForm.css"
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/Components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/Components/FormElements/ImageUpload";

function NewPlace(props){
    const auth = useContext(AuthContext)
    const {isLoading, clearError, error, sendRequest} = useHttpClient();

    const [formState, InputHandler] = useForm({
        Caption:{
            value: '',
            isValid: false
        },
        Location:{
            value: '',
            isValid: false
        },
        image: {
            value: null,
            isValid: false
        }
    }, false)

    const navigate = useNavigate();

    const submitHandler = async event => {
        event.preventDefault()
        try{
            const formData = new FormData()
            formData.append('caption', formState.inputs.Caption.value)
            formData.append('name', formState.inputs.Location.value)
            formData.append('image', formState.inputs.image.value)
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/`, "POST", 
            formData,
            {
                Authorization: 'Bearer ' + auth.token
            }
            )
        navigate("/" + auth.userId + "/place")
        }
        catch(err){
            console.log(err)
        }
        
    }
    
    // console.log(formState)
    return(
    <>
        <ErrorModal error={error} onClear={clearError}/>
        <form className="place-form" onSubmit={submitHandler}>
            {isLoading && <LoadingSpinner className="center" isOverlay/>}
            <ImageUpload center id="image" onInput={InputHandler}/>
            <Input 
                id="Location"
                element="input" 
                type="text"
                label="Location" 
                errorText="Please enter a valid address" 
                validators={[VALIDATOR_REQUIRE()]}
                onInput={InputHandler}
            />
            <Input 
                id="Caption"
                element="textarea" 
                label="Caption" 
                errorText="Please enter a valid caption" 
                validators={[VALIDATOR_REQUIRE()]}
                onInput={InputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
                Add New Place
            </Button>
        </form> 
    </>
    )
}

export default NewPlace;