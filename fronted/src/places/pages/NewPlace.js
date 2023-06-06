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
        }
    }, false)

    const navigate = useNavigate();

    const submitHandler = async event => {
        event.preventDefault()
        try{
            await sendRequest("http://localhost:5000/api/places/", "POST", 
            JSON.stringify({
                caption: formState.inputs.Caption.value,
                name: formState.inputs.Location.value,
                creator: auth.userId
            }),{
                'Content-Type': 'application/json'
            }
        )
        navigate("/")
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
            {isLoading && <LoadingSpinner/>}
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