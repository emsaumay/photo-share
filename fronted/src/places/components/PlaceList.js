import React, { useEffect, useState } from "react"; 

import "./PlaceList.css"

import { UserData } from "../../shared/UserData";
import PlaceItem from "./PlaceItem";


const PlaceList = props => {
    return(
        <ul className="places-list">
            {props.user.map(place => {
                return (<PlaceItem
                    key={place._id}
                    id={place._id}
                    name={place.name}
                    image="https://cdn.mos.cms.futurecdn.net/yCPyoZDQBBcXikqxkeW2jJ-1200-80.jpg"
                    caption={place.caption}
                    showEdit = {props.showEdit}
                />
            )})}
        </ul>
        // <div>{UserData[props.user].name}</div>
    )
}

export default PlaceList;
