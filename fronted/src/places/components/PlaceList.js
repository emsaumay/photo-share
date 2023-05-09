import React from "react"; 

import { UserData } from "../../shared/UserData";
import PlaceItem from "./PlaceItem";


const PlaceList = props => {
    return(
        <ul>
            {UserData[props.user].places.map(place => {
                return (<PlaceItem
                    name={place.name}
                    image="https://cdn.mos.cms.futurecdn.net/yCPyoZDQBBcXikqxkeW2jJ-1200-80.jpg"
                    caption={place.caption}
                />
            )})}
        </ul>
        // <div>{UserData[props.user].name}</div>
    )
}

export default PlaceList;
