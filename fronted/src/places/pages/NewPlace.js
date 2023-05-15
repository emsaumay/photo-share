import React, {useCallback, useReducer} from "react";
import Button from "../../shared/Components/FormElements/Button";
import Input from "../../shared/Components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import "./PlaceForm.css"

const formReducer = (state, action) => {
    switch(action.type){
        case "CHANGE_INPUT":
            let formValid = true
            for(const inputId in state.inputs){
                if(inputId === action.id){
                    formValid = formValid && action.isValid
                }
                else{
                    formValid = formValid && state.inputs[inputId].isValid
                }
            }
            return{
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.id]: {
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isValid: formValid
            }
        default:
            return state
    }
}

function NewPlace(props){
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            Title:{
                value: '',
                isValid: false
            },
            Description:{
                value: '',
                isValid: false
            },
            Address:{
                value: '',
                isValid: false
            }
        },
        isValid: false
    })

    const InputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: "CHANGE_INPUT",
            value: value,
            id: id,
            isValid: isValid
        })
    }, [])

    const submitHandler = event => {
        event.preventDefault()
        console.log(formState.inputs)
    }

    // console.log(formState)
    return(<form className="place-form" onSubmit={submitHandler}>
        <Input 
            id="Title"
            element="input" 
            type="text"
            label="Title" 
            errorText="Please enter a valid title" 
            validators={[VALIDATOR_REQUIRE()]}
            onInput={InputHandler}
        />
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