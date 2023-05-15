import React from 'react'
import { useParams } from 'react-router-dom'

import {UserData} from"../../shared/UserData"
import Input from '../../shared/Components/FormElements/Input'
import Button from '../../shared/Components/FormElements/Button'
import { VALIDATOR_REQUIRE } from '../../shared/util/validators'

import "./PlaceForm.css"

const UpdatePlace = () => {
    const userId = useParams().userId
    const placeId = useParams().placeId
    // console.log(userId)
    const place = UserData[parseInt(userId[1]) - 1].places[placeId]
    console.log(place)
  return (
    <form className="place-form">
        <Input
            id="Title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please provide a correct title."
            onInput={()=>{}}
            value={place.name}
            valid={true}
        />
        <Input
            id="Caption"
            element="textarea"
            label="Caption"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please provide a correct caption."
            onInput={()=>{}}
            value={place.caption}
            valid={true}
        />
        <Button type="submit" disabled={true}>Update Place</Button>
    </form>
  )
}

export default UpdatePlace