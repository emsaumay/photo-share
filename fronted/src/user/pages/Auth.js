import React, {useState} from 'react'

import Input from '../../shared/Components/FormElements/Input'
import Button from '../../shared/Components/FormElements/Button'

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'

import "./Auth.css"

const Auth = () => {
    const [isLoginMode, setIsLoginMode] = useState(true)

    const [formState, InputHandler, setFormValue] = useForm({
        Email:{
            value: '',
            isValid: false
        },
        Password:{
            value: '',
            isValid: false
        }
    }, false)

    const switchModeHandler = () => {
        if(!isLoginMode){
            setFormValue({
                ...formState.inputs,
                name: undefined
            },formState.inputs.Email.isValid && formState.inputs.Password.isValid   )
        }
        else{
            setFormValue({
                ...formState.inputs,
                name: {
                    value: "",
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode)
    }

    const submitHandler = event => {
        event.preventDefault()
        console.log(formState.inputs)
    }

  return (
    <div className='place-form authentication'>
    <form   onSubmit={submitHandler}>
        {!isLoginMode && 
            <Input
            id="name"
            type="name"
            element="input"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please provide a name."
            onInput={InputHandler}
        />
        }
        <Input
            id="Email"
            type="email"
            element="input"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please provide a correct email."
            onInput={InputHandler}
        />
        <Input
            id="Password"
            type="password"
            element="input"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(3)]}
            errorText="Please provide a correct password."
            onInput={InputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
            {!isLoginMode ? "Sign up" : "Log in" }
        </Button>
        
    </form>
    <hr style={{marginBottom: "20px"}}/>
    <Button  onClick={switchModeHandler}>
        Switch to {isLoginMode ? "Sign up" : "Log in" }
    </Button> 
    </div>
  )
}

export default Auth