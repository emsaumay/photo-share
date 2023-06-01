import React, {useState, useContext} from 'react'

import Input from '../../shared/Components/FormElements/Input'
import Button from '../../shared/Components/FormElements/Button'

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'

import "./Auth.css"
import { AuthContext } from '../../shared/context/auth-context'
import LoadingSpinner from '../../shared/Components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/Components/UIElements/ErrorModal'

const Auth = () => {
    const Auth = useContext(AuthContext)
    const [isLoginMode, setIsLoginMode] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

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
                Name: {
                    value: "",
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode)
    }

    const submitHandler = async event => {
        event.preventDefault()
        if (isLoginMode) {
            // try{
            //     const response = await fetch("http://localhost:5000/api/users/login", {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         email: formState.inputs.Email.value,
            //         password: formState.inputs.Password.value
            //     }) 

            //     })
            // const responseData =  await response.json()
            //     console.log(responseData)
            // }
            // catch(err){
            //     console.log(err)
            // }
        }
        else{
            try{
                setIsLoading(true)
                const response = await fetch("http://localhost:5000/api/users/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formState.inputs.Name.value,
                    email: formState.inputs.Email.value,
                    password: formState.inputs.Password.value
                }) 

                })
                const responseData =  await response.json()
                if (!response.ok) {
                    throw new Error(responseData.message)
                }
                console.log(responseData)
                
                setIsLoading(false)
                Auth.login()
            }
            catch(err){
                setIsLoading(false)
                setError(err.message || "Something Went Wrong! Please try again...")
                console.log(err)
            }
        }
        }
        
    

  return (
    <>
    <ErrorModal error={error} onClear={() => setError(null)}/>
    <div className='place-form authentication'>
    {isLoading && <LoadingSpinner asOverlay/>}
    <form onSubmit={submitHandler}>
        {!isLoginMode && 
            <Input
            id="Name"
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
    </>
  )
}

export default Auth