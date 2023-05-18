import React from 'react'

import Input from '../../shared/Components/FormElements/Input'
import Button from '../../shared/Components/FormElements/Button'

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'

import "./Auth.css"

const Auth = () => {
    const [formState, InputHandler] = useForm({
        Email:{
            value: '',
            isValid: false
        },
        Password:{
            value: '',
            isValid: false
        }
    }, false)

    const submitHandler = event => {
        event.preventDefault()
        console.log(formState.inputs)
    }

  return (
    <form className='place-form authentication'  onSubmit={submitHandler}>
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
            LOGIN
        </Button>
    </form>
  )
}

export default Auth