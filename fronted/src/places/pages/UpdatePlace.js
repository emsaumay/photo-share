import React from 'react'
import { useParams } from 'react-router-dom'

import {UserData} from"../../shared/UserData"
import Input from '../../shared/Components/FormElements/Input'
import Button from '../../shared/Components/FormElements/Button'
import { VALIDATOR_REQUIRE } from '../../shared/util/validators'

import { useForm } from '../../shared/hooks/form-hook'

import "./PlaceForm.css"

const UpdatePlace = () => {
    const userId = useParams().userId
    const placeId = useParams().placeId
    const place = UserData[parseInt(userId[1]) - 1].places[placeId]

    const [formState, InputHandler] = useForm({
      Caption:{
          value: place.caption,
          isValid: true
      },
      Location:{
          value: place.name,
          isValid: true
      }
    }, false)

    const submitHandler = event => {
      event.preventDefault()
      console.log(formState.inputs)
  }
  
    // console.log(userId)
  return (
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
        <Button type="submit" disabled={!formState.isValid}>Update Place</Button>
    </form>
  )
}

export default UpdatePlace