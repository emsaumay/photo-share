import React from "react";
import Input from "../../shared/Components/FormElements/Input";

import "./NewPlace.css"

function NewPlace(props){
    return(<form className="place-form">
        <Input element="input" type="text" label="Title" errorText="Please enter a valid title"/>
    </form> )
}

export default NewPlace;