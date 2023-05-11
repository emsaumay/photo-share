import React from "react";
import Input from "../../shared/Components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import "./NewPlace.css"

function NewPlace(props){
    return(<form className="place-form">
        <Input element="input" type="text" label="Title" errorText="Please enter a valid title" validators={[VALIDATOR_REQUIRE()]}/>
    </form> )
}

export default NewPlace;