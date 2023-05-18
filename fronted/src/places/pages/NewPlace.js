import React from "react";
import Button from "../../shared/Components/FormElements/Button";
import Input from "../../shared/Components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import "./PlaceForm.css"
import { useForm } from "../../shared/hooks/form-hook";

function NewPlace(props){
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

    const submitHandler = event => {
        event.preventDefault()
        console.log(formState.inputs)
    }

    // console.log(formState)
    return(<form className="place-form" onSubmit={submitHandler}>
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
    </form> )
}

export default NewPlace;