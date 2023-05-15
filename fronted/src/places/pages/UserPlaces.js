import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

const UserPlaces = props => {
    const {userId} = useParams();
    const id = parseInt(userId[1])
    return(
        <div>
            <PlaceList user={id-1} showEdit={false}/>
        </div>
    )
}

export default UserPlaces